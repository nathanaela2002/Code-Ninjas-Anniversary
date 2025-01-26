import React from "react";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import LOGOImage from "./codeninjalogo.png";
import { Link } from "react-router-dom";

//
// --- HOME PAGE COMPONENT ---
//

// Import the EditProfileModal component
import EditProfileModal from "./EditProfileModal";

export default function HomePage() {
  // Sample data for some other part of your page (e.g., "Weeks" section):
  const openEditProfileModal = () => {
    const modal = document.getElementById(
      "edit_profile_modal",
    ) as HTMLDialogElement;
    if (modal) {
      modal.showModal(); //show the modal
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
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
          {/* Left / Image (Cody Missing) */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2 lg:w-1/3">
            <img
              src={NinjaImage}
              alt="Cody Missing"
              className="h-[400px] w-[400px] max-w-sm mx-auto"
            />
          </div>

          {/* Right / Text */}
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              OH NO! Cody’s gone missing! <br className="hidden md:block" />
              Only you have the expertise to find him.
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Help Cody return home by solving a series of clever riddles and
              challenges in the coming weeks. Complete all 7 tasks to bring Cody
              back safely and prove your ninja expertise!
            </p>

            <a href="/riddle:id">
              <button className="bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition">
                Learn More...
              </button>
            </a>
          </div>
        </section>

        {/* WEEKS (Clothesline) SECTION */}
        <section className="relative mb-16">
          <div className="flex flex-wrap items-start justify-center space-x-4 md:space-x-6">
            {[
              { label: "Week 1", sub: "Operators", id: 1 },
              { label: "Week 2", sub: "Sequencing", id: 2 },
              { label: "Week 3", sub: "TBD...", id: 3 },
              { label: "Week 4", sub: "TBD...", id: 4 },
              { label: "Week 5", sub: "TBD...", id: 5 },
              { label: "Week 6", sub: "TBD...", id: 6 },
              { label: "Week 7", sub: "TBD...", id: 7 },
            ].map((item, idx) => (
              <Link
                key={idx}
                to={`/riddle/${item.id}`} // Navigate to the specific riddle page
                className="flex flex-col items-center mb-6 transform hover:scale-105 transition"
              >
                {/* “Polaroid” style container */}
                <div className="bg-white w-24 h-28 shadow-md mb-2 flex flex-col justify-center items-center relative">
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <span className="text-xs text-gray-600">{item.sub}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 
        INSERT THE LEADERBOARD HERE 
        so that it appears right before the footer.
      */}
      <Leaderboard />

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

// --- LEADERBOARD COMPONENT ---
type leaderBoardEntry = {
  id: number;
  name: string;
  points: number;
  avatarUrl: string;
};

// Example data for the leaderboard
const leaderboardData: leaderBoardEntry[] = [
  // Top 3
  // TODO: Is the id referring to the position or the user id? For Ted: if it refers to the user id then change the leaderboard endpoint accordingly, currently we have it as position id
  {
    id: 1,
    name: "Nathanael Ann",
    points: 102,
    avatarUrl: "https://via.placeholder.com/60?text=NA",
  },
  {
    id: 2,
    name: "Bryan Yang",
    points: 83,
    avatarUrl: "https://via.placeholder.com/60?text=BY",
  },
  {
    id: 3,
    name: "Daniel Yang",
    points: 80,
    avatarUrl: "https://via.placeholder.com/60?text=DY",
  },
  // The rest of the leaderboard
  {
    id: 4,
    name: "Becky Bartell",
    points: 75,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 5,
    name: "Tamara Schmidt",
    points: 74,
    avatarUrl: "https://via.placeholder.com/60?text=TS",
  },
  {
    id: 6,
    name: "Marsha Fisher",
    points: 65,
    avatarUrl: "https://via.placeholder.com/60?text=MF",
  },
  {
    id: 7,
    name: "Juanita Cormier",
    points: 54,
    avatarUrl: "https://via.placeholder.com/60?text=JC",
  },
  {
    id: 8,
    name: "You",
    points: 50,
    avatarUrl: "https://via.placeholder.com/60?text=U",
  },
  {
    id: 9,
    name: "Gary Sanford",
    points: 41,
    avatarUrl: "https://via.placeholder.com/60?text=GS",
  },
  {
    id: 10,
    name: "Ricardo Veum",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=RV",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  {
    id: 11,
    name: "Becky Bartell",
    points: 38,
    avatarUrl: "https://via.placeholder.com/60?text=BB",
  },
  // ... you can continue or remove duplicates as needed
];

// Leaderboard component
const Leaderboard: React.FC = () => {
  // Separate the top 3 from the rest
  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <div className="flex flex-col items-center w-full bg-white p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-800 drop-shadow-md">
        Leader board
      </h1>
      <div className="w-40 h-1 bg-blue-400 rounded-full mb-8"></div>

      {/* Top 3 Container */}
      <div className="flex justify-center items-end gap-4 mb-10">
        {/* 2nd place */}
        <div className="flex flex-col items-center transform hover:scale-105 transition">
          <div className="relative w-20 h-20 mb-2">
            <img
              src={DefaultAvatar}
              alt={topThree[1].name}
              className="w-full h-full object-cover rounded-full shadow-xl border-4 border-cyan-200"
            />
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <span className="text-l bg-blue-400 rounded-full px-2.5 py-1 text-white shadow-md">
                2
              </span>
            </div>
          </div>
          <p className="text-center text-blue-700 font-semibold">
            {topThree[1].name}
          </p>
          <p className="text-gray-600">{topThree[1].points} pts</p>
        </div>

        {/* 1st place with crown */}
        <div className="flex flex-col items-center transform hover:scale-105 transition">
          <div className="relative w-24 h-24 mb-2">
            <img
              src={DefaultAvatar}
              alt={topThree[0].name}
              className="w-full h-full object-cover rounded-full shadow-xl border-4 border-cyan-200"
            />
            {/* Simple crown icon at the top */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="text-2xl bg-blue-400 rounded-full px-2 py-1 text-white shadow-md">
                👑
              </span>
            </div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
              <span className="text-xl bg-blue-400 rounded-full px-3 py-1 text-white shadow-md">
                1
              </span>
            </div>
          </div>
          <p className="text-center text-blue-800 font-bold text-lg">
            {topThree[0].name}
          </p>
          <p className="text-gray-700 font-medium">{topThree[0].points} pts</p>
        </div>

        {/* 3rd place */}
        <div className="flex flex-col items-center transform hover:scale-105 transition">
          <div className="relative w-20 h-20 mb-2 ">
            <img
              src={DefaultAvatar}
              alt={topThree[2].name}
              className="w-full h-full object-cover rounded-full shadow-xl border-4 border-cyan-200"
            />
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <span className="text-l bg-blue-400 rounded-full px-2.5 py-1 text-white shadow-md">
                3
              </span>
            </div>
          </div>
          <p className="text-center text-blue-700 font-semibold">
            {topThree[2].name}
          </p>
          <p className="text-gray-600">{topThree[2].points} pts</p>
        </div>
      </div>

      {/* The rest of the leaderboard */}
      <div className="w-full max-w-md bg-blue-200 rounded-xl shadow-lg p-10">
        <ol className="space-y-4">
          {others.map((entry, index) => (
            <li
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-md shadow-sm transform transition hover:scale-[1.01] ${
                entry.name === "You"
                  ? "bg-cyan-100 hover:bg-cyan-200"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-gray-500 font-semibold w-5 text-right ${
                    entry.name === "You" ? "text-black font-bold" : ""
                  }`}
                >
                  {index + 4}
                </span>
                <img
                  src={DefaultAvatar}
                  alt={entry.name}
                  className={`w-10 h-10 rounded-full object-cover shadow-md ${
                    entry.name === "You" ? "ring-2 ring-blue-400" : ""
                  }`}
                />
                <span
                  className={`font-medium ${
                    entry.name === "You"
                      ? "text-black font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {entry.name}
                </span>
              </div>
              <span
                className={`font-semibold ${
                  entry.name === "You"
                    ? "text-black font-bold"
                    : "text-gray-600"
                }`}
              >
                {entry.points} pts
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
