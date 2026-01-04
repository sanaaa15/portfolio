import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Star, X, Trophy } from "lucide-react";
import { FirebaseLeaderboardService, type LeaderboardEntry } from "@/lib/leaderboard";

export interface HiddenGameRef {
  openGame: () => void;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { name: "Sana ⭐", score: 42, date: "2024-01-01" },
  { name: "Cutie Pie", score: 38, date: "2024-01-02" },
  { name: "Star Player", score: 35, date: "2024-01-03" },
  { name: "Lucky Duck", score: 30, date: "2024-01-04" },
  { name: "Sparkle", score: 25, date: "2024-01-05" },
];

const HiddenGame = forwardRef<HiddenGameRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(DEFAULT_LEADERBOARD);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });
  const [showNameInput, setShowNameInput] = useState(false);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [isSavingScore, setIsSavingScore] = useState(false);

  useImperativeHandle(ref, () => ({
    openGame: () => setIsOpen(true),
  }));

  // Load leaderboard from Firebase when modal opens
  useEffect(() => {
    if (isOpen && !isLoadingLeaderboard) {
      loadLeaderboard();
    }
  }, [isOpen]);

  const loadLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const scores = await FirebaseLeaderboardService.getTopScores(5);
      if (scores.length > 0) {
        setLeaderboard(scores);
      } else {
        setLeaderboard(DEFAULT_LEADERBOARD);
      }
    } catch (error) {
      console.error('Failed to load leaderboard, using defaults:', error);
      setLeaderboard(DEFAULT_LEADERBOARD);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

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

  const handleSubmitScore = async () => {
    if (!playerName.trim() || isSavingScore) return;
    
    setIsSavingScore(true);
    try {
      // Save to Firebase
      await FirebaseLeaderboardService.addScore(playerName, score);
      
      // Reload leaderboard
      await loadLeaderboard();
      
      setShowNameInput(false);
      setPlayerName("");
    } catch (error) {
      console.error('Failed to save score:', error);
      // Fallback to local update if Firebase fails
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
    } finally {
      setIsSavingScore(false);
    }
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
            className="relative bg-gradient-to-b from-sky-100 to-violet-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, rotate: 5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <h3 className="text-3xl font-heading font-bold text-foreground text-center mb-4">
              ✨ Star Catcher ✨
            </h3>

            {!isPlaying && !gameOver && (
              <div className="text-center space-y-4">
                <div className="bg-white/60 rounded-xl p-4">
                  <p className="text-foreground font-medium mb-2">Click the star as many times as you can!</p>
                  <p className="text-muted-foreground text-sm">You have 10 seconds ⏱️</p>
                </div>
                <motion.button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-rose-400 to-violet-400 text-white rounded-2xl font-bold text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game!
                </motion.button>
              </div>
            )}

            {isPlaying && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-bold text-foreground">{score}</span>
                  </div>
                  <div className="px-4 py-2 bg-white/80 rounded-full shadow-sm">
                    <span className="font-bold text-foreground">{timeLeft}s</span>
                  </div>
                </div>

                <div className="relative h-72 bg-gradient-to-b from-sky-200/50 to-violet-200/50 rounded-2xl overflow-hidden border-2 border-white/50">
                  <motion.button
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${starPosition.x}%`, top: `${starPosition.y}%` }}
                    onClick={handleStarClick}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ rotate: { duration: 1, repeat: Infinity } }}
                  >
                    <Star className="w-12 h-12 text-amber-400 fill-current drop-shadow-lg" />
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
                    <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-2" />
                  </motion.div>
                  <p className="text-3xl font-heading font-bold text-foreground">
                    {score} stars!
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {score >= 30 ? "Amazing! ⭐" : score >= 20 ? "Great job! 🌟" : "Keep practicing! ✨"}
                  </p>
                </div>

                {showNameInput && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-4 py-3 bg-white/80 rounded-xl border-2 border-violet-200 focus:border-violet-400 outline-none font-medium text-foreground"
                      maxLength={15}
                    />
                    <motion.button
                      onClick={handleSubmitScore}
                      disabled={isSavingScore}
                      className="w-full px-4 py-3 bg-emerald-400 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isSavingScore ? 1 : 1.02 }}
                      whileTap={{ scale: isSavingScore ? 1 : 0.98 }}
                    >
                      {isSavingScore ? "Saving..." : "Save Score"}
                    </motion.button>
                  </div>
                )}

                <motion.button
                  onClick={startGame}
                  className="w-full px-4 py-3 bg-gradient-to-r from-rose-400 to-violet-400 text-white rounded-xl font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Play Again!
                </motion.button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t-2 border-white/50">
              <h4 className="text-xl font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-400" />
                Top Star Catchers
              </h4>
              <div className="space-y-2">
                {isLoadingLeaderboard ? (
                  <div className="text-center text-muted-foreground py-4">
                    Loading leaderboard... ⏳
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    No scores yet! Be the first! ✨
                  </div>
                ) : (
                  leaderboard.map((entry, index) => (
                    <motion.div
                      key={`${entry.name}-${entry.score}-${entry.date}`}
                      className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                        index === 0 ? "bg-amber-200/60" :
                        index === 1 ? "bg-slate-200/60" :
                        index === 2 ? "bg-orange-200/60" :
                        "bg-white/40"
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
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

HiddenGame.displayName = "HiddenGame";

export default HiddenGame;
