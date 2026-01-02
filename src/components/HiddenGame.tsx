import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star, X, Trophy, Sparkles, Heart } from "lucide-react";

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

const HiddenGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { name: "Sana ⭐", score: 42, date: "2024-01-01" },
    { name: "Cutie Pie", score: 38, date: "2024-01-02" },
    { name: "Star Player", score: 35, date: "2024-01-03" },
    { name: "Lucky Duck", score: 30, date: "2024-01-04" },
    { name: "Sparkle", score: 25, date: "2024-01-05" },
  ]);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });
  const [showNameInput, setShowNameInput] = useState(false);

  const moveStarRandomly = useCallback(() => {
    setStarPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
    });
  }, []);

  const handleStarClick = () => {
    if (!isPlaying) return;
    setScore((prev) => prev + 1);
    moveStarRandomly();
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsPlaying(true);
    setGameOver(false);
    setShowNameInput(false);
    moveStarRandomly();
  };

  const handleSubmitScore = () => {
    if (!playerName.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      name: playerName,
      score: score,
      date: new Date().toISOString().split("T")[0],
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setLeaderboard(updatedLeaderboard);
    setShowNameInput(false);
    setPlayerName("");
  };

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          setGameOver(true);
          setShowNameInput(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <>
      {/* Hidden trigger - cute star button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-tab-yellow rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <Sparkles className="w-6 h-6 text-foreground" />
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="relative bg-paper-cream rounded-3xl p-6 md:p-8 max-w-md w-full shadow-paper-lg paper-texture"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: 5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 bg-paper-pink rounded-full hover:bg-tab-pink transition-colors"
              >
                <X className="w-4 h-4 text-foreground" />
              </button>

              {/* Decorative tape */}
              <div className="absolute -top-3 left-8 w-16 h-6 bg-tab-pink/70 transform -rotate-6 rounded-sm" />
              <div className="absolute -top-2 right-12 w-12 h-5 bg-tab-lavender/70 transform rotate-3 rounded-sm" />

              <h3 className="text-3xl font-display font-bold text-foreground text-center mb-4">
                ✨ Star Catcher ✨
              </h3>

              {!isPlaying && !gameOver && (
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    Catch as many stars as you can in 10 seconds!
                  </p>
                  <motion.button
                    onClick={startGame}
                    className="px-6 py-3 bg-tab-pink text-foreground rounded-xl font-bold text-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Play Now!
                  </motion.button>
                </div>
              )}

              {isPlaying && (
                <div className="space-y-4">
                  {/* Game stats */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-paper-pink rounded-full">
                      <Star className="w-5 h-5 text-tab-yellow fill-current" />
                      <span className="font-bold text-foreground">{score}</span>
                    </div>
                    <div className="px-4 py-2 bg-paper-lavender rounded-full">
                      <span className="font-bold text-foreground">{timeLeft}s</span>
                    </div>
                  </div>

                  {/* Game area */}
                  <div className="relative h-64 bg-gradient-to-b from-paper-lavender/30 to-paper-mint/30 rounded-2xl overflow-hidden border-2 border-dashed border-primary/30">
                    <motion.button
                      className="absolute p-3"
                      style={{
                        left: `${starPosition.x}%`,
                        top: `${starPosition.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onClick={handleStarClick}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 0.5, repeat: Infinity },
                      }}
                    >
                      <Star className="w-10 h-10 text-tab-yellow fill-current drop-shadow-lg" />
                    </motion.button>
                  </div>
                </div>
              )}

              {gameOver && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Heart className="w-16 h-16 text-tab-pink fill-current mx-auto mb-2" />
                    </motion.div>
                    <p className="text-2xl font-display font-bold text-foreground">
                      You caught {score} stars!
                    </p>
                  </div>

                  {showNameInput && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Enter your name..."
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full px-4 py-3 bg-paper-pink/30 rounded-xl border-2 border-tab-pink/30 focus:border-tab-pink outline-none font-medium text-foreground"
                        maxLength={15}
                      />
                      <motion.button
                        onClick={handleSubmitScore}
                        className="w-full px-4 py-3 bg-tab-mint text-foreground rounded-xl font-bold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Save Score
                      </motion.button>
                    </div>
                  )}

                  <motion.button
                    onClick={startGame}
                    className="w-full px-4 py-3 bg-tab-pink text-foreground rounded-xl font-bold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Play Again!
                  </motion.button>
                </div>
              )}

              {/* Leaderboard */}
              <div className="mt-6 pt-6 border-t-2 border-dashed border-primary/20">
                <h4 className="text-xl font-display font-bold text-foreground flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-tab-yellow" />
                  Top 5 Star Catchers
                </h4>
                <div className="space-y-2">
                  {leaderboard.map((entry, index) => (
                    <motion.div
                      key={`${entry.name}-${entry.score}`}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                        index === 0
                          ? "bg-tab-yellow/30"
                          : index === 1
                          ? "bg-tab-lavender/30"
                          : index === 2
                          ? "bg-tab-pink/30"
                          : "bg-paper-mint/30"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-bold text-foreground w-6">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                      </span>
                      <span className="flex-1 font-medium text-foreground truncate">
                        {entry.name}
                      </span>
                      <span className="font-bold text-foreground flex items-center gap-1">
                        {entry.score}
                        <Star className="w-4 h-4 text-tab-yellow fill-current" />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HiddenGame;
