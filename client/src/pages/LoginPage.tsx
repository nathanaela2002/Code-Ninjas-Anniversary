import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontPageDesign from "./frontpagedesign.png";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import your modal component
import FloatingDecorations from "./FloatingDecorations"; // Import the floating decorations component

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // State to control modal visibility
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Handlers for toggling the modal
  const handleOpenForgotModal = () => setShowForgotModal(true);
  const handleCloseForgotModal = () => setShowForgotModal(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || "Login failed");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Login error: ", error);
      setErrorMsg("Server error");
    }
  };

  return (
    <div className="relative">
      {/* Render the floating decorations in the background */}
      <FloatingDecorations />
      
      {/* Main login content with higher stacking order */}
      <div className="flex w-screen h-screen overflow-hidden relative z-10">
        {/* Left Section: Always visible image filling full height */}
        <div className="w-1/3 h-full relative">
          <img
            src={FrontPageDesign}
            alt="FrontPageDesign"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right Section: Login area */}
        {/* Reduced background opacity (from 90% to 60%) to allow more of the decorations to show */}
        {/* Added rounded-l-3xl to round the left edge */}
        <div className="w-2/3 h-full bg-white bg-opacity-60 rounded-l-3xl flex flex-col items-center justify-center">
          <div className="w-3/4 px-8">
            <h2
              className="text-5xl font-semibold font-syne text-create-blue text-center mb-20"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              Welcome to the 2nd Year Anniversary Challenge!
            </h2>
          </div>


          {/* Form Section */}
          <div className="w-full max-w-md px-8">
            <h3
              className="text-4xl font-semibold font-syne text-left mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              Welcome!
            </h3>
          {errorMsg && <div className="mb-4 text-red-500">{errorMsg}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-500 underline">
                Sign Up
              </a>
            </p>
            <p className="text-center text-gray-600 mt-2">
              Forgot password?{" "}
              <button
                type="button"
                onClick={handleOpenForgotModal}
                className="text-blue-500 underline"
              >
                Click Here
              </button>
            </p>
          </div>
        </div>
      {/* Mount the ForgotPasswordModal here */}
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={handleCloseForgotModal}
      />

    </div>
  );
};

export default LoginPage;
