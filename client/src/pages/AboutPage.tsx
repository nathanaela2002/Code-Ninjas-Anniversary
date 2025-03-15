import React from "react";
import { motion } from "framer-motion";
import { useInView } from "./useInView";
import Header from "./Header";
import Footer from "./Footer";
import EditProfileModal from "./EditProfileModal";

const AnimatedWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ref, isVisible] = useInView<HTMLDivElement>();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-700">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Title */}
        <AnimatedWrapper>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Cody's Missing!
            <br />
            2nd Year Anniversary Challenge
          </h1>
        </AnimatedWrapper>
        <AnimatedWrapper>
          <h2 className="text-lg text-center mb-8">
            Code Ninjas Aurora – 6 Week Challenge
          </h2>
        </AnimatedWrapper>

        {/* Mission Section */}
        <AnimatedWrapper>
          <section className="w-full mb-8">
            <div className="bg-gray-100 rounded-xl p-8 shadow">
              <h3 className="text-3xl font-semibold mb-6 text-center">
                ★ The Mission ★
              </h3>
              <p className="mb-4">
                Celebrate our 2nd anniversary by solving weekly coding riddles!
                Cody has mysteriously disappeared and needs your help to return.
                Over the course of 6 weeks, we'll release new{" "}
                <span className="font-bold text-cyan-600">
                  MakeCode Arcade Challenges
                </span>{" "}
                that will test your ninja programming skills and creativity.
              </p>
              <p>
                Gather your coding wits and get ready to crack the clues. Bring
                your best logic, speed, and teamwork to the table—the fate of
                Cody is in your hands!
              </p>
            </div>
          </section>
        </AnimatedWrapper>

        {/* How It Works Section */}
        <AnimatedWrapper>
          <section className="w-full mb-8">
            <div className="bg-gray-100 rounded-xl p-8 shadow">
              <h3 className="text-3xl font-semibold mb-6 text-center">
                ⚡ How It Works ⚡
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
                  One new riddle released weekly for 6 weeks
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
                  Solve MakeCode Arcade problems of increasing difficulty
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
                  Earn points based on correct solutions and speed
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
                  Track your progress on our live leaderboard
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full mr-3" />
                  The top 3 ninjas win exclusive prizes!
                </li>
              </ul>
            </div>
          </section>
        </AnimatedWrapper>

        {/* Weekly Challenges Section */}
        <AnimatedWrapper>
          <section className="w-full mb-8">
            <div className="bg-gray-100 rounded-xl p-8 shadow border border-gray-300">
              <h3 className="text-3xl font-semibold mb-8 text-center">
                📅 Weekly Challenges 📅
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[1, 2, 3, 4, 5, 6].map((week) => (
                  <motion.a
                    href={`/riddle/${week}`}
                    key={week}
                    whileHover={{ scale: 1.05 }}
                    className="p-1 bg-blue-300 rounded-lg"
                  >
                    <div className="bg-gray-100 rounded-lg p-4 h-full">
                      Week {week}
                      <br />
                      {week === 1
                        ? "Operators"
                        : week === 2
                          ? "Sequencing"
                          : week === 3
                            ? "Math Operations"
                            : week === 4
                              ? "Conditionals"
                              : week === 5
                                ? "Tilemaps"
                                : week === 6
                                  ? "Anniversary"
                                  : ""}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        </AnimatedWrapper>

        {/* Prizes CTA Section */}
        <AnimatedWrapper>
          <section className="w-full mb-8">
            <div className="bg-gray-100 rounded-xl p-8 text-center">
              <h3 className="text-3xl font-bold mb-6 text-gray-700">
                🏆 Legendary Prizes Await! 🏆
              </h3>
              <p className="text-gray-700 mb-6">
                Check out the amazing prizes you could win in our anniversary
                challenge!
              </p>
              <motion.a
                href="/prizes"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-transparent border-4 border-blue-700 font-bold px-8 py-4 rounded-full shadow"
              >
                View All Prizes →
              </motion.a>
            </div>
          </section>
        </AnimatedWrapper>

        {/* Call to Action */}
        <AnimatedWrapper>
          <div className="text-center">
            <motion.a
              href="/riddle/1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-transparent border-4 border-blue-700 font-bold px-8 py-4 rounded-full shadow"
            >
              Accept the Mission →
            </motion.a>
            <p className="mt-4 text-gray-600">
              Challenge begins March 18, 2025 – All belts welcome!
            </p>
          </div>
        </AnimatedWrapper>
      </main>
      <Footer />
      <EditProfileModal />
    </div>
  );
};

export default About;
