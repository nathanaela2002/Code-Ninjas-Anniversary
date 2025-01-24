import React, { useState } from "react";

const ProfilePictureSetup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // Explicitly typing the state

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Casting result as string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploaded Profile Picture:", profileImage);
    // Handle profile picture submission here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Upload Your Profile Picture
        </h1>
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
          {/* Profile Image Preview */}
          <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-400 text-sm">No image uploaded</span>
            )}
          </div>

          {/* File Input */}
          <label className="text-blue-500 cursor-pointer hover:underline">
            Choose Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Save Picture
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePictureSetup;
