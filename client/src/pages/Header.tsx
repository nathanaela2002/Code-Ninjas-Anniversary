import { useState, useEffect, useRef } from "react";
import DefaultAvatar from "./default.png";
import LOGOImage from "./codeninjalogo.png";
import { useInView } from "./useInView";

export default function Header() {
  const [headerRef, headerInView] = useInView();
  const [isRiddleOpen, setIsRiddleOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsRiddleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleRiddleDropdown = () => {
    setIsRiddleOpen((prev) => !prev);
  };

  const openEditProfileModal = () => {
    const modal = document.getElementById(
      "edit_profile_modal"
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <header
      ref={headerRef}
      className={`relative z-50 w-full h-16 bg-white shadow-sm border-b-2 border-gray-300 
        flex items-center justify-between px-6
        ${headerInView ? "reveal-show" : "reveal-hidden"}
      `}
    >
      {/* Left: Logo & Brand Name */}
      <div className="flex items-center space-x-2">
        <a href="/" className="flex items-center space-x-2">
          <img
            src={LOGOImage}
            alt="Code Ninjas Logo"
            className="h-8 w-auto object-contain"
          />
        </a>
      </div>

      {/* Center: Navigation Menu */}
      <nav className="flex items-center space-x-6">
        <a
          href="/"
          className="text-md font-bold hover:text-blue-700 transition-colors"
        >
          Home
        </a>

        <a
          href="/about"
          className="text-md font-bold hover:text-blue-700 transition-colors"
        >
          About
        </a>

        {/* Riddle (parent) */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleRiddleDropdown}
            className="text-md font-bold hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            Riddle
            {/* Arrow changes dynamically */}
            <span
              className={`transform transition-transform ${
                isRiddleOpen ? "rotate-90" : "rotate-0"
              }`}
            >
              ►
            </span>
          </button>

          {/* Dropdown: Weeks 1–7 */}
          {isRiddleOpen && (
            <ul
              className="absolute top-8 left-0 w-32 bg-white shadow-md rounded-md border border-gray-200
                         flex flex-col z-50 py-2"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((week) => (
                <li key={week}>
                  <a
                    href={`/riddle/${week}`}
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-700 transition"
                  >
                    Week {week}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a
          href="#"
          className="text-md font-bold hover:text-blue-700 transition-colors"
        >
          Prizes
        </a>
      </nav>

      {/* Right - User Info */}
      <div className="flex items-center space-x-2">
        <span className="font-bold">8th</span>
        <img
          src={DefaultAvatar}
          className="h-8 w-auto object-contain cursor-pointer"
          alt="User Avatar"
          onClick={openEditProfileModal}
        />
        <span className="font-bold">Ted Schultz</span>
        <span>102 pts</span>
      </div>
    </header>
  );
}
