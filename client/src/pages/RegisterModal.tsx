import React from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100 bg-opacity-100"
    >
      {/* Modal Container */}
      <div
        onClick={stopPropagation}
        className="relative bg-blue-300 text-gray-700 rounded-xl shadow-md w-full max-w-2xl p-12"
      >
        {/* Close Button */}
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

        {/* Text Content */}
        <div className="mt-8">
          <p className="text-lg text-left">
            Send an email to events.cnaurora@codeninjas.com including your
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
