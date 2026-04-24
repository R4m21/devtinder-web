import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections) || [];

  const getConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(response?.data?.data));
    } catch (err) {
      console.error(
        "Error fetching connections:",
        err?.response?.data?.message || err.message,
      );
    }
  };

  useEffect(() => {
    !connections.length && getConnections();
  }, []);

  return (
    <div className="my-20 flex flex-col items-center gap-6">
      <div className="text-2xl font-bold">My Connections</div>
      {connections?.length ? (
        connections?.map((connection) => (
          <UserCard
            key={connection._id}
            user={connection}
            actionButtons={false}
          />
        ))
      ) : (
        <p className="text-gray-500">No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
