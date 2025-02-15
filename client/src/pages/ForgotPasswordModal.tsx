import React from "react";
import { useState } from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // If modal should be hidden, return null
  if (!isOpen) return null;

  // Stop propagation so clicks inside the modal do not close it
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );
      const data = await response.json();

      if (response.ok) {
        setMessage(
          data.message || "Password reset link sent. Please check your email.",
        );
      } else {
        setError(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error("Error sending password reset link", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-blue-100
        bg-opacity-100
      "
    >
      {/* Modal Container */}
      <div
        onClick={stopPropagation}
        className="
          relative
          bg-blue-300
          text-gray-700
          rounded-xl
          shadow-md
          w-full
          max-w-2xl
          p-12
        "
      >
        {/* Close button (top-left corner) */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-gray-400 hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold mt-8 text-left">
          Find your challenge account
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-left text-gray-500 text-lg leading-snug">
          Enter the email, or username associated with your account to change
          your password.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col space-y-16"
        >
          {/* Input Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              bg-transparent
              border
              border-gray-600
              rounded-md
              px-4
              py-3
              text-white
              placeholder-gray-500
              focus:outline-none
              focus:ring-1
              focus:ring-gray-500
              text-lg
            "
          />

          {message && <p className="text-green-500 text-center">{message}</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Next Button */}
          <button
            type="submit"
            className="
              w-full
              bg-gray-700
              hover:bg-gray-500
              text-white
              font-semibold
              py-4
              rounded-full
              transition-colors
              text-lg
            "
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
