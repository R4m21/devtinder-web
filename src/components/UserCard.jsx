import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updateFeed } from "../redux/feedSlice";
import { updateRequests } from "../redux/requestsSlice";

const STATUS_MAP = {
  ignore: "ignored",
  interest: "interested",
  accept: "accepted",
  reject: "rejected",
};

const UserCard = ({
  user,
  actionButtons = true,
  firstButton = "ignore",
  secondButton = "interest",
  action = "send",
  from = "",
}) => {
  const dispatch = useDispatch();

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
        {user?.skills && user?.skills?.length > 0 && (
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <ul className="list-disc list-inside">
              {user?.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {actionButtons && (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-error"
              onClick={() => handleRequest(firstButton?.toLowerCase())}
            >
              {firstButton?.slice(0, 1)?.toUpperCase() + firstButton?.slice(1)}
            </button>
            <button
              className="btn btn-primary"
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
