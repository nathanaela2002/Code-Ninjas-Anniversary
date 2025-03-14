import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import tutorialVideo from "./tutorial-video.mp4";

const TutorialPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen font-sans bg-white text-gray-800">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Watch the Tutorial
          </h1>
          <div className="flex justify-center">
            <video
              className="w-full max-w-3xl rounded shadow-lg"
              controls
              width="750"
              height="500"
            >
              <source src={tutorialVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <div className="flex justify-center mt-8">
          <a
            href="/login"
            className="inline-block bg-yellow-400 text-white text-lg font-semibold px-6 py-2 rounded-md shadow hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
          >
            Let's Go!
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialPage;
