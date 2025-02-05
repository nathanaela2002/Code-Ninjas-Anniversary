import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-200 py-8 px-4 flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-blue-400 mb-2 text-center">
          Codey's Missing! 2nd Anniversary Mystery
        </h1>
        <h2 className="text-lg text-gray-700 text-center mb-8">
          Code Ninjas Aurora – 7 Week Challenge
        </h2>

        {/* Mission Section */}
        <section className="bg-blue-200 w-full max-w-4xl rounded-lg shadow p-6 mb-8">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">
            ★ The Mission ★
          </h3>
          <p className="mb-2 text-gray-700">
            Celebrate our 2nd anniversary by solving weekly coding riddles! Codey has mysteriously
            disappeared and needs your help to return. Over the course of 7 weeks, we’ll release new
            <span className="text-blue-400"> MakeCode Arcade challenges</span> that will test your
            ninja programming skills and creativity. Each riddle will point you toward the key to
            finding Codey!
            Gather your coding wits and get ready to crack the clues. Bring your best logic, speed,
            and teamwork to the table—the fate of Codey is in your hands!
          </p>
        </section>

        {/* How It Works Section */}
        <section className="bg-blue-200 w-full max-w-4xl rounded-lg shadow p-6 mb-8">
          <h3 className="text-2xl font-semibold text-orange-500 mb-4">
            ⚡ How It Works ⚡
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>One new riddle released weekly for 7 weeks</li>
            <li>Solve MakeCode Arcade problems of increasing difficulty</li>
            <li>Earn points based on correct solutions and speed</li>
            <li>Track your progress on our live leaderboard</li>
            <li>The top 3 ninjas win exclusive prizes!</li>
          </ul>
        </section>

        {/* Weekly Challenges Section */}
        <section className="bg-blue-200 w-full max-w-4xl rounded-lg shadow p-6 mb-8">
          <h3 className="text-2xl font-semibold text-white-300 mb-6 text-center text-gray-500">
            📅 Weekly Challenges 📅
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 rounded p-4">Week 1:<br />Operators</div>
            <div className="bg-gray-700 rounded p-4">Week 2:<br />Sequencing</div>
            <div className="bg-gray-700 rounded p-4">Week 3:<br />???</div>
            <div className="bg-gray-700 rounded p-4">Week 4:<br />???</div>
            <div className="bg-gray-700 rounded p-4">Week 5:<br />???</div>
            <div className="bg-gray-700 rounded p-4">Week 6:<br />???</div>
            <div className="bg-gray-700 rounded p-4 col-span-3">
              Week 7:<br />Final Showdown
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section className="bg-blue-200 w-full max-w-4xl rounded-lg shadow p-6 mb-8">
          <h3 className="text-2xl font-semibold text-yellow-700 mb-4 text-center">
            🏆 Legendary Prizes 🏆
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded p-4 text-center">
              <p className="font-bold mb-1">1st Place</p>
              <p>Play Station 5</p>
            </div>
            <div className="bg-gray-700 rounded p-4 text-center">
              <p className="font-bold mb-1">2nd Place</p>
              <p>DJI Neo Mini Drone</p>
            </div>
            <div className="bg-gray-700 rounded p-4 text-center">
              <p className="font-bold mb-1">3rd Place</p>
              <p>Iphone 14 Pro Max</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <a href="/riddle/1">
            <button className="bg-blue-400 hover:bg-blue-300 text-black font-semibold px-6 py-3 rounded-full shadow">
              Accept the Mission →
            </button>
            </a>
          <p className="mt-2 text-gray-400">
            Challenge begins [Start Date] – All belts welcome!
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
