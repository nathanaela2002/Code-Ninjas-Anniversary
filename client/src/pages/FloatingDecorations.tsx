import { useMemo } from "react";

const FloatingDecorations = () => {
  const confettiColors = [
    "#FF6B6B",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#845EC2",
  ];

  // Generate an array of balloon objects with random properties

  // Generate an array of confetti pieces with random properties
  const confettiPieces = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100, // percentage
      delay: Math.random() * 5, // seconds
      size: 8 + Math.random() * 4, // size in pixels
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    }));
  }, [confettiColors]);

  return (
    <>
      <div className="floating-decorations">
        {confettiPieces.map((piece, index) => (
          <div
            key={`confetti-${index}`}
            className="confetti"
            style={{
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              animationDelay: `${piece.delay}s`,
              backgroundColor: piece.color,
            }}
          />
        ))}
      </div>
      <style>{`
          .floating-decorations {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            overflow: hidden;
            z-index: 0;
          }
          @keyframes floatUp {
            0% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translateY(-120vh) scale(1.2);
              opacity: 1;
            }
          }
          .confetti {
            position: absolute;
            top: -20px;
            transform: rotate(0deg);
            opacity: 1;
            filter: brightness(1.3);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            animation: fallConfetti 7s linear infinite;
          }
          @keyframes fallConfetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(120vh) rotate(360deg);
              opacity: 1;
            }
          }
        `}</style>
    </>
  );
};

export default FloatingDecorations;

