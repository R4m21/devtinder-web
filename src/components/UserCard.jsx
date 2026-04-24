import axios from "axios";
import React, { use } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../redux/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true },
      );

      dispatch(updateFeed(user)); // Update the feed based on the response
    } catch (err) {
      console.error(
        "Failed to send request:",
        err?.response?.data || err.message,
      );
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={
            user?.photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user?.firstName} {user?.lastName}
        </h2>
        {user?.age && user?.gender && (
          <p>
            {user?.age} years old{" "}
            {user?.gender &&
              user?.gender?.slice(0, 1)?.toUpperCase() + user?.gender?.slice(1)}
          </p>
        )}
        {user?.about && <p>{user?.about}</p>}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-error"
            onClick={() => handleRequest("ignored")}
          >
            Ignored
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
