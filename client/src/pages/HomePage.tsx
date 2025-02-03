import React from "react";
import { Link } from "react-router-dom";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import Header from "./Header";
import Footer from "./Footer";


// Import the EditProfileModal component
import EditProfileModal from "./EditProfileModal";

// 1) Import your custom hook
import { useInView } from "./useInView";

// --- HOME PAGE COMPONENT ---
export default function HomePage() {
  // Refs & states for each section of the page
  const [heroRef, heroInView] = useInView();
  const [weeksRef, weeksInView] = useInView();

  // Sample data for some other part of your page (e.g., "Weeks" section)

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      {/**
       * HEADER (NAV)
       * ------------------------------------------------------------------
       */}
      <Header/>

      {/**
       * MAIN CONTENT
       * ------------------------------------------------------------------
       */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className={`flex flex-col md:flex-row items-center md:space-x-8 mb-12
            ${heroInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
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
        <section
          ref={weeksRef}
          className={`relative mb-16
            ${weeksInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
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
                to={`/riddle/${item.id}`}
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

      {/* LEADERBOARD */}
      <Leaderboard />

      {/**
       * FOOTER
       * ------------------------------------------------------------------
       */}
      <Footer />

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
  { id: 1, name: "Nathanael Ann", points: 102, avatarUrl: "https://via.placeholder.com/60?text=NA" },
  { id: 2, name: "Bryan Yang", points: 83, avatarUrl: "https://via.placeholder.com/60?text=BY" },
  { id: 3, name: "Daniel Yang", points: 80, avatarUrl: "https://via.placeholder.com/60?text=DY" },
  // The rest
  { id: 4, name: "Becky Bartell", points: 75, avatarUrl: "https://via.placeholder.com/60?text=BB" },
  { id: 5, name: "Tamara Schmidt", points: 74, avatarUrl: "https://via.placeholder.com/60?text=TS" },
  { id: 6, name: "Marsha Fisher", points: 65, avatarUrl: "https://via.placeholder.com/60?text=MF" },
  { id: 7, name: "Juanita Cormier", points: 54, avatarUrl: "https://via.placeholder.com/60?text=JC" },
  { id: 8, name: "You", points: 50, avatarUrl: "https://via.placeholder.com/60?text=U" },
  { id: 9, name: "Gary Sanford", points: 41, avatarUrl: "https://via.placeholder.com/60?text=GS" },
  { id: 10, name: "Ricardo Veum", points: 38, avatarUrl: "https://via.placeholder.com/60?text=RV" },
  // Some duplicates for demonstration
  { id: 11, name: "Some Extra", points: 38, avatarUrl: "https://via.placeholder.com/60?text=SE" },
  { id: 12, name: "Another Extra", points: 38, avatarUrl: "https://via.placeholder.com/60?text=AE" },
];

// Leaderboard component
const Leaderboard: React.FC = () => {
  // Use in-view hooks for the podium and for the "others" list
  const [podiumRef, podiumInView] = useInView();

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
      <div
        ref={podiumRef}
        className={`flex justify-center items-end gap-4 mb-10
          ${podiumInView ? "reveal-show" : "reveal-hidden"}
        `}
      >
        {/* 2nd place */}
        <div
          // 0.1s delay so second place appears slightly after container is in view
          style={{ transitionDelay: "0.1s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
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
          <p className="text-center text-blue-700 font-semibold">{topThree[1].name}</p>
          <p className="text-gray-600">{topThree[1].points} pts</p>
        </div>

        {/* 1st place with crown */}
        <div
          // 0.2s delay
          style={{ transitionDelay: "0.2s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
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
          <p className="text-center text-blue-800 font-bold text-lg">{topThree[0].name}</p>
          <p className="text-gray-700 font-medium">{topThree[0].points} pts</p>
        </div>

        {/* 3rd place */}
        <div
          // 0.3s delay
          style={{ transitionDelay: "0.3s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
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
          <p className="text-center text-blue-700 font-semibold">{topThree[2].name}</p>
          <p className="text-gray-600">{topThree[2].points} pts</p>
        </div>
      </div>
      {/* The rest of the leaderboard */}
      <div className="w-full max-w-md bg-blue-200 rounded-xl shadow-lg p-10">
        <ol className="space-y-4">
          {others.map((entry, index) => (
            // Render each user with its own "in-view" logic
            <LeaderboardListItem key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </div>
  );
};

interface LeaderboardListItemProps {
  entry: {
    id: number;
    name: string;
    points: number;
    avatarUrl: string;
  };
  index: number;
}

/**
 * Each user row has its own IntersectionObserver
 * so it only appears when that row is scrolled into view.
 */
const LeaderboardListItem: React.FC<LeaderboardListItemProps> = ({ entry, index }) => {
  const [rowRef, rowInView] = useInView<HTMLLIElement>();

  return (
    <li
      ref={rowRef}
      style={{ transitionDelay: `${0.1}s` }} // e.g. 0.1s, 0.2s, etc.
      className={`flex items-center justify-between p-3 rounded-md shadow-sm transform transition hover:scale-[1.01]
        ${
          entry.name === "You"
            ? "bg-cyan-100 hover:bg-cyan-200"
            : "bg-white hover:bg-blue-50"
        }
        ${rowInView ? "reveal-show" : "reveal-hidden"}
      `}
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
            entry.name === "You" ? "text-black font-bold" : "text-gray-700"
          }`}
        >
          {entry.name}
        </span>
      </div>
      <span
        className={`font-semibold ${
          entry.name === "You" ? "text-black font-bold" : "text-gray-600"
        }`}
      >
        {entry.points} pts
      </span>
    </li>
  );
};