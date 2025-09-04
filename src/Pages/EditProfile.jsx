import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/Api";
import { useNavigate } from "react-router";

function EditProfile() {
  useEffect(()=>{
    document.title = "Profile | JobDrop"
  }, [])
  

  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    contactNumber: user.contactNumber || "",
    profilePhoto: user?.profile?.profilePhoto || "",
    bio: user?.profile?.bio || "", 
    skill: user?.profile?.skill?.join(", ") || "", 
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${USER_API_ENDPOINT}/update-profile`,
        {
          fullName: formData.fullName,
          contactNumber: formData.contactNumber,
            profilePhoto: formData.profilePhoto,
            bio: formData.bio ,
            skill: formData.skill,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Profile updated successfully");
        setUser(res.data.user); 
        navigate("/profile");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Update failed!";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 my-10 bg-white shadow rounded animated-border">
      

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl p-3">
      <h2 className="text-2xl font-semibold text-myPrimary mb-4">Edit Profile</h2>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md border-myPrimary"
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md border-myPrimary"
          placeholder="Contact Number"
          required
        />
        <input
          type="text"
          name="profilePhoto"
          value={formData.profilePhoto}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md border-myPrimary"
          placeholder="Profile Photo URL"
        />
        <input
          type="text"
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md border-myPrimary"
          placeholder="Skills (e.g. React, Node, express)"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border-2 rounded-md border-myPrimary"
          placeholder="Bio in 60 character"
        ></textarea>

        <button
          type="submit"
          className="bg-myPrimary/80 hover:bg-myPrimary text-white px-4 py-2 rounded hover:bg-opacity-90 cursor-pointer"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
