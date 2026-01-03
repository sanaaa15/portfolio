import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";
import { Sparkles, Heart, Star, Cloud, Moon, Flower, Candy } from "lucide-react";

interface IntroSectionProps {
  onOpenGame: () => void;
}

const IntroSection = ({ onOpenGame }: IntroSectionProps) => {
  const floatingElements = [
    { Icon: Star, className: "absolute top-20 left-10 text-tab-pink", animateY: [-10, 10, -10], animateRotate: [0, 10, 0], delay: 0 },
    { Icon: Heart, className: "absolute top-40 right-20 text-tab-lavender", animateY: [10, -10, 10], animateRotate: [0, -10, 0], delay: 0.5 },
    { Icon: Sparkles, className: "absolute bottom-32 left-20 text-tab-mint", animateY: [-5, 15, -5], delay: 1 },
    { Icon: Cloud, className: "absolute top-32 right-1/3 text-tab-yellow", animateY: [5, -15, 5], animateX: [-5, 5, -5], delay: 1.5 },
    { Icon: Flower, className: "absolute bottom-48 right-16 text-tab-peach", animateRotate: [0, 360], delay: 2 },
    { Icon: Moon, className: "absolute top-1/2 left-8 text-tab-pink", animateY: [-8, 8, -8], animateScale: [1, 1.1, 1], delay: 0.8 },
    { Icon: Candy, className: "absolute bottom-20 left-1/3 text-tab-lavender", animateY: [10, -5, 10], animateRotate: [-10, 10, -10], delay: 1.2 },
    { Icon: Star, className: "absolute top-28 left-1/4 text-tab-mint", animateY: [-12, 8, -12], delay: 0.3, size: 5 },
    { Icon: Heart, className: "absolute bottom-40 right-1/4 text-tab-yellow", animateScale: [1, 1.2, 1], animateRotate: [0, 180, 360], delay: 1.8 },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating decorative elements - clickable to open game */}
      {floatingElements.map(({ Icon, className, animateY, animateRotate, animateScale, delay }, index) => (
        <motion.button
          key={index}
          className={`${className} cursor-pointer hover:scale-125 transition-transform`}
          animate={{ 
            y: animateY, 
            rotate: animateRotate, 
            scale: animateScale
          }}
          transition={{ duration: 4, repeat: Infinity, delay }}
          onClick={onOpenGame}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-8 h-8 fill-current" style={{ width: '32px', height: '32px' }} />
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
              {/* Cute corner decorations */}
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

          {/* Decorative tape strips */}
          <div className="absolute -top-4 left-1/4 w-16 h-8 bg-tab-yellow/60 transform -rotate-12 rounded-sm" />
          <div className="absolute -top-3 right-1/3 w-12 h-6 bg-tab-pink/60 transform rotate-6 rounded-sm" />
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
