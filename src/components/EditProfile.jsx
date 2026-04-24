import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      // Implement profile editing logic here
      setIsUpdating(true);
      const dataObject = {
        photoUrl,
        age,
        gender,
        about,
        skills:
          skills.length > 0
            ? skills.split(",").map((skill) => skill.trim())
            : [],
      };

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        dataObject,
        { withCredentials: true },
      );
      setError("");
      setIsDisabled(true);
      dispatch(addUser(response.data.data));
      setAlertMessage(response.data.message || "Profile updated successfully");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
      console.error(
        "Profile update failed:",
        err?.response?.data?.message || err.message,
      );
    } finally {
      setIsUpdating(false);
      setTimeout(() => {
        setAlertMessage("");
      }, 4000);
    }
  };

  const checkIfDisabled = () => {
    if (
      photoUrl === user?.photoUrl &&
      Number(age) === Number(user?.age) &&
      gender === user?.gender &&
      about === user?.about &&
      skills === user?.skills?.join(", ")
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkIfDisabled();
  }, [photoUrl, age, gender, about, skills]);

  return (
    <div className=" flex justify-center gap-4 flex-wrap my-20">
      <div className="flex items-center justify-center">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="pt-3">
              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  placeholder="eg: John"
                  className="input input-bordered w-full max-w-xs"
                  disabled
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
                  disabled
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  placeholder="eg: https://example.com/photo.jpg"
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                    setError("");
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  placeholder="eg: 25"
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setError("");
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setError("");
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  placeholder="eg: Software developer with 5 years of experience in web development."
                  className="textarea textarea-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                    setError("");
                  }}
                />
              </label>
              <label className="form-control w-full max-w-xs py-2">
                <div className="label">
                  <span className="label-text">Skills</span>
                </div>
                <input
                  type="text"
                  placeholder="eg: JavaScript, React, Node.js"
                  className="input input-bordered w-full max-w-xs"
                  value={skills}
                  onChange={(e) => {
                    setSkills(e.target.value);
                    setError("");
                  }}
                />
              </label>
            </div>
            <p className="label-text-alt text-red-400">{error}</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={handleEditProfile}
                disabled={isUpdating || isDisabled}
              >
                {isUpdating ? "Editing..." : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills:
            skills && skills.length > 0
              ? skills.split(",").map((skill) => skill.trim())
              : [],
        }}
        actionButtons={false}
      />
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

export default EditProfile;
