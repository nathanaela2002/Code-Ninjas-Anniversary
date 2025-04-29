import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NinjaImage from "./ninja.png";
import DefaultAvatar from "./default.png";
import Header from "./Header";
import Footer from "./Footer";
import EditProfileModal from "./EditProfileModal";
import { useInView } from "./useInView";

/* thumbnails for podium */
import firstPlaceBg from "./first-place-game.png";
import secondPlaceBg from "./second-place-game.png";
import thirdPlaceBg from "./third-place-game.png";

/* ───────────────────────────────────────────────
   WEEK RELEASE DATES
   ───────────────────────────────────────────── */
export const weekDates: Record<number, string> = {
  1: "2025-03-18T00:00:00",
  2: "2025-03-25T00:00:00",
  3: "2025-04-01T00:00:00",
  4: "2025-04-08T16:00:00",
  5: "2025-04-15T16:00:00",
  6: "2025-04-22T16:00:00",
};

/* ───────────────────────────────────────────────
   HOMEPAGE COMPONENT
   ───────────────────────────────────────────── */
export default function HomePage() {
  const [heroRef, heroInView] = useInView();
  const [weeksRef, weeksInView] = useInView();

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ───────── HERO ───────── */}
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
              OH NO! Cody’s gone missing! <br className="hidden md:block" />
              Only you have the expertise to find him.
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Help Cody return home by solving a series of clever riddles and
              challenges in the coming weeks. Complete all 6 tasks to bring Cody
              back safely and prove your ninja expertise!
            </p>
            <a href="/about">
              <button className="bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500">
                Learn More…
              </button>
            </a>
          </div>
        </section>

        {/* ───────── WEEK‑6 SPOTLIGHT BANNER ───────── 
        <div className="relative mt-6 mb-16 max-w-md mx-auto overflow-hidden rounded-2xl bg-yellow-50 shadow-xl ring-4 ring-red-400/70 ring-offset-4 ring-offset-orange-100">
          <div className="p-6 space-y-3 text-center">
            <h3 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-yellow-900 drop-shadow-sm">
              🌟 Week 6 Spotlight
            </h3>

            <p className="text-lg font-semibold text-yellow-800">
              Personally assessed by
              <br />
              <span className="font-black decoration-yellow-500">3 Judges</span>
              &nbsp;so bring your A‑game!
            </p>

            <p className="text-lg font-semibold text-yellow-800">
              <span className="inline-flex items-center gap-1">
                🐢 <span className="font-black">SPEED DOES NOT MATTER</span>
              </span>
              <br />Take it slow and craft your best!
            </p>

            <p className="mt-4 text-base font-medium text-yellow-700">
              Submission deadline for all riddles:
              <br />
              <span className="font-black">
                Friday, April 25 at 4 PM EST
              </span>
            </p>

            <span className="absolute inset-0 animate-pulse rounded-2xl bg-yellow-200/20 pointer-events-none" />
          </div>
        </div>
        */}

        {/* ───────── COUNTDOWN / RIDDLE‑SCHEDULER ───────── */}
        {/*<RiddleScheduler />*/}

        {/* ───────── WEEK LINKS ───────── */}
        <section
          ref={weeksRef}
          className={`relative mb-2 ${weeksInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <div className="flex flex-wrap items-start justify-center space-x-4 md:space-x-6">
            {Array.from({ length: 6 }).map((_, idx) => {
              const weekNumber = idx + 1;
              const weekDate = new Date(weekDates[weekNumber]);
              const isClickable = new Date() >= weekDate;

              const card = (
                <div className="bg-white w-24 h-28 shadow-md flex flex-col justify-center items-center">
                  <span className="font-bold text-sm">Week {weekNumber}</span>
                </div>
              );

              return isClickable ? (
                <Link
                  key={idx}
                  to={`/riddle/${weekNumber}`}
                  className="flex flex-col items-center transform hover:scale-105"
                >
                  {card}
                </Link>
              ) : (
                <div
                  key={idx}
                  className="flex flex-col items-center opacity-50 cursor-not-allowed"
                >
                  {card}
                </div>
              );
            })}
          </div>
        </section>
      </main>

<<<<<<< HEAD
      <Leaderboard />

=======
>>>>>>> f2524b7 (Replaced dynamic data with static data in leaderboard's useEffect)
      {/* ───────── PODIUM (TOP 3) ───────── */}
      <Podium />

      {/* ───────── LEADERBOARD ───────── */}
<<<<<<< HEAD
=======
      <Leaderboard />
>>>>>>> f2524b7 (Replaced dynamic data with static data in leaderboard's useEffect)

      <Footer />
      <EditProfileModal />
    </div>
  );
}

/* ====================================================================== */
/*                         LEADERBOARD  (unchanged)                       */
/* ====================================================================== */

type LeaderboardEntry = {
  id: number;
  name: string;
  points: number;
  avatarUrl: string;
};

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [podiumRef, podiumInView] = useInView();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/leaderboard`,
        );
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError("Error loading leaderboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!data.length)
    return <p className="text-center text-gray-600">No data yet.</p>;

  const topThree = data.slice(0, 3);
  const others = data.slice(3);

  return (
    <div className="flex flex-col items-center w-full bg-white p-8">
      <h1 className="text-3xl font-bold mb-2 text-blue-800">Leaderboard</h1>
      <div className="w-40 h-1 bg-blue-400 rounded-full mb-8" />

      {/* top‑3 avatars (simple) */}
      <div
        ref={podiumRef}
        className={`flex justify-center items-end gap-4 mb-10
          ${podiumInView ? "reveal-show" : "reveal-hidden"}
        `}
      >
        {topThree.map((p, i) => (
          <div key={p.id} className="flex flex-col items-center">
            <img
              src={p.avatarUrl || DefaultAvatar}
              alt={p.name}
              className={`w-${i === 0 ? "24" : "20"} h-${i === 0 ? "24" : "20"}
                rounded-full shadow-xl border-4 border-cyan-200`}
            />
            <p className="mt-2 font-semibold text-blue-700">{p.name}</p>
            <p className="text-gray-600">{p.points} pts</p>
          </div>
        ))}
      </div>

      {/* rest of list */}
      <div className="w-full max-w-md bg-blue-200 rounded-xl shadow-lg p-10">
        <ol className="space-y-4">
          {others.map((e, i) => (
            <li
              key={e.id}
              className="flex justify-between items-center p-3 bg-white rounded-md shadow-sm hover:bg-blue-50"
            >
              <span className="flex items-center gap-3">
                <span className="w-6 text-right font-semibold text-gray-500">
                  {i + 4}
                </span>
                <img
                  src={e.avatarUrl || DefaultAvatar}
                  alt={e.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{e.name}</span>
              </span>
              <span className="font-semibold">{e.points} pts</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

/* ====================================================================== */
/*                             PODIUM COMPONENT                           */
/* ====================================================================== */

type PodiumEntry = {
  id: number;
  name: string;
  points: number;
  belt: string;
  gameUrl: string;
  avatarUrl?: string;
};

/* mock data if API is offline */
const MOCK_PODIUM: PodiumEntry[] = [
  {
    id: 1,
    name: "Nc guy",
    points: 2389,
    belt: "Orange Belt",
    gameUrl: "https://makecode.com/_8t7H5hMt25pH",
  },
  {
    id: 2,
    name: "WillSkr",
    points: 2360,
    belt: "Yellow Belt",
    gameUrl: "https://arcade.makecode.com/S74283-38867-31477-44837",
  },
  {
    id: 3,
    name: "Etoile",
    points: 2350,
    belt: "Yellow Belt",
    gameUrl: "https://makecode.com/_1d3aEuWUo9y6",
  },
];

const getBg = (rank: 1 | 2 | 3) =>
  rank === 1 ? firstPlaceBg : rank === 2 ? secondPlaceBg : thirdPlaceBg;

/* ───────── Glow-card itself ───────── */
const PodiumCard: React.FC<{ rank: 1 | 2 | 3; entry: PodiumEntry }> = ({
  rank,
  entry,
}) => (
  <div
    className={`
      relative flex flex-col justify-end
      ${rank === 1 ? "w-60 h-96" : "w-52 h-80 translate-y-4"}
      rounded-2xl overflow-hidden cursor-pointer
      shadow-[0_0_25px_6px_rgba(0,255,255,0.35)]
      hover:shadow-[0_0_35px_12px_rgba(0,255,255,0.45)]
      transition-transform duration-300 hover:scale-105
    `}
  >
    {/* background comic thumbnail */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${getBg(rank)})` }}
    />

    {/* dark overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

    {/* medal emoji badge */}
    <span
      className={`absolute -top-1 left-1/2 -translate-x-1/2 text-white font-black
        ${rank === 1 ? "text-4xl" : "text-3xl"}`}
    >
      {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
    </span>

    {/* text + CTA */}
    <div className="relative z-10 p-4 text-white select-none">
      <h3 className="text-2xl font-extrabold drop-shadow-md leading-tight">
        {entry.name}
      </h3>
      <p
        className={`font-semibold mb-4 ${
          entry.belt === "Yellow Belt"
            ? "text-yellow-400"
            : entry.belt === "White Belt"
              ? "text-white"
              : entry.belt === "Orange Belt"
                ? "text-orange-500"
                : ""
        }`}
      >
        {entry.belt}
      </p>
      <a
        href={entry.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full"
      >
        <button className="w-full bg-rose-500/90 backdrop-blur-md py-2 rounded-md font-bold hover:bg-rose-600/90">
          PLAY GAME
        </button>
      </a>
    </div>
  </div>
);

/* ───────── Caption + card combo ───────── */
const RankedCard: React.FC<{ rank: 1 | 2 | 3; entry: PodiumEntry }> = ({
  rank,
  entry,
}) => {
  const caption =
    rank === 1 ? "1st PLACE" : rank === 2 ? "2nd PLACE" : "3rd PLACE";
  return (
    <div className="flex flex-col items-center">
      <p
        className={`
          mb-4 text-2xl font-extrabold tracking-tight
          ${
            rank === 1
              ? "text-yellow-400"
              : rank === 2
                ? "text-gray-400"
                : rank === 3
                  ? "text-orange-800"
                  : "text-gray-300"
          }
        `}
      >
        {caption}
      </p>
      <PodiumCard rank={rank} entry={entry} />
    </div>
  );
};

/* ───────── Whole Podium section ───────── */
const Podium: React.FC = () => {
  const [entries, setEntries] = useState<PodiumEntry[]>([]);
  const [podiumRef, podiumInView] = useInView();

  useEffect(() => {
    setEntries(MOCK_PODIUM);
  }, []);

  return (
    <section
      ref={podiumRef}
      style={{
        background: `linear-gradient(
          180deg,
          #ffffff 0%,
          #f9fafb 8%,
          #1f2937 15%,
          #000000 25%,
          #000000 75%,
          #1f2937 85%,
          #f9fafb 92%,
          #ffffff 100%
        )`,
      }}
      className={`
        relative w-full flex flex-col items-center py-80 pt-72
        transition-colors duration-700
        ${podiumInView ? "text-white" : "text-gray-800"}
      `}
    >
      {/* ← New section title */}
      <h2 className="relative z-10 text-4xl font-extrabold mb-8">
        Final Week Submission Showcase
      </h2>

      <div className="relative z-10 flex items-end justify-center gap-10">
        {entries[1] && <RankedCard rank={2} entry={entries[1]} />}
        {entries[0] && <RankedCard rank={1} entry={entries[0]} />}
        {entries[2] && <RankedCard rank={3} entry={entries[2]} />}
      </div>
    </section>
  );
};

