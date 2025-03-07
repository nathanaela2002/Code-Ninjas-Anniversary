import { useState, useEffect, useRef } from "react";
import DefaultAvatar from "./default.png";
import LOGOImage from "./codeninjalogo.png";
import { useInView } from "./useInView";

const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [headerRef, headerInView] = useInView();
  const [isRiddleOpen, setIsRiddleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState({});
  const [rank, setRank] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/profile", {
          credentials: "include",
        });

        if (response.status === 404) {
          window.location.href = "/login";
          return;
        }

        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        } else {
          console.error("missing user data", data);
        }
      } catch (err) {
        console.error("Profile fetch error: ", err);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await fetch("http://localhost:8000/rank", {
          credentials: "include",
        });
        const data = await response.json();
        console.log("rank value:", data.rank);
        setRank(data.rank);
      } catch (err) {
        console.error("Error fetching rank: ", err);
      }
    };
    fetchRank();
  }, []);

  useEffect(() => {
    if (isNotificationsOpen) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch("http://localhost:8000/notifications", {
            credentials: "include",
          });
          const data = await response.json();
          setNotifications(data);
        } catch (err) {
          console.error("Error getting notifications: ", err);
        }
      };
      fetchNotifications();
    }
  }, [isNotificationsOpen]);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    const handleClickOutside = (e) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  // Track if the viewport is mobile based on a breakpoint.
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close the Riddle dropdown when clicking outside (only on non-mobile view)
  useEffect(() => {
    if (isMobile) return; // disable on mobile

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsRiddleOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const toggleRiddleDropdown = () => {
    setIsRiddleOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
  };

  const openEditProfileModal = () => {
    const modal = document.getElementById(
      "edit_profile_modal",
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
      document.body.style.overflow = "hidden";
    }
  };

  function formatRank(rank) {
    const j = rank % 10,
      k = rank % 100;
    if (j === 1 && k !== 11) {
      return `${rank}st`;
    }
    if (j === 2 && k !== 12) {
      return `${rank}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${rank}rd`;
    }
    return `${rank}th`;
  }

  return (
    <header
      ref={headerRef}
      className={`relative z-50 w-full bg-white shadow-sm border-b-2 border-gray-300 
        ${headerInView ? "reveal-show" : "reveal-hidden"}`}
    >
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between h-16 px-6">
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
          {/* Riddle Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleRiddleDropdown}
              className="text-md font-bold hover:text-blue-700 transition-colors flex items-center gap-1"
            >
              Riddle
              <span
                className={`transform transition-transform ${isRiddleOpen ? "rotate-90" : "rotate-0"}`}
              >
                ►
              </span>
            </button>
            {isRiddleOpen && (
              <ul className="absolute top-8 left-0 w-32 bg-white shadow-md rounded-md border border-gray-200 flex flex-col z-50 py-2">
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
            href="/prizes"
            className="text-md font-bold hover:text-blue-700 transition-colors"
          >
            Prizes
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {/* NEW: Notifications Icon */}
          <div className="relative">
            <span
              onClick={toggleNotifications}
              className="cursor-pointer text-2xl"
            >
              🔔
            </span>
            {isNotificationsOpen && (
              <div
                ref={notificationsRef}
                className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-50"
              >
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.length ? (
                    notifications.map((notif, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 border-b border-gray-100"
                      >
                        {notif.type === "submissionUpdate" && (
                          <span>
                            Your submission has been {notif.payload.decision}d.
                          </span>
                        )}
                        {/* Additional notification types can be handled here */}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <span className="font-bold">{formatRank(rank)}</span>
          <img
            src={user.profilePicture || DefaultAvatar}
            className="h-8 w-auto object-cover rounded-full cursor-pointer"
            alt="User Avatar"
            onClick={openEditProfileModal}
          />
          <span className="font-bold">{user.username}</span>
          <span>{user.points} pts</span>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between h-16 px-4">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="text-2xl focus:outline-none"
        >
          ☰
        </button>
        <div className="flex items-center space-x-2">
          <span className="font-bold">{formatRank(rank)}</span>
          <div className="relative">
            <span
              onClick={toggleNotifications}
              className="cursor-pointer text-xl"
            >
              🔔
            </span>
            {isNotificationsOpen && (
              <div
                ref={notificationsRef}
                className="absolute right-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-50"
              >
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.length ? (
                    notifications.map((notif, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 border-b border-gray-100"
                      >
                        {notif.type === "submissionUpdate" && (
                          <span>
                            Your submission has been {notif.payload.decision}d.
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <img
            src={user.profilePicture || DefaultAvatar}
            className="h-8 w-auto object-cover rounded-full cursor-pointer"
            alt="User Avatar"
            onClick={openEditProfileModal}
          />
          <span className="font-bold">{user.username}</span>
          <span>{user.points} pts</span>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Navigation Only) */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40"
        >
          <div className="flex flex-col space-y-4 p-4">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2">
              <img
                src={LOGOImage}
                alt="Code Ninjas Logo"
                className="h-8 w-auto object-contain"
              />
            </a>
            {/* Navigation */}
            <nav className="flex flex-col space-y-2">
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
              <div className="relative">
                <button
                  onClick={toggleRiddleDropdown}
                  className="text-md font-bold hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  Riddle
                  <span
                    className={`transform transition-transform ${isRiddleOpen ? "rotate-90" : "rotate-0"}`}
                  >
                    ►
                  </span>
                </button>
                {isRiddleOpen && (
                  <ul className="mt-2 ml-4 mr-4 bg-gray-50 shadow-lg rounded-md border border-gray-300 flex flex-col z-50 py-2">
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
                href="/prizes"
                className="text-md font-bold hover:text-blue-700 transition-colors"
              >
                Prizes
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
