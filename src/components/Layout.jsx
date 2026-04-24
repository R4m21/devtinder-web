import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(response?.data?.data));
    } catch (err) {
      console.error(
        "Error fetching user data:",
        err?.response?.data?.message || err,
      );
      if (err?.response?.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <NavBar />
      <div className="my-20 min-h-[60vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
