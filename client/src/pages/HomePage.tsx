import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import Header from "./Header";
import Footer from "./Footer";
import EditProfileModal from "./EditProfileModal";
import { useInView } from "./useInView";

const weekDates: Record<number, string> = {
  1: "2025-03-18T00:00:00",
  2: "2025-03-25T00:00:00",
  3: "2025-04-01T00:00:00",
  4: "2025-04-04T16:00:00",
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
          className={`flex flex-col md:flex-row items-center md:space-x-8 mb-12
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

        {/* WEEKS SECTION */}
        <section
          ref={weeksRef}
          className={`relative mb-16 ${weeksInView ? "reveal-show" : "reveal-hidden"}`}
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

        {/* COUNTDOWN / RIDDLE-SCHEDULER SECTION */}
        <RiddleScheduler />
      </main>

      {/* LEADERBOARD */}
      <Leaderboard />
      <Footer />
      <EditProfileModal />
    </div>
  );
}

function RiddleScheduler() {
  const schedule = Object.keys(weekDates).map((key) => ({
    week: Number(key),
    date: new Date(weekDates[Number(key)]),
  }));
  schedule.sort((a, b) => a.date.getTime() - b.date.getTime());

  const now = new Date();

  // 1) Find the last riddle that has been released (<= now).
  let currentRiddle = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].date <= now) {
      currentRiddle = schedule[i].week;
    }
  }

  // 2) Find the next riddle (the first date that is > now).
  let nextRiddle = 0;
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i].date > now) {
      nextRiddle = schedule[i].week;
      break;
    }
  }

  // Day-of-week logic (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
  const dayOfWeek = now.getDay();

  const [timeLeft, setTimeLeft] = useState(
    nextRiddle
      ? calculateTimeLeft(schedule.find((s) => s.week === nextRiddle)?.date)
      : null
  );

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (nextRiddle && shouldShowCountdown(dayOfWeek)) {
      timer = setInterval(() => {
        const nextDate = schedule.find((s) => s.week === nextRiddle)?.date;
        if (!nextDate) return;
        setTimeLeft(calculateTimeLeft(nextDate));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [dayOfWeek, nextRiddle, schedule]);

  // Fri->Mon, so we might show countdown if <=4 days remain
  if (timeLeft && timeLeft.total > 0 && timeLeft.days <= 4) {
    return (
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-xl font-bold">Countdown to next riddle!</h2>
        <CountdownDisplay timeLeft={timeLeft} />
      </div>
    );
  } else {
    // Time is up => nextRiddle is live
    return (
      <div className="text-center mb-16">
        <h2 className="text-xl font-bold text-green-600">
          Riddle {currentRiddle} is live now!
        </h2>
      </div>
    );
  }
  // If it's >= 4 days away, hide the countdown
  return null;
}

/**
 * Returns true if dayOfWeek is SAT(6), SUN(0), or MON(1),
 * meaning we show the countdown. Otherwise, we show "live now".
 */
function shouldShowCountdown(dayOfWeek: number) {
  return dayOfWeek === 6 || dayOfWeek === 0 || dayOfWeek === 1;
}

/**
 * Calculates the difference between now and targetDate
 */
function calculateTimeLeft(targetDate?: Date) {
  if (!targetDate) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;
  if (diff <= 0) {
    return { total: diff, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { total: diff, days, hours, minutes, seconds };
}

function CountdownDisplay({
  timeLeft,
}: {
  timeLeft: ReturnType<typeof calculateTimeLeft>;
}) {
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex flex-row space-x-4 p-6 rounded-md">
      <CountdownBox label="Days" value={days} />
      <CountdownBox label="Hours" value={hours} />
      <CountdownBox label="Minutes" value={minutes} />
      <CountdownBox label="Seconds" value={seconds} />
    </div>
  );
}

/** One segment of the countdown: e.g., "08" with label "Days" */
function CountdownBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-center w-20 h-20 bg-gray-800 rounded-lg shadow-md">
      <span className="text-3xl md:text-4xl font-bold text-cyan-300">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs md:text-sm uppercase text-blue-200 mt-1">
        {label}
      </span>
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
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
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
          {
            credentials: "include",
          }
        );

        if (response.status === 401) {
          window.location.href = "/login";
          return;
        }

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
