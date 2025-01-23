import React, { useState } from "react";

const EditProfileModal: React.FC = () => {
  // State to manage the form data for profile editing
  const [formData, setFormData] = useState({
    fullName: "Guest User",
    username: "guest",
    email: "guest@email.com",
    bio: "Bio",
    link: "",
    currentPassword: "",
    newPassword: "",
  });

  // Handle input field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      
      {/* Modal for editing the profile */}
      <dialog
        id="edit_profile_modal"
        className="modal-backdrop fixed inset-0 bg-black bg-opacity-0"
        onClick={(e) => {
          const modal = document.getElementById("edit_profile_modal") as HTMLDialogElement;
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
          <h3 className="font-bold text-xl text-[#2F2F4F] mb-4">Update Profile</h3>

          {/* Form to update profile information */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
          >
            {/* Input fields for full name and username */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>

            {/* Input fields for email and bio */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="email"
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F] resize-none"
                value={formData.bio}
                name="bio"
                rows={1}
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

            {/* Input field for personal link */}
            <input
              type="text"
              placeholder="Link"
              className="w-full p-3 border border-[#BCCCDC] rounded-md focus:ring-2 focus:ring-blue-300 text-[#2F2F4F]"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />

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
