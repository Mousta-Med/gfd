import { useState } from "react";
import { followUser, unfollowUser } from "../services/githubAPI";

type Props = {
  users: { login: string; avatar_url: string }[];
  label: string;
  actionType: "follow" | "unfollow";
  onActionComplete?: () => void;
};

export const ComparisonTable = ({
  users,
  label,
  actionType,
  onActionComplete,
}: Props) => {
  const [loadingUsers, setLoadingUsers] = useState<Set<string>>(new Set());
  const [processedUsers, setProcessedUsers] = useState<Set<string>>(new Set());

  const handleClick = async (login: string) => {
    if (processedUsers.has(login)) return;

    setLoadingUsers((prev) => new Set(prev).add(login));

    try {
      if (actionType === "follow") {
        await followUser(login);
      } else {
        await unfollowUser(login);
      }
      setProcessedUsers((prev) => new Set(prev).add(login));
      onActionComplete?.();
    } catch (error) {
      console.error(`Failed to ${actionType} user:`, error);
    } finally {
      setLoadingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(login);
        return newSet;
      });
    }
  };

  const isEmpty = users.length === 0;
  const iconColor = actionType === "follow" ? "text-blue-500" : "text-red-500";
  const bgGradient =
    actionType === "follow"
      ? "from-blue-500/10 to-blue-600/5"
      : "from-red-500/10 to-red-600/5";
  const borderColor =
    actionType === "follow" ? "border-blue-500/20" : "border-red-500/20";

  const ActionIcon = () => (
    <svg
      className={`w-6 h-6 ${iconColor}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {actionType === "follow" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
        />
      )}
    </svg>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div
        className={`w-20 h-20 bg-gradient-to-br ${bgGradient} border ${borderColor} rounded-full flex items-center justify-center mb-6`}
      >
        <ActionIcon />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">All Set!</h3>
      <p className="text-gray-400 text-center">
        {actionType === "follow"
          ? "You're following everyone who follows you back."
          : "Everyone you follow is following you back too."}
      </p>
    </div>
  );

  const LoadingButton = () => (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-lg cursor-not-allowed">
      <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-300 text-sm font-medium">Processing...</span>
    </div>
  );

  const ActionButton = ({
    user,
  }: {
    user: { login: string; avatar_url: string };
  }) => {
    const isLoading = loadingUsers.has(user.login);
    const isProcessed = processedUsers.has(user.login);

    if (isLoading) return <LoadingButton />;

    if (isProcessed) {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
          <svg
            className="w-4 h-4 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-green-400 text-sm font-medium">
            {actionType === "follow" ? "Followed" : "Unfollowed"}
          </span>
        </div>
      );
    }

    return (
      <button
        onClick={() => handleClick(user.login)}
        className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 ${
          actionType === "follow"
            ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-blue-500/25"
            : "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25"
        }`}
      >
        <ActionIcon />
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
          {actionType === "follow" ? "Follow" : "Unfollow"}
        </span>
      </button>
    );
  };

  return (
    <div
      className={`bg-gradient-to-br ${bgGradient} backdrop-blur-sm border ${borderColor} rounded-3xl overflow-hidden shadow-2xl`}
    >
      {/* Header */}
      <div className="px-8 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${
                actionType === "follow"
                  ? "from-blue-500 to-blue-600"
                  : "from-red-500 to-red-600"
              } rounded-xl flex items-center justify-center shadow-lg`}
            >
              <ActionIcon />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{label}</h2>
              <p className="text-gray-400">
                {isEmpty
                  ? "No users found"
                  : `${users.length} user${users.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          {!isEmpty && (
            <div
              className={`px-4 py-2 bg-white/10 rounded-full border border-white/20`}
            >
              <span className="text-white font-semibold text-lg">
                {users.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {users.map((user, index) => (
              <div
                key={user.login}
                className="group flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/10 hover:border-white/20"
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: "slideInUp 0.5s ease-out forwards",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="w-12 h-12 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors duration-200 shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-amber-300 transition-colors duration-200">
                      {user.login}
                    </h3>
                    <a
                      href={`https://github.com/${user.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 text-sm transition-colors duration-200 flex items-center gap-1"
                    >
                      <span>View Profile</span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                <ActionButton user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* Add this CSS for animations - it would normally go in a CSS file */
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scrollbar-thin {
        scrollbar-width: thin;
    }
    
    .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
    }
    
    .scrollbar-thumb-white\\/20::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
    
    .scrollbar-track-transparent::-webkit-scrollbar-track {
        background: transparent;
    }
`;
document.head.appendChild(style);
