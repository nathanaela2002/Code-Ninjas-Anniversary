import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import Header from "./Header";
import Footer from "./Footer";
import EditProfileModal from "./EditProfileModal";
import RiddleScheduler from "./RiddleSchedulerModal";
import { useInView } from "./useInView";
import showCase from "./Mashrooms-Game.mp4";

export const weekDates: Record<number, string> = {
  1: "2025-03-18T00:00:00",
  2: "2025-03-25T00:00:00",
  3: "2025-04-01T00:00:00",
  4: "2025-04-08T16:00:00",
  5: "2025-04-15T16:00:00",
  6: "2025-04-22T16:00:00",
};

export default function HomePage() {
  const [heroRef, heroInView] = useInView();
  const [weeksRef, weeksInView] = useInView();

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className={`flex flex-col md:flex-row items-center md:space-x-8 mb-4
            ${heroInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2 lg:w-1/3">
            <img
              src={NinjaImage}
              alt="Cody Missing"
              className="h-[400px] w-[300px] max-w-sm mx-auto"
            />
          </div>
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              OH NO! Cody’s gone missing! <br className="hidden md:block" />
              Only you have the expertise to find him.
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Help Cody return home by solving a series of clever riddles and
              challenges in the coming weeks. Complete all 6 tasks to bring Cody
              back safely and prove your ninja expertise!
            </p>
            <a href="/about">
              <button className="bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500">
                Learn More...
              </button>
            </a>
          </div>
        </section>

        {/* splash section*/}

        <div className="relative mt-6 mb-16 max-w-md mx-auto overflow-hidden rounded-2xl bg-yellow-50 shadow-xl ring-4 ring-red-400/70 ring-offset-4 ring-offset-orange-100">
          <div className="p-6 space-y-3 text-center">
            {/* Header line */}
            <h3 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-yellow-900 drop-shadow-sm">
              🌟 Week 6 Spotlight
            </h3>

            {/* Judges emphasis with line break */}
            <p className="text-lg font-semibold text-yellow-800">
              Personally assessed by
              <br />
              <span className="font-black decoration-yellow-500">3 Judges</span>
              &nbsp;so bring your A‑game!
            </p>

            {/* Speed doesn’t matter emphasis */}
            <p className="text-lg font-semibold text-yellow-800">
              <span className="inline-flex items-center gap-1">
                🐢
                <span className="font-black">SPEED DOES NOT MATTER</span>
              </span>
              <br /> Take it slow and craft your best!
            </p>

            {/* Submission deadline */}
            <p className="mt-4 text-base font-medium text-yellow-700">
              Submission deadline for all riddles:
              <br />
              <span className="font-black">
                Friday, April 25 at 4:00 PM EST
              </span>
            </p>

            {/* Gentle attention‑grabber */}
            <span className="absolute inset-0 animate-pulse rounded-2xl bg-yellow-200/20 pointer-events-none" />
          </div>
        </div>

        {/* COUNTDOWN / RIDDLE-SCHEDULER SECTION */}
        <RiddleScheduler />

        {/* WEEKS SECTION */}
        <section
          ref={weeksRef}
          className={`relative mb-20 ${weeksInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <div className="flex flex-wrap items-start justify-center space-x-4 md:space-x-6">
            {Array.from({ length: 6 }).map((_, idx) => {
              const weekNumber = idx + 1;
              const weekDateStr = weekDates[weekNumber];
              const weekDate = new Date(weekDateStr);
              const isClickable = new Date() >= weekDate;

              const content = (
                <>
                  <div className="bg-white w-24 h-28 shadow-md flex flex-col justify-center items-center relative">
                    <span className="font-bold text-sm">Week {weekNumber}</span>
                  </div>
                </>
              );

              return isClickable ? (
                <Link
                  key={idx}
                  to={`/riddle/${weekNumber}`}
                  className="flex flex-col items-center transform hover:scale-105"
                >
                  {content}
                </Link>
              ) : (
                <div
                  key={idx}
                  className="flex flex-col items-center opacity-50 cursor-not-allowed"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </section>

        {/* Best submission! Section */}
        <section className="mt-4 w-full max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Week 4 Submission Showcase!
          </h2>
          <a
            href="https://arcade.makecode.com/69230-13600-69008-08315"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex justify-center">
              <button className="mt-2 mb-2 bg-transparent hover:bg-cyan-400 text-cyan-600 font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded">
                Mashroom's Game:
              </button>
            </div>
          </a>
          <div className="flex flex-col items-center">
            <video
              className="w-full max-w-3xl rounded shadow-lg"
              controls
              width="750"
              height="500"
            >
              <source src={showCase} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </main>

      {/* LEADERBOARD */}
      <Leaderboard />
      <Footer />
      <EditProfileModal />
    </div>
  );
}

/* ---------------------------------------------- */
/*                LEADERBOARD CODE               */
/* ---------------------------------------------- */

type LeaderboardEntry = {
  id: number;
  name: string;
  points: number;
  avatarUrl: string;
};

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use in-view hooks for the podium and for the "others" list
  const [podiumRef, podiumInView] = useInView();

  // Separate the top 3 from the rest once data arrives
  const topThree = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/leaderboard`,
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("Invalid response format:", text);
          throw new Error("Server did not return JSON.");
        }

        const data = await response.json();
        setLeaderboardData(data);
      } catch (err) {
        let errorMessage = "Error loading leaderboard";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        console.error("Leaderboard fetch error:", err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (leaderboardData.length === 0) {
    return <p className="text-center text-gray-600">No data yet.</p>;
  }

  return (
    <div className="flex flex-col items-center w-full bg-white p-8">
      <h1 className="text-3xl font-bold mb-2 text-blue-800">Leaderboard</h1>
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
          style={{ transitionDelay: "0.1s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
          {topThree[1] && (
            <>
              <div className="relative w-20 h-20 mb-2">
                <img
                  src={topThree[1].avatarUrl || DefaultAvatar}
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
            </>
          )}
        </div>

        {/* 1st place with crown */}
        <div
          style={{ transitionDelay: "0.2s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
          {topThree[0] && (
            <>
              <div className="relative w-24 h-24 mb-2">
                <img
                  src={topThree[0].avatarUrl || DefaultAvatar}
                  alt={topThree[0].name}
                  className="w-full h-full object-cover rounded-full shadow-xl border-4 border-cyan-200"
                />
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
              <p className="text-gray-700 font-medium">
                {topThree[0].points} pts
              </p>
            </>
          )}
        </div>

        {/* 3rd place */}
        <div
          style={{ transitionDelay: "0.3s" }}
          className={`flex flex-col items-center transform hover:scale-105 transition
            ${podiumInView ? "reveal-show" : "reveal-hidden"}
          `}
        >
          {topThree[2] && (
            <>
              <div className="relative w-20 h-20 mb-2 ">
                <img
                  src={topThree[2].avatarUrl || DefaultAvatar}
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
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-md bg-blue-200 rounded-xl shadow-lg p-10">
        <ol className="space-y-4">
          {others.map((entry, index) => (
            <li
              key={entry.id}
              className="flex items-center justify-between p-3 rounded-md shadow-sm bg-white hover:bg-blue-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 font-semibold w-5 text-right">
                  {index + 4}
                </span>
                <img
                  src={entry.avatarUrl || DefaultAvatar}
                  alt={entry.name}
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <span className="font-medium text-gray-700">{entry.name}</span>
              </div>
              <span className="font-semibold text-gray-600">
                {entry.points} pts
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
