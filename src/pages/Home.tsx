import { useEffect, useState } from "react";
import {
  handleOAuthLogin,
  getMyFollowers,
  getMyFollowing,
  exchangeCodeForToken,
  getAuthenticatedUser,
  isAuthenticated,
  logout,
  type GitHubUser,
} from "../services/githubAPI";
import { ComparisonTable } from "../components/ComparisonTable";

type GitHubFollower = {
  login: string;
  avatar_url: string;
};

type LoadingState = {
  isLoading: boolean;
  error: string | null;
};

const findDifference = (
  followers: GitHubFollower[],
  following: GitHubFollower[]
) => {
  const followerLogins = new Set(followers.map((f) => f.login));
  const followingLogins = new Set(following.map((f) => f.login));

  const notFollowingBack = following.filter(
    (user) => !followerLogins.has(user.login)
  );
  const notFollowedBack = followers.filter(
    (user) => !followingLogins.has(user.login)
  );

  return { notFollowingBack, notFollowedBack };
};

export default function Home() {
  const [followers, setFollowers] = useState<GitHubFollower[]>([]);
  const [following, setFollowing] = useState<GitHubFollower[]>([]);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      setIsUserAuthenticated(true);
      fetchUserData();
      return;
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const stateParam = urlParams.get("state");

    if (code && stateParam) {
      setLoadingState({ isLoading: true, error: null });
      exchangeCodeForToken(code, stateParam)
        .then(() => {
          // Clear URL parameters
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
          setIsUserAuthenticated(true);
          fetchUserData();
        })
        .catch((error) => {
          setLoadingState({
            isLoading: false,
            error: error.message || "Authentication failed",
          });
          console.error("OAuth error:", error);
        });
    }
  }, []);

  const fetchUserData = async () => {
    setLoadingState({ isLoading: true, error: null });
    try {
      // Fetch user profile and follower data in parallel
      const [userProfile, userFollowers, userFollowing] = await Promise.all([
        getAuthenticatedUser(),
        getMyFollowers(),
        getMyFollowing(),
      ]);

      setUser(userProfile as GitHubUser);
      setFollowers(userFollowers as GitHubFollower[]);
      setFollowing(userFollowing as GitHubFollower[]);
      setLoadingState({ isLoading: false, error: null });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub data. Please try again.";
      setLoadingState({
        isLoading: false,
        error: errorMessage,
      });

      // If authentication failed, clear the stored token
      if (errorMessage.includes("Authentication failed")) {
        logout();
        setIsUserAuthenticated(false);
      }

      console.error("Failed to fetch data:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserAuthenticated(false);
    setUser(null);
    setFollowers([]);
    setFollowing([]);
    setLoadingState({ isLoading: false, error: null });
  };

  const handleRetry = () => {
    if (isUserAuthenticated) {
      fetchUserData();
    } else {
      setLoadingState({ isLoading: false, error: null });
    }
  };

  const { notFollowingBack, notFollowedBack } = findDifference(
    followers,
    following
  );

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-200 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-amber-100 text-lg font-medium animate-pulse">
        Loading your GitHub data...
      </p>
    </div>
  );

  const ErrorMessage = ({ error }: { error: string }) => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-red-400 font-semibold">Something went wrong</h3>
        </div>
        <p className="text-red-200 mb-4">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
          {isUserAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const WelcomeScreen = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            GitHub Follower Diff
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover who follows you but you don't follow back, and vice versa.
            Clean up your GitHub network with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Find New Connections
            </h3>
            <p className="text-gray-400">
              See who follows you that you haven't followed back yet
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Clean Your Network
            </h3>
            <p className="text-gray-400">
              Unfollow people who don't follow you back
            </p>
          </div>
        </div>

        <button
          onClick={handleOAuthLogin}
          disabled={loadingState.isLoading}
          className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Connect with GitHub</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );

  const UserHeader = () => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img
            src={user?.avatar_url}
            alt={user?.login}
            className="w-20 h-20 rounded-full border-4 border-amber-500/30 shadow-2xl"
          />
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.name || user?.login}!
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <span>@{user?.login}</span>
              {user?.bio && (
                <>
                  <span>•</span>
                  <span className="italic">{user.bio}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchUserData}
            disabled={loadingState.isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Followers</p>
            <p className="text-3xl font-bold text-white">{followers.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">Following</p>
            <p className="text-3xl font-bold text-white">{following.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Don't Follow Back
            </p>
            <p className="text-3xl font-bold text-red-400">
              {notFollowingBack.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">
              Potential Follows
            </p>
            <p className="text-3xl font-bold text-amber-400">
              {notFollowedBack.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <svg
              className="w-6 h-6 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto px-6 py-8 max-w-7xl">
      {loadingState.error ? (
        <ErrorMessage error={loadingState.error} />
      ) : loadingState.isLoading ? (
        <LoadingSpinner />
      ) : !isUserAuthenticated ? (
        <WelcomeScreen />
      ) : (
        <div className="space-y-8">
          <UserHeader />

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Your GitHub Network Analysis
            </h2>
            <p className="text-gray-300 text-lg">
              Here's a breakdown of your follower relationships
            </p>
          </div>

          <StatsCards />

          <div className="grid lg:grid-cols-2 gap-8">
            <ComparisonTable
              users={notFollowingBack}
              label="You Follow But They Don't"
              actionType="unfollow"
              onActionComplete={fetchUserData}
            />
            <ComparisonTable
              users={notFollowedBack}
              label="They Follow But You Don't"
              actionType="follow"
              onActionComplete={fetchUserData}
            />
          </div>
        </div>
      )}
    </main>
  );
}
