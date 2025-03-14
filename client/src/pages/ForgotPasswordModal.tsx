import React from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  // Stop propagation so clicks inside the modal do not close it
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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
          If you have forgotten the password to your account, please send us an
          email at <strong>events.cnaurora@codeninjas.com</strong> with the
          subject as <strong>"Forgot Password"</strong>. <br />
          <br />
          Include your{" "}
          <strong>Email, Username, First name, and Last name</strong> in the
          email so we can verify you and send a password reset link by email. We
          will try our best to get back to you as soon as possible, thank you
          for your patience.
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
