import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants.js";
import { sleep } from "../utils/helpers.js";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    setAlertMessage("");
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true },
      );

      setAlertMessage(
        response.data.message || "Login successful! Redirecting...",
      );

      await sleep(500);

      dispatch(addUser(response?.data?.data));
      navigate("/");
    } catch (err) {
      console.error(
        "Login failed:",
        err?.response?.data?.message || err.message,
      );
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
      setAlertMessage("");
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="pt-3">
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                }}
              />
              {/* <div className="label">
                <span className="label-text-alt text-red-400 mt-1">
                  Bottom Left label
                </span>
              </div> */}
            </label>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              {/* <div className="label">
                <span className="label-text-alt text-red-400 mt-1">
                  Bottom Left label
                </span>
              </div> */}
            </label>
          </div>
          <p className="label-text-alt text-red-400">{error}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="card-actions justify-center">
            <p>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
      {alertMessage && (
        <div className="toast toast-end z-50">
          <div className="alert alert-success">
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
