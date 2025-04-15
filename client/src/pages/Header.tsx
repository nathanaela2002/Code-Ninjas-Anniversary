import { useState, useEffect, useRef } from "react";
import DefaultAvatar from "./default.png";
import LOGOImage from "./codeninjalogo.png";
import { IoIosNotifications } from "react-icons/io";
import { useInView } from "./useInView";
import { FaUserNinja } from "react-icons/fa";

const MOBILE_BREAKPOINT = 768;

interface User {
  profilePicture?: string;
  username?: string;
  points?: number;
}

interface NotificationPayload {
  decision: string;
  feedback?: string;
  riddleId?: number;
  pointsAwarded?: number;
}

interface Notification {
  type: string;
  payload: NotificationPayload;
}

export default function Header() {
  const [headerRef, headerInView] = useInView();
  const [isRiddleOpen, setIsRiddleOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [rank, setRank] = useState<number | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          { credentials: "include" },
        );

        if (!response.ok) {
          setUser(null); // Not logged in
          return;
        }

        const data = await response.json();
        setUser(data.user || null);
      } catch (err) {
        console.error("Profile fetch error: ", err);
        setUser(null);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchRank = async () => {
      if (!user) return;
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/rank`,
          { credentials: "include" },
        );
        const data = await response.json();
        setRank(data.rank);
      } catch (err) {
        console.error("Error fetching rank: ", err);
      }
    };
    fetchRank();
  }, [user]);

  useEffect(() => {
    if (!isNotificationsOpen || !user) return;

    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/notifications`,
          { credentials: "include" },
        );
        const data = await response.json();
        setNotifications(data || []);
      } catch (err) {
        console.error("Error getting notifications: ", err);
      }
    };
    fetchNotifications();
  }, [isNotificationsOpen, user]);

  useEffect(() => {
    if (!isNotificationsOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

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

  useEffect(() => {
    if (isMobile) return;

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

  function formatRank(rank: number | null): string {
    if (rank === null) return "N/A";
    const j = rank % 10,
      k = rank % 100;
    if (j === 1 && k !== 11) return `${rank}st`;
    if (j === 2 && k !== 12) return `${rank}nd`;
    if (j === 3 && k !== 13) return `${rank}rd`;
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
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a href="/" className="flex items-center space-x-2">
            <img
              src={LOGOImage}
              alt="Logo"
              className="h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <a href="/" className="text-md font-bold hover:text-blue-700">
            Home
          </a>
          <a href="/about" className="text-md font-bold hover:text-blue-700">
            About
          </a>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleRiddleDropdown}
              className="text-md font-bold hover:text-blue-700 flex items-center gap-1"
            >
              Riddle
              <span
                className={`transform transition-transform ${
                  isRiddleOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                ►
              </span>
            </button>
            {isRiddleOpen && (
              <ul className="absolute top-8 left-0 w-32 bg-white shadow-md rounded-md border border-gray-200 z-50 py-2">
                {[1, 2, 3, 4, 5, 6].map((week) => (
                  <li key={week}>
                    <a
                      href={`/riddle/${week}`}
                      className="block px-4 py-2 text-sm hover:text-blue-700"
                    >
                      Week {week}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a href="/prizes" className="text-md font-bold hover:text-blue-700">
            Prizes
          </a>
        </nav>

        {/* User / Auth Options */}
        <div className="flex items-center space-x-4">
          {user?.username ? (
            <>
              <div className="relative">
                <span
                  onClick={toggleNotifications}
                  className="cursor-pointer text-2xl"
                >
                  <IoIosNotifications className="text-3xl" />
                </span>
                {isNotificationsOpen && (
                  <div
                    ref={notificationsRef}
                    className="absolute right-0 mt-2 w-[320px] bg-white shadow-lg border border-gray-200 rounded-md z-50"
                  >
                    <ul className="max-h-64 overflow-y-auto">
                      {notifications.length ? (
                        notifications.map((notif, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 border-b border-gray-100"
                          >
                            {notif.type === "submissionUpdate" && (
                              <>
                                Week {notif.payload.riddleId} submission{" "}
                                <strong>{notif.payload.decision}d</strong>
                                {notif.payload.decision === "approve" && (
                                  <>
                                    <br />
                                    Points: {notif.payload.pointsAwarded}
                                  </>
                                )}
                                {notif.payload.feedback && (
                                  <div className="text-sm text-gray-500">
                                    Feedback: {notif.payload.feedback}
                                  </div>
                                )}
                              </>
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
              <span className="font-bold">{formatRank(rank)}</span>
              <img
                src={user.profilePicture || DefaultAvatar}
                className="h-8 w-auto object-cover rounded-full cursor-pointer"
                alt="Avatar"
                onClick={openEditProfileModal}
              />
              <span className="font-bold">{user.username}</span>
              <span>{user.points} pts</span>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-md font-bold hover:text-blue-700 flex items-center mr-4"
              >
                <FaUserNinja className="inline-block text-xl mr-2" /> Login
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden items-center justify-between h-16 px-4">
        <button onClick={toggleMobileMenu} className="text-2xl">
          ☰
        </button>
        <div className="flex items-center space-x-2">
          {user?.username ? (
            <>
              <span className="font-bold">{formatRank(rank)}</span>
              <IoIosNotifications
                className="text-3xl cursor-pointer"
                onClick={toggleNotifications}
              />
              <img
                src={user.profilePicture || DefaultAvatar}
                className="h-8 w-auto object-cover rounded-full cursor-pointer"
                alt="Avatar"
                onClick={openEditProfileModal}
              />
              <span className="font-bold">{user.username}</span>
              <span>{user.points} pts</span>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-md font-bold hover:text-blue-700 flex items-center mr-4"
              >
                <FaUserNinja className="inline-block text-xl mr-2" /> Login
              </a>
            </>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40"
        >
          <div className="flex flex-col space-y-4 p-4">
            <a href="/" className="flex items-center space-x-2">
              <img src={LOGOImage} alt="Logo" className="h-8 w-auto" />
            </a>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="font-bold hover:text-blue-700">
                Home
              </a>
              <a href="/about" className="font-bold hover:text-blue-700">
                About
              </a>
              <div className="relative">
                <button
                  onClick={toggleRiddleDropdown}
                  className="font-bold hover:text-blue-700 flex items-center gap-1"
                >
                  Riddle
                  <span
                    className={`transform transition-transform ${
                      isRiddleOpen ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    ►
                  </span>
                </button>
                {isRiddleOpen && (
                  <ul className="mt-2 ml-4 mr-4 bg-gray-50 shadow-lg border rounded-md py-2">
                    {[1, 2, 3, 4, 5, 6].map((week) => (
                      <li key={week}>
                        <a
                          href={`/riddle/${week}`}
                          className="block px-4 py-2 text-sm hover:text-blue-700"
                        >
                          Week {week}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <a href="/prizes" className="font-bold hover:text-blue-700">
                Prizes
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
