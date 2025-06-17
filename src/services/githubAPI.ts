import axios from "axios";

const BASE_URL = "https://api.github.com";

// Create a dynamic API instance that uses the stored OAuth token
const createAuthenticatedAPI = () => {
  const token = localStorage.getItem("github_access_token");
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};

// Fallback API for public endpoints (when no token is available)
const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const fetchAllPages = async (endpoint: string, useAuth = true) => {
  let page = 1;
  const perPage = 100;
  let allData: unknown[] = [];
  let hasMore = true;

  const api = useAuth ? createAuthenticatedAPI() : publicAPI;

  while (hasMore) {
    try {
      const { data } = await api.get(
        `${endpoint}?per_page=${perPage}&page=${page}`
      );
      allData = [...allData, ...data];
      hasMore = data.length === perPage;
      page++;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error("Authentication failed. Please login again.");
      }
      throw error;
    }
  }

  return allData;
};

export const getAuthenticatedUser = async () => {
  const api = createAuthenticatedAPI();
  try {
    const { data } = await api.get("/user");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Authentication failed. Please login again.");
    }
    throw error;
  }
};

export const getFollowers = async (username: string) => {
  return fetchAllPages(`/users/${username}/followers`, false);
};

export const getFollowing = async (username: string) => {
  return fetchAllPages(`/users/${username}/following`, false);
};

export const getMyFollowers = async () => {
  return fetchAllPages(`/user/followers`, true);
};

export const getMyFollowing = async () => {
  return fetchAllPages(`/user/following`, true);
};

export const followUser = async (username: string) => {
  const api = createAuthenticatedAPI();
  try {
    await api.put(`/user/following/${username}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please login again.");
      } else if (error.response?.status === 404) {
        throw new Error(`User ${username} not found.`);
      }
    }
    throw error;
  }
};

export const unfollowUser = async (username: string) => {
  const api = createAuthenticatedAPI();
  try {
    await api.delete(`/user/following/${username}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please login again.");
      } else if (error.response?.status === 404) {
        throw new Error(`User ${username} not found.`);
      }
    }
    throw error;
  }
};

export const checkIfFollowing = async (username: string): Promise<boolean> => {
  const api = createAuthenticatedAPI();
  try {
    await api.get(`/user/following/${username}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    throw error;
  }
};

export const handleOAuthLogin = async () => {
  const client_id = import.meta.env.VITE_GITHUB_CLIENT_ID;
  if (!client_id) {
    throw new Error("GitHub Client ID not configured");
  }

  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  const state = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  localStorage.setItem("latestCSRFToken", state);

  const redirectUri = `${window.location.origin}`;
  const scope = "user:follow,read:user";

  const link = `https://github.com/login/oauth/authorize?client_id=${client_id}&response_type=code&scope=${scope}&redirect_uri=${redirectUri}&state=${state}`;
  window.location.assign(link);
};

export const exchangeCodeForToken = async (
  code: string,
  state: string
): Promise<TokenResponse> => {
  try {
    // Validate the state parameter against stored CSRF token
    const storedState = localStorage.getItem("latestCSRFToken");
    if (!storedState || state !== storedState) {
      throw new Error("Invalid state parameter - possible CSRF attack");
    }

    // Clean up the stored CSRF token
    localStorage.removeItem("latestCSRFToken");

    // Exchange the code for an access token
    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await axios.post<TokenResponse>(`${apiUrl}/api/oauth-t oken`, {
      code,
    });

    // Store the access token for future API calls
    if (res.data.access_token) {
      localStorage.setItem("github_access_token", res.data.access_token);
      console.log("✅ GitHub access token stored successfully");
    }

    return res.data;
  } catch (error) {
    console.error("❌ Error exchanging code for token:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error(
          "Invalid authorization code. Please try logging in again."
        );
      } else if (error.response && error.response.status >= 500) {
        throw new Error(
          "Server error during authentication. Please try again later."
        );
      }
    }

    throw new Error("Authentication failed. Please try again.");
  }
};

export const logout = () => {
  localStorage.removeItem("github_access_token");
  localStorage.removeItem("latestCSRFToken");
  console.log("🚪 User logged out successfully");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("github_access_token");
};

export interface TokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
}
