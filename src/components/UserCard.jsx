import axios from "axios";
import React, { useState } from "react";
import {
  BASE_URL,
  GENDER_DEFAULTS_PHOTO,
  STATUS_MAP,
} from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../redux/feedSlice";
import { updateRequests } from "../redux/requestsSlice";

const UserCard = ({
  user,
  actionButtons = true,
  firstButton = "ignore",
  secondButton = "interest",
  action = "send",
  from = "",
}) => {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const dispatch = useDispatch();
  const SKILLS_LIMIT = 3;

  const handleRequest = async (status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/${action}/${STATUS_MAP[status]}/${from === "requests" ? user.requestId : user._id}`,
        {},
        { withCredentials: true },
      );

      if (from === "requests") {
        dispatch(updateRequests({ ...user, status: STATUS_MAP[status] }));
      } else {
        dispatch(updateFeed(user));
      }
    } catch (err) {
      console.error(
        "Failed to send request:",
        err?.response?.data?.message || err.message,
      );
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={user?.photoUrl || GENDER_DEFAULTS_PHOTO[user?.gender]}
          alt="User Photo"
          onError={(e) => {
            e.target.src =
              GENDER_DEFAULTS_PHOTO[user?.gender] ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
          }}
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
        {user?.skills && user?.skills?.length > 0 && (
          <div className="w-full">
            <h3 className="font-semibold mb-2">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {user?.skills
                ?.slice(0, showAllSkills ? user?.skills?.length : SKILLS_LIMIT)
                ?.map((skill, index) => (
                  <span
                    key={index}
                    title={skill}
                    className="badge badge-lg badge-outline truncate max-w-xs"
                  >
                    {skill}
                  </span>
                ))}
            </div>
            {user?.skills?.length > SKILLS_LIMIT && (
              <button
                className="mt-2 text-sm text-blue-500 hover:underline"
                onClick={() => setShowAllSkills(!showAllSkills)}
              >
                {showAllSkills
                  ? `Show Less (${user?.skills?.length})`
                  : `Show More (${user?.skills?.length - SKILLS_LIMIT}+)`}
              </button>
            )}
          </div>
        )}
        {actionButtons && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn w-1/3 btn-error"
              onClick={() => handleRequest(firstButton?.toLowerCase())}
            >
              {firstButton?.slice(0, 1)?.toUpperCase() + firstButton?.slice(1)}
            </button>
            <button
              className="btn w-1/3 btn-primary"
              onClick={() => handleRequest(secondButton?.toLowerCase())}
            >
              {secondButton?.slice(0, 1)?.toUpperCase() +
                secondButton?.slice(1)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
