import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useViewportScroll } from "framer-motion";
import firstImage from "./tablet.png";
import secondImage from "./smartwatch.png";
import thirdImage from "./headset.png";
import Header from "./Header";
import Footer from "./Footer";

const HyperspaceTunnel = ({ progress }: { progress: any }) => {
  const scale = useTransform(progress, [0, 1], [1, 100]);
  const rotate = useTransform(progress, [0, 1], [0, 360]);

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-b from-blue-900 via-blue-900 to-black"
      style={{
        scale,
        rotate,
        transformOrigin: "center center",
      }}
    >
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/93919/stars.png')] opacity-50" />
    </motion.div>
  );
};

const StarWarsScroll = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [index * -100, index * 100]);
  const opacity = useTransform(scrollYProgress, 
    [(index - 0.5) / 3, index / 3, (index + 0.5) / 3],
    [0, 1, 0]
  );
  const scale = useTransform(scrollYProgress, 
    [(index - 0.5) / 3, index / 3, (index + 0.5) / 3],
    [0.5, 1, 0.5]
  );

  return (
    <motion.section 
      className="h-screen flex items-center justify-center p-8"
      style={{ 
        opacity,
        y,
        scale,
        position: "relative",
        zIndex: 100 - index 
      }}
    >
      {children}
    </motion.section>
  );
};

const InteractiveImageCard = ({ src, title, description }: any) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <div className="relative w-full max-w-4xl h-128 perspective-1000">
      <motion.div 
        className="relative h-full w-full bg-black/50 rounded-3xl p-8 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl border border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          ref={imageRef}
          className="w-96 h-96 mb-8 relative cursor-grab active:cursor-grabbing"
          onMouseMove={(e) => {
            const rect = imageRef.current?.getBoundingClientRect();
            if (rect) {
              x.set(e.clientX - rect.left - rect.width / 2);
              y.set(e.clientY - rect.top - rect.height / 2);
            }
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={src} 
            className="w-full h-full object-contain" 
            draggable="false"
            style={{ transform: "translateZ(50px)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        </motion.div>
        <motion.h3 
          className="text-5xl font-bold text-white mb-4 text-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-300 text-xl text-center max-w-2xl"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

const Podium = ({ prizes }: any) => {
  return (
    <section className="h-screen flex items-end justify-center gap-8 px-4 relative z-50">
      {/* 2nd Place */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ height: "70%", flex: 1 }}
      >
        <div className="w-full bg-gradient-to-b from-purple-500 to-pink-600 p-1 rounded-t-xl shadow-2xl">
          <div className="bg-gray-900/90 w-full h-full rounded-t-xl p-6 flex flex-col items-center backdrop-blur-sm">
            <motion.img 
              src={prizes[1].image} 
              className="w-32 h-32 mb-4 object-contain"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
            />
            <h3 className="text-2xl font-bold text-white">{prizes[1].title}</h3>
            <p className="text-gray-300 text-center">{prizes[1].description}</p>
          </div>
        </div>
        <div className="text-4xl font-bold text-white mt-4">#2</div>
      </motion.div>

      {/* 1st Place */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ height: "100%", flex: 1.5 }}
      >
        <div className="w-full bg-gradient-to-b from-yellow-400 to-orange-600 p-1 rounded-t-xl shadow-2xl">
          <div className="bg-gray-900/90 w-full h-full rounded-t-xl p-8 flex flex-col items-center backdrop-blur-sm">
            <motion.img 
              src={prizes[0].image} 
              className="w-48 h-48 mb-4 object-contain"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            />
            <h3 className="text-3xl font-bold text-white">{prizes[0].title}</h3>
            <p className="text-gray-300 text-center">{prizes[0].description}</p>
          </div>
        </div>
        <div className="text-4xl font-bold text-white mt-4 animate-pulse">#1</div>
      </motion.div>

      {/* 3rd Place */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 200, scale: 0.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ height: "50%", flex: 1 }}
      >
        <div className="w-full bg-gradient-to-b from-blue-500 to-cyan-600 p-1 rounded-t-xl shadow-2xl">
          <div className="bg-gray-900/90 w-full h-full rounded-t-xl p-6 flex flex-col items-center backdrop-blur-sm">
            <motion.img 
              src={prizes[2].image} 
              className="w-32 h-32 mb-4 object-contain"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 }}
            />
            <h3 className="text-2xl font-bold text-white">{prizes[2].title}</h3>
            <p className="text-gray-300 text-center">{prizes[2].description}</p>
          </div>
        </div>
        <div className="text-4xl font-bold text-white mt-4">#3</div>
      </motion.div>
    </section>
  );
};

const PrizePage = () => {
  const { scrollYProgress } = useViewportScroll();
  
  const prizes = [
    {
      title: "First Prize",
      description: "Samsung Galaxy Tab S9 FE - Your portal to the stars",
      image: firstImage,
    },
    {
      title: "Second Prize",
      description: "Apple Watch Series 10 - Track space-time continuum",
      image: secondImage,
    },
    {
      title: "Third Prize",
      description: "Sony WH-1000XM5 - Silence the vacuum of space",
      image: thirdImage,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Header />

      <HyperspaceTunnel progress={scrollYProgress} />
      
      <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-black z-60 pointer-events-none" />

      <main className="relative z-50">
        <motion.section 
          className="h-screen flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <motion.h1
              className="text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
              initial={{ letterSpacing: "2em", opacity: 0 }}
              animate={{ letterSpacing: "0.1em", opacity: 1 }}
              transition={{ duration: 2, ease: "circOut" }}
            >
              CODY'S PRIZES
            </motion.h1>
            <motion.div
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Who will be the one to take it home...
            </motion.div>
          </div>
        </motion.section>

        {prizes.reverse().map((prize, index) => (
          <StarWarsScroll key={index} index={index}>
            <InteractiveImageCard
              src={prize.image}
              title={prize.title}
              description={prize.description}
            />
          </StarWarsScroll>
        ))}

        <Podium prizes={prizes.reverse()} />
      </main>

      <Footer />
    </div>
  );
};

export default PrizePage;