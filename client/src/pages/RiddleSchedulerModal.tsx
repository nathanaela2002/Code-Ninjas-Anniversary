// comment for author authentication
import React, { useState, useEffect } from "react";
import { weekDates } from "./HomePage";

interface TimeLeft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RiddleSchedulerModal() {
  // Create the schedule from weekDates imported from HomePage.
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

  // Get the current day of the week (0=Sun, 1=Mon, …, 6=Sat)
  const dayOfWeek = now.getDay();

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    nextRiddle
      ? calculateTimeLeft(schedule.find((s) => s.week === nextRiddle)?.date)
      : null,
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

  // When less than or equal to 4 days remain, show the countdown
  if (timeLeft && timeLeft.total > 0 && timeLeft.days <= 4) {
    return (
      <div className="modal-container flex flex-col items-center p-4">
        <h2 className="text-3xl font-bold -mb-2">Countdown to next riddle!</h2>
        <CountdownDisplay timeLeft={timeLeft} />
      </div>
    );
  } else {
    // Otherwise, display that the riddle is live now.
    return (
      <div className="modal-container text-center p-4">
        <h2 className="text-4xl font-bold text-green-600">
          Riddle {currentRiddle} is live now!
        </h2>
      </div>
    );
  }
}

/**
 * Helper function to determine if the countdown should be shown.
 * Only shows countdown on Saturday, Sunday, or Monday.
 */
function shouldShowCountdown(dayOfWeek: number) {
  return dayOfWeek === 6 || dayOfWeek === 0 || dayOfWeek === 1;
}

/**
 * Calculates the time difference between now and the target date.
 */
function calculateTimeLeft(targetDate?: Date): TimeLeft {
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

/**
 * Displays the countdown boxes (days, hours, minutes, seconds).
 */
function CountdownDisplay({ timeLeft }: { timeLeft: TimeLeft }) {
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

/**
 * A single countdown box that displays a value and its label.
 */
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
