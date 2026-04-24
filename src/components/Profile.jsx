import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl font-bold">My Profile</div>
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
