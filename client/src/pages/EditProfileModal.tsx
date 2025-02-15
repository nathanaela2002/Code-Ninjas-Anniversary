import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfileModal: React.FC = () => {
  // State to manage the form data for profile editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    profilePicture: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/profile", {
          credentials: "include",
        });

        if (response.status === 404) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        if (data.user) {
          setFormData({
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            username: data.user.username,
            email: data.user.email,
            currentPassword: "",
            newPassword: "",
            profilePicture: data.user.profilePicture,
          });
        } else {
          console.error("missing user data", data);
        }
      } catch (err) {
        console.error("Profile fetch error: ", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePfpClick = () => {
    navigate("/pfp");
  };

  return (
    <>
      {/* Modal for editing the profile */}
      <dialog
        id="edit_profile_modal"
        className="modal-backdrop fixed inset-0 bg-black bg-opacity-0"
        onClick={(e) => {
          const modal = document.getElementById(
            "edit_profile_modal",
          ) as HTMLDialogElement;
          if (e.target === modal) {
            modal.close(); // Close the modal only when clicking outside the box
            document.body.style.overflow = ""; // Disable scrolling
          }
        }}
      >
        <div
          className="modal-box bg-blue-50 rounded-xl shadow-md max-w-lg w-full p-10"
          onClick={(e) => e.stopPropagation()} // Prevent modal box clicks from closing the modal
        >
          <h3 className="font-bold text-xl text-[#2F2F4F] mb-4">
            Update Profile
          </h3>

          {/* Form to update profile information */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
          >
            {/* Edit Profile Image Section */}
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border border-[#BCCCDC] flex items-center justify-center overflow-hidden ml-16">
                  <img
                    src={formData.profilePicture || "placeholder-image-url"}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    onClick={handlePfpClick}
                  />
                </div>
                <label className="mt-2 text-blue-500 cursor-pointer hover:underline">
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Input fields for full name */}
              <div className="col-span-2 grid grid-cols-1 gap-4">
                <input
                  type="text"
                  className="w-7/8 p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F] ml-auto"
                  value={formData.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="w-7/8 p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F] ml-auto"
                  value={formData.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Input fields for username and email */}
            <div className="grid grid-cols-2 gap-4">
              <textarea
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F] resize-none"
                value={formData.username}
                name="username"
                placeholder="Username"
                rows={1}
                onChange={handleInputChange}
              />
              <input
                type="email"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.email}
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
              />
            </div>

            {/* Input fields for current and new passwords */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.newPassword}
                name="newPassword"
                onChange={handleInputChange}
              />
            </div>

            {/* Update button */}
            <button
              type="submit"
              className="w-full p-3 bg-blue-200 text-white font-semibold rounded-md hover:bg-blue-400 transition"
            >
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfileModal;
