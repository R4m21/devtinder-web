import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../redux/requestsSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests) || [];

  const getRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(response?.data?.data));
    } catch (err) {
      console.error(
        "Error fetching requests:",
        err?.response?.data?.message || err.message,
      );
    }
  };

  useEffect(() => {
    !requests.length && getRequests();
  }, []);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-bold">My Connection Requests</div>
      {requests?.length ? (
        requests.map((request) => (
          <UserCard
            key={request._id}
            user={{ ...request?.fromUserId, requestId: request._id }}
            actionButtons={true}
            action="review"
            firstButton="reject"
            secondButton="accept"
            from="requests"
          />
        ))
      ) : (
        <p className="text-gray-500">No connection requests found.</p>
      )}
    </div>
  );
};

export default Requests;
