import axios from "axios";

const BASE_URL = "https://api.github.com";
const token = import.meta.env.VITE_GITHUB_TOKEN;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github+json",
    },
});

const fetchAllPages = async (endpoint: string) => {
    let page = 1;
    const perPage = 100;
    let allData: unknown[] = [];
    let hasMore = true;

    while (hasMore) {
        const {data} = await api.get(
            `${endpoint}?per_page=${perPage}&page=${page}`
        );
        allData = [...allData, ...data];
        hasMore = data.length === perPage;
        page++;
    }

    return allData;
};

export const getFollowers = async (username: string) => {
    return fetchAllPages(`/users/${username}/followers`);
};

export const getFollowing = async (username: string) => {
    return fetchAllPages(`/users/${username}/following`);
};

export const followUser = async (username: string) => {
    await api.put(`/user/following/${username}`);
};

export const unfollowUser = async (username: string) => {
    await api.delete(`/user/following/${username}`);
};
