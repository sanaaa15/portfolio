import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Star, X, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export interface HiddenGameRef {
  openGame: () => void;
}

interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  created_at: string;
}

const HiddenGame = forwardRef<HiddenGameRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [starPosition, setStarPosition] = useState({ x: 50, y: 50 });
  const [showNameInput, setShowNameInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openGame: () => setIsOpen(true),
  }));

  // Load leaderboard when modal opens
  useEffect(() => {
    if (isOpen) {
      loadLeaderboard();
    }
  }, [isOpen]);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("game_leaderboard")
        .select("*")
        .order("score", { ascending: false })
        .limit(5);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error("Failed to load leaderboard:", error);
    }
  };

  const moveStarRandomly = useCallback(() => {
    setStarPosition({
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 20,
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
    if (!playerName.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from("game_leaderboard").insert({
        player_name: playerName.trim(),
        score: score,
      });

      if (error) throw error;

      await loadLeaderboard();
      setShowNameInput(false);
      setPlayerName("");
    } catch (error) {
      console.error("Failed to save score:", error);
    } finally {
      setIsLoading(false);
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
            className="relative bg-paper-cream rounded-2xl p-5 md:p-6 max-w-sm w-full shadow-xl paper-texture"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>

            <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-3">
              ⭐ Star Catcher
            </h3>

            {!isPlaying && !gameOver && (
              <div className="text-center space-y-3">
                <p className="text-muted-foreground text-sm">
                  Click the star as fast as you can!
                </p>
                <motion.button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-tab-pink text-foreground rounded-xl font-semibold shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game
                </motion.button>
              </div>
            )}

            {isPlaying && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/70 rounded-full">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="font-bold text-foreground">{score}</span>
                  </div>
                  <div className="px-3 py-1 bg-white/70 rounded-full">
                    <span className="font-bold text-foreground">{timeLeft}s</span>
                  </div>
                </div>

                <div className="relative h-56 bg-paper-lavender/50 rounded-xl overflow-hidden border border-white/50">
                  <motion.button
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${starPosition.x}%`, top: `${starPosition.y}%` }}
                    onClick={handleStarClick}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ rotate: { duration: 0.8, repeat: Infinity } }}
                  >
                    <Star className="w-10 h-10 text-amber-400 fill-current drop-shadow-md" />
                  </motion.button>
                </div>
              </div>
            )}

            {gameOver && (
              <div className="space-y-3">
                <div className="text-center py-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-1" />
                  </motion.div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {score} stars!
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {score >= 25 ? "Amazing! ⭐" : score >= 15 ? "Great! 🌟" : "Keep trying! ✨"}
                  </p>
                </div>

                {showNameInput && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your name..."
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white/80 rounded-lg border border-tab-lavender focus:border-primary outline-none text-sm text-foreground"
                      maxLength={12}
                    />
                    <motion.button
                      onClick={handleSubmitScore}
                      disabled={isLoading}
                      className="w-full px-3 py-2 bg-tab-mint text-foreground rounded-lg font-semibold text-sm disabled:opacity-50"
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? "Saving..." : "Save Score"}
                    </motion.button>
                  </div>
                )}

                <motion.button
                  onClick={startGame}
                  className="w-full px-3 py-2 bg-tab-pink text-foreground rounded-lg font-semibold text-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Play Again
                </motion.button>
              </div>
            )}

            {/* Leaderboard */}
            <div className="mt-4 pt-4 border-t border-white/50">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5 mb-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                Top Scores
              </h4>
              <div className="space-y-1.5">
                {leaderboard.length === 0 ? (
                  <p className="text-muted-foreground text-xs text-center py-2">
                    No scores yet!
                  </p>
                ) : (
                  leaderboard.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm ${
                        index === 0
                          ? "bg-amber-100/60"
                          : index === 1
                          ? "bg-slate-100/60"
                          : index === 2
                          ? "bg-orange-100/60"
                          : "bg-white/40"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="font-bold text-foreground w-5 text-xs">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index + 1}.`}
                      </span>
                      <span className="flex-1 font-medium text-foreground truncate text-xs">
                        {entry.player_name}
                      </span>
                      <span className="font-bold text-foreground flex items-center gap-0.5 text-xs">
                        {entry.score}
                        <Star className="w-3 h-3 text-amber-400 fill-current" />
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
