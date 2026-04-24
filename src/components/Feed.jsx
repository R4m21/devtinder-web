import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed) || [];
  const dispatch = useDispatch();
  const [pageFeed, setPageFeed] = useState(1);
  const limitFeed = 10;

  // Strict mode double call handle karne ke liye
  const hasFetched = useRef(false);

  const getFeed = async (page, limit) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
        params: { page, limit }, // Pagination ke liye query params
      });

      dispatch(addFeed(response.data.data));
      setPageFeed((prev) => prev + 1);
    } catch (err) {
      console.error(
        "Failed to fetch feed:",
        err?.response?.data?.message || err.message,
      );
    }
  };

  // Initial Fetch
  useEffect(() => {
    if (!hasFetched.current && feed.length === 0) {
      getFeed(pageFeed, limitFeed);
      hasFetched.current = true;
    }
  }, []);

  // Pagination/Refill logic
  useEffect(() => {
    if (feed && feed.length > 0 && feed.length <= 3) {
      getFeed(pageFeed, limitFeed);
    }
  }, [feed.length]); // Sirf length change pe trigger karein

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-bold">My Feed</div>
      {feed?.length > 0 ? (
        feed?.map((user) => (
          <UserCard key={user._id} user={user} actionButtons={true} />
        ))
      ) : (
        <p className="text-gray-500">No feed available.</p>
      )}
    </div>
  );
};

export default Feed;
