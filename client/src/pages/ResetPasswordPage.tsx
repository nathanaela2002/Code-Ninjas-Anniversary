import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Manage visibility for each field separately
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters in length");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            newPassword: password,
            confirmPassword: confirmPassword,
          }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "An error occured.");
      } else {
        alert("Password reset successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error resetting password: ", err);
      alert("An error occurred while resetting your password.");
    }
  };

  // SVG icons using Tailwind classes for sizing
  const EyeIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const EyeSlashIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.875 18.825c-.589.103-1.19.175-1.875.175-7 0-11-7-11-7 
           1.537-3.106 3.72-5.581 6.37-6.73M9.53 9.53c.456-.355 
           1.041-.53 1.47-.53 1.657 0 3 1.343 3 3 0 .429-.175 
           1.014-.53 1.47M14.47 14.47l6.06 6.06m-1.722-9.12c.221.347 
           .424.72.606 1.09 0 0-4 7-11 7-.32 0-.625-.02-.915-.05 
           M3 3l18 18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white font-sans">
      <h1 className="text-4xl font-semibold mb-8 text-center text-gray-700">
        Choose a new password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-[300px]">
        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full py-3 px-3 pr-10 text-base border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer text-black p-0"
          >
            {showPassword ? EyeIcon : EyeSlashIcon}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            className="w-full py-3 px-3 pr-10 text-base border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-transparent border-0 cursor-pointer text-black p-0"
          >
            {showConfirmPassword ? EyeIcon : EyeSlashIcon}
          </button>
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white py-3 px-4 text-base border-0 rounded cursor-pointer mb-4"
        >
          Submit
        </button>
      </form>
      <a
        href="/login"
        className="text-blue-500 text-sm mt-2 underline cursor-pointer"
      >
        Back to Log in
      </a>
    </div>
  );
}
