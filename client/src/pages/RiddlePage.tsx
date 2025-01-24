import React, { useState } from "react";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import LOGOImage from "./codeninjalogo.png";

// Import the EditProfileModal component
import EditProfileModal from "./EditProfileModal";

export default function RiddlePage() {
  const [userAnswer, setUserAnswer] = useState(""); // State to store the user's answer
  const [currentInput, setCurrentInput] = useState(""); // State to track the current input field value

  // A helper function to show the modal
  const openEditProfileModal = () => {
    const modal = document.getElementById("edit_profile_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
  };

  // Handle input field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value); // Update the current input value
  };

  // Handle submission
  const handleSubmit = () => {
    setUserAnswer(currentInput); // Store the input in userAnswer
    console.log("User's Answer:", currentInput); // Log the user's answer
    setCurrentInput(""); // Clear the input field
  };

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      {/**
       * HEADER (NAV)
       * ------------------------------------------------------------------
       */}
      <header className="h-16 w-full flex items-center justify-between px-6 bg-white shadow-sm border-b-2 border-gray-300">
        {/* Left - Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={LOGOImage} // Code ninjas logo
              className="h-8 w-auto object-contain"
              alt="Code Ninjas Logo"
            />
            <span className="font-bold text-lg">Code Ninjas</span>
          </a>
        </div>
        {/* Right - User Info */}
        <div className="flex items-center space-x-2">
          <span className="font-bold">8th</span>
          {/* Clickable avatar that opens the Edit Profile modal */}
          <img
            src={DefaultAvatar} // User profile pic
            className="h-8 w-auto object-contain cursor-pointer"
            alt="User Avatar"
            onClick={openEditProfileModal}
          />
          <span className="font-bold">Ted Schultz</span>
          <span>102 pts</span>
        </div>
      </header>

      {/**
       * MAIN CONTENT
       * ------------------------------------------------------------------
       */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-center md:space-x-8 mb-12">
          {/* Left / Image */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2 lg:w-1/3">
            <img
              src={NinjaImage}
              alt="Riddles Ninja"
              className="h-[400px] w-[400px] max-w-sm mx-auto"
            />
          </div>

          {/* Right / Text */}
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to Solve the Riddles? <br className="hidden md:block" />
              Unlock the secrets to bring Cody back home!
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Each riddle contains clues that will help you move forward. Solve
              the puzzles and prove your ninja skills!
            </p>
          </div>
        </section>

        {/* RIDDLE CONTENT */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-4">Story</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Codey makes his way back to the center, he creates a map and
            pinpoints the locations where the decorations will be placed. To
            really fall in line with the birthday anniversary theme, drastic
            changes are made to the dojo and lab with previously existing items
            being replaced by ninja stars and birthday-themed decorations. All
            is according to plan, what is yet to be discovered is what Codey did
            next.
          </p>
          <h2 className="text-2xl font-bold mb-4">Riddle</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            A ninja shop, its name not right, an alligator eats yet portions are
            light, Two bugs in the code, one bites, one blue, fix them both to
            uncover the clue!
          </p>
          <div className="mt-6">
            <label htmlFor="riddleAnswer" className="block font-semibold mb-2">
              Your Answer:
            </label>
            <input
              id="riddleAnswer"
              type="text"
              placeholder="Enter your answer here..."
              value={currentInput} // Bind the input value to the currentInput state
              onChange={handleInputChange} // Update currentInput on change
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button
              onClick={handleSubmit} // Submit button handler
              className="mt-4 bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            >
              Submit
            </button>
          </div>
        </section>
      </main>

      {/**
       * FOOTER
       * ------------------------------------------------------------------
       */}
      <footer className="mt-10 pb-6 bg-blue-200 text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-5 gap-4 text-gray-700">
          {/* Column 1 - Center */}
          <div>
            <h2 className="font-semibold mb-2">Center</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Code Ninjas Aurora
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h2 className="font-semibold mb-2">Company</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contacts
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div>
            <h2 className="font-semibold mb-2">Legal</h2>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Social Links */}
          <div>
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-75">
                Facebook
              </a>
              <a href="#" className="hover:opacity-75">
                Instagram
              </a>
              <a href="#" className="hover:opacity-75">
                X
              </a>
              <a href="#" className="hover:opacity-75">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Include the EditProfileModal at the bottom so it can be shown/hidden */}
      <EditProfileModal />
    </div>
  );
}
