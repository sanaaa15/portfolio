import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { Star, X, Trophy, Heart, Sparkles, Zap, Target } from "lucide-react";

interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

interface FallingItem {
  id: number;
  x: number;
  type: "star" | "heart" | "sparkle" | "bomb";
  speed: number;
}

export interface HiddenGameRef {
  openGame: () => void;
}

const LEADERBOARD_KEY = "starCatcher_leaderboard";

const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveLeaderboard = (entries: LeaderboardEntry[]) => {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch {
    console.error("Error saving leaderboard");
  }
};

const HiddenGame = forwardRef<HiddenGameRef>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const [combo, setCombo] = useState(0);
  const [lives, setLives] = useState(3);
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  useImperativeHandle(ref, () => ({
    openGame: () => setIsOpen(true),
  }));

  const spawnItem = useCallback(() => {
    const types: FallingItem["type"][] = ["star", "star", "heart", "sparkle", "bomb"];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      type,
      speed: 2 + Math.random() * 2,
    };
    
    setFallingItems(prev => [...prev, newItem]);
  }, []);

  const handleCatch = (item: FallingItem) => {
    if (!isPlaying) return;
    
    setFallingItems(prev => prev.filter(i => i.id !== item.id));
    
    if (item.type === "bomb") {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setIsPlaying(false);
          setGameOver(true);
          setShowNameInput(true);
        }
        return newLives;
      });
      setCombo(0);
    } else {
      const points = item.type === "star" ? 10 : item.type === "heart" ? 25 : 15;
      const comboMultiplier = Math.min(combo + 1, 5);
      setScore(prev => prev + points * comboMultiplier);
      setCombo(prev => Math.min(prev + 1, 5));
      setShowCombo(true);
      setTimeout(() => setShowCombo(false), 300);
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setGameOver(false);
    setShowNameInput(false);
    setFallingItems([]);
    setCombo(0);
    setLives(3);
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
      .slice(0, 10);

    setLeaderboard(updatedLeaderboard);
    saveLeaderboard(updatedLeaderboard);
    setShowNameInput(false);
    setPlayerName("");
  };

  // Game timer
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

  // Spawn items
  useEffect(() => {
    if (!isPlaying) return;
    
    const spawnInterval = setInterval(() => {
      spawnItem();
    }, 600);

    return () => clearInterval(spawnInterval);
  }, [isPlaying, spawnItem]);

  // Move items down and remove off-screen ones
  useEffect(() => {
    if (!isPlaying) return;

    const moveInterval = setInterval(() => {
      setFallingItems(prev => 
        prev.map(item => ({ ...item, y: (item as any).y || 0 }))
          .filter(item => (item as any).y < 100)
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [isPlaying]);

  // Decay combo
  useEffect(() => {
    if (!isPlaying || combo === 0) return;
    
    const comboDecay = setTimeout(() => {
      setCombo(prev => Math.max(0, prev - 1));
    }, 2000);

    return () => clearTimeout(comboDecay);
  }, [isPlaying, combo, score]);

  const getItemIcon = (type: FallingItem["type"]) => {
    switch (type) {
      case "star": return <Star className="w-8 h-8 text-amber-400 fill-current" />;
      case "heart": return <Heart className="w-8 h-8 text-rose-400 fill-current" />;
      case "sparkle": return <Sparkles className="w-8 h-8 text-violet-400 fill-current" />;
      case "bomb": return <Zap className="w-8 h-8 text-slate-600" />;
    }
  };

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
                <div className="bg-white/60 rounded-xl p-4 space-y-2">
                  <p className="text-foreground font-medium">How to Play:</p>
                  <div className="flex justify-center gap-4 text-sm">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-current" /> +10</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-4 h-4 text-violet-400 fill-current" /> +15</span>
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-rose-400 fill-current" /> +25</span>
                  </div>
                  <p className="text-rose-500 text-sm flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" /> Avoid the lightning! You have 3 lives.
                  </p>
                  <p className="text-violet-600 text-sm">Build combos for bonus points! (up to 5x)</p>
                </div>
                <motion.button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-rose-400 to-violet-400 text-white rounded-2xl font-bold text-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Target className="w-5 h-5 inline mr-2" />
                  Play Now!
                </motion.button>
              </div>
            )}

            {isPlaying && (
              <div className="space-y-4">
                {/* Game stats */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-bold text-foreground">{score}</span>
                  </div>
                  
                  <AnimatePresence>
                    {showCombo && combo > 1 && (
                      <motion.div
                        initial={{ scale: 0, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0, y: -20 }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-full font-bold"
                      >
                        {combo}x COMBO!
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Heart 
                          key={i} 
                          className={`w-5 h-5 ${i < lives ? 'text-rose-400 fill-current' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="px-4 py-2 bg-white/80 rounded-full shadow-sm">
                      <span className="font-bold text-foreground">{timeLeft}s</span>
                    </div>
                  </div>
                </div>

                {/* Game area */}
                <div className="relative h-72 bg-gradient-to-b from-sky-200/50 to-violet-200/50 rounded-2xl overflow-hidden border-2 border-white/50">
                  {fallingItems.map((item) => (
                    <motion.button
                      key={item.id}
                      className="absolute p-2"
                      style={{ left: `${item.x}%` }}
                      initial={{ top: "-10%", rotate: 0 }}
                      animate={{ 
                        top: "110%",
                        rotate: item.type === "bomb" ? [0, 360] : [0, 20, -20, 0],
                      }}
                      transition={{ 
                        top: { duration: item.speed, ease: "linear" },
                        rotate: { duration: 1, repeat: Infinity },
                      }}
                      onClick={() => handleCatch(item)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      {getItemIcon(item.type)}
                    </motion.button>
                  ))}
                  
                  {/* Combo indicator */}
                  {combo > 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/80 rounded-lg text-xs font-bold text-violet-600">
                      Combo: {combo}x
                    </div>
                  )}
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
                    {score} points!
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    {lives <= 0 ? "You ran out of lives!" : "Time's up!"}
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
                      className="w-full px-4 py-3 bg-emerald-400 text-white rounded-xl font-bold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Score
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

            {/* Leaderboard */}
            <div className="mt-6 pt-6 border-t-2 border-white/50">
              <h4 className="text-xl font-heading font-bold text-foreground flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-400" />
                Top Star Catchers
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {leaderboard.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No scores yet! Be the first! ✨
                  </p>
                ) : (
                  leaderboard.slice(0, 5).map((entry, index) => (
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