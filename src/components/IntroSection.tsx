import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";
import {
  Star,
  Heart,
  Flower,
  Snowflake,
  Smile,
  Candy,
  Sparkle,
  Moon,
  Sparkles,
  Paperclip,
  ChevronDown,
} from "lucide-react";

interface IntroSectionProps {
  onOpenGame: () => void;
}

// Icon definitions with deterministic "random" offsets for organic scrapbook feel
const floatingIcons = [
  // Top zone icons
  {
    Icon: Star,
    color: "text-rose-400",
    position: { top: "-4rem", left: "8%" },
    rotation: -12,
    floatAmount: 8,
    floatDuration: 4.2,
    filled: true,
    showOn: "all", // all, md+, lg+
  },
  {
    Icon: Heart,
    color: "text-pink-400",
    position: { top: "-6rem", left: "45%" },
    rotation: 8,
    floatAmount: 10,
    floatDuration: 3.8,
    filled: true,
    showOn: "all",
  },
  {
    Icon: Candy,
    color: "text-fuchsia-300",
    position: { top: "-3rem", right: "12%" },
    rotation: 15,
    floatAmount: 6,
    floatDuration: 4.5,
    filled: true,
    showOn: "md+",
  },
  
  // Bottom zone icons
  {
    Icon: Sparkle,
    color: "text-pink-300",
    position: { bottom: "-6rem", left: "15%" },
    rotation: -8,
    floatAmount: 7,
    floatDuration: 4.0,
    filled: false,
    showOn: "md+",
  },
  {
    Icon: Snowflake,
    color: "text-cyan-300",
    position: { bottom: "-5rem", right: "20%" },
    rotation: 20,
    floatAmount: 9,
    floatDuration: 3.6,
    filled: false,
    showOn: "md+",
  },
  
  // Left side icons (large screens only)
  {
    Icon: Smile,
    color: "text-amber-400",
    position: { top: "25%", left: "-10rem" },
    rotation: -5,
    floatAmount: 8,
    floatDuration: 4.3,
    filled: false,
    strokeWidth: 2,
    showOn: "lg+",
  },
  {
    Icon: Heart,
    color: "text-rose-300",
    position: { top: "75%", left: "-4.5rem" },
    rotation: 12,
    floatAmount: 6,
    floatDuration: 3.9,
    filled: true,
    showOn: "lg+",
  },
  
  // Right side icons (large screens only)
  {
    Icon: Flower,
    color: "text-fuchsia-400",
    position: { top: "30%", right: "-8rem" },
    rotation: -15,
    floatAmount: 7,
    floatDuration: 3.7,
    filled: false,
    showOn: "lg+",
  },
  {
    Icon: Moon,
    color: "text-pink-400",
    position: { bottom: "25%", right: "-4.5rem" },
    rotation: 8,
    floatAmount: 9,
    floatDuration: 4.4,
    filled: true,
    showOn: "lg+",
  },
];

const getVisibilityClass = (showOn: string) => {
  switch (showOn) {
    case "md+":
      return "hidden md:block";
    case "lg+":
      return "hidden lg:block";
    default:
      return "block";
  }
};

interface FloatingIconProps {
  Icon: React.ComponentType<any>;
  color: string;
  position: Record<string, string>;
  rotation: number;
  floatAmount: number;
  floatDuration: number;
  filled: boolean;
  strokeWidth?: number;
  showOn: string;
  onClick: () => void;
}

const FloatingIcon = ({
  Icon,
  color,
  position,
  rotation,
  floatAmount,
  floatDuration,
  filled,
  strokeWidth = 1.75,
  showOn,
  onClick,
}: FloatingIconProps) => (
  <motion.button
    onClick={onClick}
    className={`absolute ${color} cursor-pointer pointer-events-auto ${getVisibilityClass(showOn)}`}
    style={position}
    initial={{ rotate: rotation }}
    animate={{
      y: [0, -floatAmount, 0],
      rotate: [rotation - 4, rotation + 4, rotation - 4],
    }}
    transition={{
      duration: floatDuration,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{ scale: 1.3, rotate: 0 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon
      className="w-7 h-7 md:w-9 md:h-9 drop-shadow-md"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
    />
  </motion.button>
);

const IntroSection = ({ onOpenGame }: IntroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 md:py-16 overflow-visible relative">
      {/* RELATIVE WRAPPER = anchor for all icons */}
      <div className="relative w-full max-w-4xl mx-auto" style={{ padding: '20px' }}>
        {/* Floating sticker icons - positioned relative to this wrapper */}
        <div className="absolute inset-0 pointer-events-none" style={{ margin: "-3rem", zIndex: 10 }}>
          {floatingIcons.map((icon, i) => (
            <FloatingIcon key={i} {...icon} onClick={onOpenGame} />
          ))}
        </div>

        {/* Main card */}
        <div className="relative">
        <motion.div className="relative bg-paper-cream rounded-2xl p-8 text-center paper-texture shadow-paper">
          {/* Decorative tape */}
          <div className="absolute -top-3 left-1/4 w-14 h-6 bg-tab-yellow/70 transform -rotate-6 rounded-sm" />
          <div className="absolute -bottom-3 right-1/4 w-24 h-5 bg-tab-pink/70 transform -rotate-10 rounded-sm" />
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            {/* Profile photo with decorative frame */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Photo frame layers */}
              <div className="absolute inset-0 bg-tab-pink rounded-xl transform rotate-2 translate-x-1.5 translate-y-1.5" />
              <div className="absolute inset-0 bg-tab-lavender rounded-xl transform -rotate-0 translate-x-0.5 translate-y-0.5" />
              <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-xl border-4 border-paper-cream overflow-hidden  shadow-lg">
                <img
                  src={profilePhoto}
                  alt="Profile photo"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Corner star decoration */}
              <div className="absolute -top-2 -right-2 bg-tab-yellow rounded-full p-1.5 shadow-md">
                <Star className="w-3 h-3 text-foreground fill-current" />
              </div>
            </motion.div>

            {/* Text content */}
            <div className="text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-muted-foreground font-medium mb-1">Hello, I'm</p>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-3">
                  Sana Suman
                </h1>
                <div className="inline-block bg-primary/30 px-3 py-1.5 rounded-full mb-3">
                  <p className="text-base font-semibold text-primary-foreground">
                    Software Engineer @ G2
                  </p>
                </div>
                <p className="text-muted-foreground text-base mb-5 max-w-md">
                  Based in Bangalore, India
                  <br />
                  Building beautiful things with code!
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["AI/ML", "Full-Stack", "Ruby On Rails"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className={`px-2.5 py-1 rounded-full text-sm font-medium ${
                        i === 0
                          ? "bg-tab-pink text-foreground"
                          : i === 1
                          ? "bg-tab-lavender text-foreground"
                          : i === 2
                          ? "bg-tab-mint text-foreground"
                          : "bg-tab-peach text-foreground"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      whileHover={{ scale: 1.08 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Icon hint message */}
          <motion.div
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1">
              Click on any icon to play a game!
              <Sparkles className="w-4 h-4" />
            </p>
          </motion.div>
        </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - centered */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.2, duration: 0.8 },
          y: { duration: 2, repeat: Infinity }
        }}
      >
        <span className="text-muted-foreground text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
          <motion.div 
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
