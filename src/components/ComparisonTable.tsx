import {followUser, unfollowUser} from "../services/githubAPI";

type Props = {
    users: { login: string; avatar_url: string }[];
    label: string;
    actionType: "follow" | "unfollow";
};

export const ComparisonTable = ({users, label, actionType}: Props) => {
    const handleClick = async (login: string) => {
        if (actionType === "follow") await followUser(login);
        else await unfollowUser(login);
    };

    return (
        <div className="my-6 p-4 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{label}</h2>
            <div className="space-y-4">
                {users.map((user) => (
                    <div
                        key={user.login}
                        className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-10 h-10 rounded-full border"
                            />
                            <span className="font-medium text-gray-800">{user.login}</span>
                        </div>
                        <button
                            onClick={() => handleClick(user.login)}
                            className={`px-4 py-1 rounded-lg text-sm font-semibold transition 
                ${
                                actionType === "follow"
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-red-500 hover:bg-red-600 text-white"
                            }`}
                        >
                            {actionType === "follow" ? "Follow" : "Unfollow"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
