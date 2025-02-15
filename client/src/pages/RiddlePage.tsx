import React, { useState } from "react";
import { useParams } from "react-router-dom";
import confetti from "canvas-confetti";
import NinjaImage from "./ninja.png";
import NinjaComic1 from "./ninjacomic1.png";
import Header from "./Header";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";
import { useInView } from "./useInView"; // Import the hook

const riddlesData: Record<string, { week: number; content: string; riddle: string; comic: string }> = {
  "1": {
    week: 1,
    content:
      "Codey makes his way back to the center, he creates a map and pinpoints the locations where the decorations will be placed. To really fall in line with the birthday anniversary theme, drastic changes are made to the dojo and lab with previously existing items being replaced by ninja stars and birthday-themed decorations. All is according to plan, what is yet to be discovered is what Codey did next.",
    riddle:
      "A ninja shop, its name not right, an alligator eats yet portions are light, Two bugs in the code, one bites, one blue, fix them both to uncover the clue!",
    comic: NinjaComic1,
  },
  "2": {
    week: 2,
    content:
      "Codey makes his way back to the center, he creates a map and pinpoints the locations where the decorations will be placed. To really fall in line with the birthday anniversary theme, drastic changes are made to the dojo and lab with previously existing items being replaced by ninja stars and birthday themed decorations. All is according to plan, what is yet to be discovered is what Codey did next.",
    riddle:
      "Codey’s dojo lies undone, A puzzle waits for everyone. Walls must rise and tiles align, A test of skill, a mastermind. Beware the blocks that trap or halt, One wrong move, it’s your fault. Dodge the roomba, the table too, Navigate smart, and see it through. Reach the lab where truths attack, Solve this now what word comes back?",
    comic: NinjaComic1,
  },
  "3": {
    week: 3,
    content:
      "As Codey finished setting up decorations around the dojo, a cloud of smoke washed over the room, instinctively, per his ninja training, Codey prepared for the worst. Three mysterious figures could faintly be seen behind smoke, and in the blink of an eye, they vanished. The smoke disappeared and so too did Codey. A clue was left behind, but that's for you to uncover.",
    riddle:
      "A cloud of smoke, a flash, a fright, Three shadows vanish into the night. Codey’s gone, the dojo’s still, A clue remains to test your skill. Sprites appear in disarray, Their order lost, led astray. Chance and math, the code’s unclear, Fix the logic, bring truth near. Solve the puzzle, restore the quests, Let's hope you’re feeling blessed.",
    comic: NinjaComic1,
  },
  "4": {
    week: 4,
    content:
      "With knowledge of the previous clue, an investigation on belts around the dojo was conducted, it was noticed that the white, yellow, and green belts had mysteriously disappeared. A riddle was written beneath each belt’s original resting place, potentially revealing their hidden locations, the first under white belt reads:",
    riddle:
      "If this happens, then that will too. Ninjas train here to move and fight for you. Find the place where actions begin, and ninjas start to spin!",
    comic: NinjaComic1,
  },
  "5": {
    week: 5,
    content:
      "With the white belt now being found, it was time to find the yellow belt, the passage under said belt reads:",
    riddle:
      "In rows and rows, ninjas grow. Each has its place, all in a row. Look for the farm where ninjas train, neatly lined up like grain.",
    comic: NinjaComic1,
  },
  "6": {
    week: 6,
    content:
      "Two belts down, and one more remains, the yellow belt riddle reads:",
    riddle:
      "Round and round, ninjas run fast, looping forever, never the last. Find the dimension where racers speed.",
    comic: NinjaComic1,
  },
  "7": {
    week: 7,
    content:
      "It’s the last week before anniversary and all the belts have been found, but, where’s Codey? Back to the dojo we go, and here lays the final quest.",
    riddle:
      "Back to where it all began, mystery, fun, and riddles at hand. An adventure for sure for the ones who remain, but beware of the boss at the end of the game. To relive this quest, use your code to create, and make this adventure forever great!",
    comic: NinjaComic1,
  },
};

const fireConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 1000,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

export default function RiddlePage() {
  const { id } = useParams();
  const [currentInput, setCurrentInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);

  // Create refs with useInView for each major section
  const [introRef, introInView] = useInView();
  const [comicRef, comicInView] = useInView();
  const [riddleRef, riddleInView] = useInView();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    if (isCorrect) setIsCorrect(false);
    if (hasSubmit) setHasSubmit(false);
  };

  const handleSubmit = () => {
    const answer = currentInput.trim().toLowerCase();
    setHasSubmit(true);
    if (answer === "cookies") {
      setIsCorrect(true);
      fireConfetti(); // Confetti trigger added here
    } else {
      setIsCorrect(false);
    }
    setCurrentInput("");
  };

  const currentRiddle = riddlesData[id ?? "1"] || riddlesData["1"];

  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Intro Section */}
        <section
          ref={introRef}
          className={`flex flex-col md:flex-row items-center md:space-x-8 ${introInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <div className="flex-shrink-0 mb-6 md:mb-0 md:w-1/2 lg:w-1/3">
            <img
              src={NinjaImage}
              alt="Riddles Ninja"
              className="h-[400px] w-[300px] max-w-sm mx-auto"
            />
          </div>
          <div className="md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Ready to Solve the Riddles? <br className="hidden md:block" />
              Unlock the secrets to bring Cody back home!
            </h1>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Each riddle contains clues that will help you move forward. Solve
              the puzzles and prove your ninja skills!
            </p>
          </div>
        </section>

        {/* Comic Section */}
        <section
          ref={comicRef}
          className={`flex flex-col items-center justify-center mb-12 ${comicInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <div className="flex justify-center w-2/3">
            <img
              src={currentRiddle.comic}
              alt="Riddles Ninja Comic"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Riddle Section */}
        <section
          ref={riddleRef}
          className={`bg-gray-50 p-6 rounded-lg shadow-md relative ${riddleInView ? "reveal-show" : "reveal-hidden"}`}
        >
          <h2 className="text-2xl font-bold mb-4">Week {currentRiddle.week}</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">{currentRiddle.content}</p>

          <h2 className="text-2xl font-bold mb-4">Riddle</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">{currentRiddle.riddle}</p>

          <div className="mt-6">
            <label htmlFor="riddleAnswer" className="block font-semibold mb-2">
              Your Answer:
            </label>
            <input
              id="riddleAnswer"
              type="text"
              placeholder="Enter your answer here..."
              value={currentInput}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="mt-4 bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            >
              Submit
            </button>

            {hasSubmit && (
              <>
                {isCorrect ? (
                  <div className="animate-slideIn mt-4 p-4 bg-green-100 border-2 border-green-400 rounded-lg flex items-center">
                    <svg
                      className="animate-tick h-6 w-6 text-green-600 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-green-700 font-semibold">
                      🎉 Correct! You've solved the riddle!
                    </span>
                  </div>
                ) : (
                  <div className="animate-slideIn mt-4 p-4 bg-red-100 border-2 border-red-400 rounded-lg flex items-center">
                    <svg
                      className="h-6 w-6 text-red-600 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-red-700 font-semibold">
                      ❌ Not quite! Keep trying, ninja!
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <EditProfileModal />
    </div>
  );
}
