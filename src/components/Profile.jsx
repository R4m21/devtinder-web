import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user && <EditProfile user={user} />}
    </div>
  );
};

export default Profile;
