import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";
import { Paperclip, Star, Heart, Cloud, Snowflake, Smile, Sparkles } from "lucide-react";

interface IntroSectionProps {
  onOpenGame: () => void;
}

// Define responsive icon configurations
const floatingIcons = [
  { Icon: Star, color: "text-tab-pink", position: "top-16 left-8 md:top-20 md:left-16" },
  { Icon: Heart, color: "text-tab-lavender", position: "top-24 right-12 md:top-32 md:right-24" },
  { Icon: Cloud, color: "text-tab-mint", position: "hidden md:block md:bottom-40 md:left-20" },
  { Icon: Snowflake, color: "text-tab-peach", position: "hidden md:block md:top-1/3 md:right-16" },
  { Icon: Smile, color: "text-tab-yellow", position: "top-8 left-1/2 md:top-48 md:left-1/4" },
  { Icon: Sparkles, color: "text-tab-pink", position: "hidden md:block md:bottom-32 md:right-1/3" },
];

const IntroSection = ({ onOpenGame }: IntroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating decorative elements - responsive positioning */}
      {floatingIcons.map(({ Icon, color, position }, index) => (
        <motion.button
          key={index}
          className={`absolute ${position} ${color} cursor-pointer hover:scale-125 transition-transform z-20`}
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, index % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{ 
            duration: 3 + index * 0.5, 
            repeat: Infinity,
            delay: index * 0.3,
          }}
          onClick={onOpenGame}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-7 h-7 md:w-8 md:h-8 fill-current drop-shadow-md" />
        </motion.button>
      ))}

      {/* Main content - stacked paper effect */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background papers */}
        <motion.div 
          className="absolute inset-0 bg-paper-lavender rounded-3xl transform rotate-3 paper-texture"
          initial={{ rotate: 6, scale: 0.95 }}
          animate={{ rotate: 3 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div 
          className="absolute inset-0 bg-paper-mint rounded-3xl transform -rotate-2 paper-texture"
          initial={{ rotate: -4, scale: 0.97 }}
          animate={{ rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        
        {/* Main card */}
        <motion.div 
          className="relative bg-paper-cream rounded-3xl p-8 md:p-12 paper-texture shadow-paper-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Paper clip decorations instead of tape */}
          <motion.div 
            className="absolute -top-6 left-12 text-muted-foreground"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Paperclip className="w-10 h-10 transform rotate-45" />
          </motion.div>
          <motion.div 
            className="absolute -top-5 right-16 text-tab-lavender"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          >
            <Paperclip className="w-8 h-8 transform -rotate-12" />
          </motion.div>

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

      {/* Scroll indicator - centered */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
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

      {/* Hint for hidden game */}
      <motion.p
        className="absolute bottom-2 left-0 right-0 text-center text-muted-foreground/50 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        ✨ Click a floating icon to play a game ✨
      </motion.p>
    </section>
  );
};

export default IntroSection;