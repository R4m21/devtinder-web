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

      console.log("Feed data:", response.data);
      dispatch(addFeed(response.data.data));
      setPageFeed((prev) => prev + 1);
    } catch (err) {
      console.error(
        "Failed to fetch feed:",
        err?.response?.data || err.message,
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

  if (!feed || feed.length === 0)
    return <h1 className="text-center my-10">No users found!</h1>;

  return (
    <div className="my-20 flex flex-col items-center gap-6">
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
