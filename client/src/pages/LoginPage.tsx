import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrontPageDesign from "./frontpagedesign.png";
import ForgotPasswordModal from "./ForgotPasswordModal"; // Import your modal component

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // State to control modal visibility
  const [showForgotModal, setShowForgotModal] = useState(false);

  // Handlers for toggling the modal
  const handleOpenForgotModal = () => {
    setShowForgotModal(true);
  };
  const handleCloseForgotModal = () => {
    setShowForgotModal(false);
  };

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
    <div
      className="flex w-screen h-screen overflow-hidden items-stretch relative"
      style={{
        background: "linear-gradient(to bottom, #68c4ee, #005dab)",
      }}
    >
      {/* Left Section (Text) */}
      <div className="hidden md:flex w-1/3 relative flex-col justify-center mt-[-22rem] pl-14">
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Kids have Fun
        </h1>
        <h1
          className="text-4xl font-semibold font-syne text-white"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Parents See Results!
        </h1>
      </div>

      {/* FrontPageDesign (hidden on small screens) */}
      <div className="pointer-events-none hidden md:flex absolute inset-y-0 left-0 items-center justify-start">
        <img
          src={FrontPageDesign}
          alt="FrontPageDesign"
          className="h-[1000px] w-[450px] object-contain"
        />
      </div>

      {/* Right Section: White background fills entire right panel */}
      <div className="w-full md:w-2/3 bg-white rounded-l-[2rem] flex flex-col items-center justify-center py-16">
        <div className="w-3/4 px-8">
          <h2
            className="text-5xl font-semibold font-syne text-create-blue text-center mb-20"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            Welcome to the 2nd Year Anniversary Challenge!
          </h2>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-md px-8">
          <h3
            className="text-4xl font-semibold font-syne text-left mb-6"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
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

          {/* <p>
            <button type="button" 
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2 mt-4">
            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
            <path fill-rule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clip-rule="evenodd"/>
            </svg>
            Sign in with Google
            </button>
          </p> */}

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
