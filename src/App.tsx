import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import React, { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "./services/githubAPI";
import { ComparisonTable } from "./components/ComparisonTable";

type GitHubUser = {
  login: string;
  avatar_url: string;
};

const findDifference = (followers: GitHubUser[], following: GitHubUser[]) => {
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

function App() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const username = "mousta-med";

  useEffect(() => {
    const fetchData = async () => {
      const f1 = await getFollowers(username);
      const f2 = await getFollowing(username);
      setFollowers(f1);
      setFollowing(f2);
    };
    fetchData();
  }, []);

  const { notFollowingBack, notFollowedBack } = findDifference(
    followers,
    following
  );
  return (
    <>
      <div
        className="flex flex-col h-screen justify-between"
        style={{ backgroundColor: "rgba(9, 9, 15, 1)" }}
      >
        <Navbar />
        <div className="text-white flex items-center justify-center">
          <div>
            <ComparisonTable
              users={notFollowingBack}
              label="You Follow But They Don't"
              actionType="unfollow"
            />
            <ComparisonTable
              users={notFollowedBack}
              label="They Follow But You Don't"
              actionType="follow"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
