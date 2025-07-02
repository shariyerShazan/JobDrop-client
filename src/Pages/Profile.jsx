import React, { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/Api";
import { toast } from "react-toastify";

function Profile() {
  const { user } = useContext(MyContext);
  const [openModal, setOpenModal] = useState(false);
  const [passData, setPassData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${USER_API_ENDPOINT}/change-password`,
        passData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setPassData({ oldPassword: "", newPassword: "" });
        setOpenModal(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to change password"
      );
    }
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-red-500 font-bold text-xl">
        User not logged in!
      </div>
    );
  }

  const { fullName, email, role, contactNumber, profile } = user;

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-10 px-4">
      <div className="w-full sm:max-w-2xl animated-border">
        <div className="mx-auto bg-white shadow-md p-6 rounded-xl">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <img
              src={
                profile?.profilePhoto ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-myPrimary object-cover"
            />
          </div>

          {/* Info */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-myPrimary">{fullName}</h2>
            <p><span className="font-semibold">Email:</span> {email}</p>
            <p><span className="font-semibold">Role:</span> {role}</p>
            <p><span className="font-semibold">Contact:</span> {contactNumber}</p>
            {profile.bio && <p><span className="font-semibold ">Bio:</span> {profile.bio.slice(0,60)}</p>}
            {profile.skill?.length > 0 && (
              <div>
                <p className="flex items-center justify-center gap-3 flex-wrap">
                  <span className="font-bold">Skill:</span>
                  {profile.skill.map((item, index) => (
                    <span
                      className="bg-mySecondary px-3 py-1 rounded-md"
                      key={index}
                    >
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6 flex-wrap gap-2">
            <Link
              to="/edit-profile"
              className="px-4 py-2 bg-myPrimary text-white rounded hover:bg-myPrimary/90"
            >
              Edit Profile
            </Link>
            <button
              onClick={() => setOpenModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passData.oldPassword}
                onChange={(e) =>
                  setPassData({ ...passData, oldPassword: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passData.newPassword}
                onChange={(e) =>
                  setPassData({ ...passData, newPassword: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-myPrimary text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
