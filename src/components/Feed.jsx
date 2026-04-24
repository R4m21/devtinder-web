import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async (page, limit) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/feed`,
        {
          withCredentials: true,
        },
        { params: { page, limit } },
      );
      console.log("Feed data:", response.data);
      dispatch(addFeed(response.data.data));
    } catch (err) {
      console.error(
        "Failed to fetch feed:",
        err?.response?.data || err.message,
      );
    }
  };

  useEffect(() => {
    !feed.length && getFeed(1, 10);
  }, []);

  return (
    <div className="my-20 flex flex-col items-center gap-6">
      {feed.map((item) => (
        <UserCard key={item._id} user={item} />
      ))}
    </div>
  );
};

export default Feed;
