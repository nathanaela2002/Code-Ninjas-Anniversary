import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProfileModal: React.FC = () => {
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

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
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
            modal.close();
            document.body.style.overflow = "";
          }
        }}
      >
        <div
          className="modal-box bg-blue-50 rounded-xl shadow-md max-w-lg w-full p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="font-bold text-xl text-[#2F2F4F] mb-4">Profile</h3>

          {/* Flex container for profile image and user details */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
          >
            <div className="flex items-center gap-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border border-[#BCCCDC] flex items-center justify-center overflow-hidden">
                  <img
                    src={formData.profilePicture || "placeholder-image-url"}
                    alt="Profile"
                    className="object-cover w-full h-full cursor-pointer"
                    onClick={handlePfpClick}
                  />
                </div>
                <label className="mt-2 text-blue-500 cursor-pointer hover:underline">
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* User Details */}
              <div className="flex flex-col gap-4">
                <div className="p-3 border border-[#BCCCDC] rounded-md text-[#2F2F4F] text-left bg-white">
                  Username: {formData.username}
                </div>
                <div className="p-3 border border-[#BCCCDC] rounded-md text-[#2F2F4F] text-left bg-white">
                  Email: {formData.email}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              className="w-full p-1 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfileModal;
