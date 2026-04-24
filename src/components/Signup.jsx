import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );

      setAlertMessage(
        response.data.message || "Signup successful! Please login.",
      );

      setTimeout(() => {
        setFirstName("");
        setLastName("");
        setEmailId("");
        setPassword("");
        setIsLoading(false);
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(
        error.response.data.message || "Signup failed. Please try again.",
      );
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setTimeout(() => {
        setAlertMessage("");
      }, 500);
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div className="pt-3">
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder="eg: John"
                className="input input-bordered w-full max-w-xs"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                placeholder="eg: Doe"
                className="input input-bordered w-full max-w-xs"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="eg: john.doe@example.com"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                  setError("");
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs py-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password  "
                placeholder="eg: Test@1234"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
            </label>
          </div>
          <p className="label-text-alt text-red-400">{error}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>
          </div>
          <div className="card-actions justify-center">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
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

export default Signup;
