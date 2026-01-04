import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";
import {
  Star,
  Heart,
  Flower2,
  Snowflake,
  Smile,
  Candy,
  Sparkles,
  Music,
  Moon,
  Cloud,
} from "lucide-react";

interface IntroSectionProps {
  onOpenGame: () => void;
}

/* ---------------------------------------
   ICON CONFIG (no positions yet!)
---------------------------------------- */

type IconZone = "top" | "bottom" | "left" | "right";

const floatingIcons = [
  // TOP
  {
    Icon: Star,
    color: "text-rose-400",
    zone: "top",
    placement: { x: "5%", y: "1%" },
    offset: { x: -12, y: 10 },
    float: 12,
    filled: true,
  },
  {
    Icon: Heart,
    color: "text-pink-400",
    zone: "top",
    placement: { x: "50%", y: "3%" },
    offset: { x: 8, y: -6 },
    float: 10,
    filled: true,
  },
  {
    Icon: Snowflake,
    color: "text-cyan-300",
    zone: "top",
    placement: { x: "80%", y: "15%" },
    offset: { x: 0, y: 10 },
    float: 14,
    filled: true,
  },

  // BOTTOM
  {
    Icon: Smile,
    color: "text-yellow-400",
    zone: "bottom",
    placement: { x: "45%", y: "40%" },
    offset: { x: -10, y: 6 },
    float: 8,
    filled: false,
    strokeWidth: 2,
  },
  {
    Icon: Music,
    color: "text-purple-300",
    zone: "bottom",
    placement: { x: "58%", y: "20%" },
    offset: { x: 12, y: -4 },
    float: 10,
    filled: false,
    strokeWidth: 2,
  },

  // LEFT
  {
    Icon: Flower2,
    color: "text-pink-300",
    zone: "left",
    placement: { x: "40%", y: "30%" },
    offset: { x: 0, y: -12 },
    float: 14,
    filled: false,
  },
  {
    Icon: Candy,
    color: "text-fuchsia-300",
    zone: "left",
    placement: { x: "65%", y: "60%" },
    offset: { x: -6, y: 8 },
    float: 10,
    filled: true,
  },

  // RIGHT
  {
    Icon: Sparkles,
    color: "text-amber-300",
    zone: "right",
    placement: { x: "30%", y: "25%" },
    offset: { x: 6, y: -10 },
    float: 12,
    filled: true,
  },
  {
    Icon: Moon,
    color: "text-indigo-300",
    zone: "right",
    placement: { x: "55%", y: "50%" },
    offset: { x: -8, y: 6 },
    float: 9,
    filled: true,
  },
  {
    Icon: Cloud,
    color: "text-sky-300",
    zone: "right",
    placement: { x: "35%", y: "70%" },
    offset: { x: 10, y: 10 },
    float: 8,
    filled: false,
  },
];


/* ---------------------------------------
   ICON RENDERER
---------------------------------------- */

const FloatingIcon = ({
  Icon,
  color,
  placement,
  offset,
  float,
  filled,
  strokeWidth,
  onClick,
}: any) => (
  <motion.button
    onClick={onClick}
    className={`absolute ${color} cursor-pointer`}
    style={{
      left: placement.x,
      top: placement.y,
      transform: `translate(${offset.x}px, ${offset.y}px)`,
    }}
    animate={{
      y: [0, -float, 0],
      rotate: [-6, 8, -6],
    }}
    transition={{
      duration: 3 + float * 0.12,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{ scale: 1.35, rotate: 0 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon
      className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth ?? 1.75}
    />
  </motion.button>
);

/* ---------------------------------------
   ICON ZONES (KEY RESPONSIVE LOGIC)
---------------------------------------- */

const FloatingIcons = ({ onOpenGame }: { onOpenGame: () => void }) => {
  return (
    <>
      {/* TOP ICONS */}
      <div
        className="
          absolute left-0 right-0
          -top-24 sm:-top-18 md:-top-14
          h-24
          pointer-events-none
        "
      >
        {floatingIcons
          .filter((i) => i.zone === "top")
          .slice(0, 3)
          .map((icon, i) => (
            <FloatingIcon
              key={i}
              {...icon}
              onClick={onOpenGame}
            />
          ))}
      </div>


      {/* BOTTOM ICONS */}
      <div
        className="
          absolute left-0 right-0
          -bottom-24 hidden sm:block
          h-24
          pointer-events-none
        "
      >
        {floatingIcons
          .filter((i) => i.zone === "bottom")
          .map((icon, i) => (
            <FloatingIcon
              key={i}
              {...icon}
              onClick={onOpenGame}
            />
          ))}
      </div>


      {/* LEFT SIDE & RIGHT SIDE (DESKTOP+) */}
      <div
        className="
          absolute top-1/2 -translate-y-1/2
          -left-28 hidden lg:block
          h-64 w-20
        "
      >
        {floatingIcons
          .filter((i) => i.zone === "left")
          .map((icon, i) => (
            <FloatingIcon key={i} {...icon} onClick={onOpenGame} />
          ))}
      </div>

      <div
        className="
          absolute top-1/2 -translate-y-1/2
          -right-28 hidden lg:block
          h-64 w-20
        "
      >
        {floatingIcons
          .filter((i) => i.zone === "right")
          .map((icon, i) => (
            <FloatingIcon key={i} {...icon} onClick={onOpenGame} />
          ))}
      </div>
    </>
  );
};

/* ---------------------------------------
   MAIN COMPONENT
---------------------------------------- */

const IntroSection = ({ onOpenGame }: IntroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* RELATIVE WRAPPER = anchor for icons */}
      <div className="relative w-full max-w-5xl">
        <FloatingIcons onOpenGame={onOpenGame} />

        {/* Paper stack */}
        <motion.div
          className="absolute inset-0 bg-paper-lavender rounded-3xl rotate-3 paper-texture"
          initial={{ scale: 0.95 }}
        />
        <motion.div
          className="absolute inset-0 bg-paper-mint rounded-3xl -rotate-2 paper-texture"
          initial={{ scale: 0.97 }}
        />

        {/* Main Card */}
        <motion.div
          className="relative bg-paper-cream rounded-3xl p-8 md:p-12 paper-texture shadow-paper-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
             {/* Profile photo with decorative frame */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Photo frame layers */}
              <div className="absolute inset-0 bg-tab-pink rounded-2xl transform rotate-3 translate-x-2 translate-y-2" />
              <div className="absolute inset-0 bg-tab-lavender rounded-2xl transform -rotate-2 translate-x-1 translate-y-1" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-paper-cream shadow-lg">
                <img 
                  src={profilePhoto} 
                  alt="Profile photo" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Cute corner decoration */}
              <div className="absolute -top-3 -right-3 bg-tab-yellow rounded-full p-2 shadow-md">
                <Star className="w-4 h-4 text-foreground fill-current" />
              </div>
            </motion.div>

            {/* Text content */}
            <div className="text-center md:text-left flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-muted-foreground font-medium mb-2">Hello, I'm</p>
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4">
                  Sana Suman
                </h1>
                <div className="inline-block bg-primary/30 px-4 py-2 rounded-full mb-4">
                  <p className="text-lg font-semibold text-primary-foreground">
                    Software Engineer @ G2
                  </p>
                </div>
                <p className="text-muted-foreground text-lg mb-6 max-w-md">
                  Based in Bangalore, India 🇮🇳
                  <br />
                  Building beautiful things with code ✨
                </p>
                
                {/* Cute tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["AI/ML", "Full-Stack", "Research", "UI/UX"].map((tag, i) => (
                    <motion.span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        i === 0 ? "bg-tab-pink text-foreground" :
                        i === 1 ? "bg-tab-lavender text-foreground" :
                        i === 2 ? "bg-tab-mint text-foreground" :
                        "bg-tab-peach text-foreground"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
              </div>
             </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroSection;
