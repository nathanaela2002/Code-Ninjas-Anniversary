import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePictureSetup = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null); // Explicitly typing the state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Casting result as string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Please select an image before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("pfp", selectedFile);
    try {
      const response = await fetch("http://localhost:8000/upload-pfp", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadStatus("Profile picture uploaded successfully!");
        console.log("Uploaded Profile Picture:", data.filePath);
        navigate("/");
      } else {
        setUploadStatus("Upload failed: " + data.message);
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      setUploadStatus("Upload error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Upload Your Profile Picture
        </h1>
        <form
          className="flex flex-col items-center gap-4"
          onSubmit={handleSubmit}
        >
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
        {uploadStatus && (
          <p className="mt-4 text-center text-sm text-gray-600">
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureSetup;
