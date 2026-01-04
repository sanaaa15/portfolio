import { useRef } from "react";
import IntroSection from "@/components/IntroSection";
import ProjectsSection from "@/components/ProjectsSection";
import FolderSection from "@/components/FolderSection";
import HiddenGame, { HiddenGameRef } from "@/components/HiddenGame";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Index = () => {
  const gameRef = useRef<HiddenGameRef>(null);

  const handleOpenGame = () => {
    gameRef.current?.openGame();
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 -right-32 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10">
        <IntroSection onOpenGame={handleOpenGame} />
        <ProjectsSection />
        <FolderSection />
        <Footer />
      </main>

      {/* Hidden game */}
      <HiddenGame ref={gameRef} />
    </div>
  );
};

export default Index;
