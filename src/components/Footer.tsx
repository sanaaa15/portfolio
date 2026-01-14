import { motion } from "framer-motion";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Paper layers */}
          <div className="absolute inset-0 bg-paper-lavender rounded-2xl transform rotate-1" />
          <div className="absolute inset-0 bg-paper-mint rounded-2xl transform -rotate-1" />
          
          <div className="relative bg-paper-cream rounded-2xl p-8 text-center paper-texture shadow-paper">
            {/* Decorative tape */}
            <div className="absolute -top-3 left-1/4 w-14 h-6 bg-tab-yellow/70 transform -rotate-6 rounded-sm" />
            <div className="absolute -top-2 right-1/4 w-12 h-5 bg-tab-pink/70 transform rotate-3 rounded-sm" />

            <motion.h3
              className="text-3xl font-heading font-bold text-foreground mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Let's Connect! 💌
            </motion.h3>

            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              I'm always excited to chat about new projects, creative ideas, or opportunities to be part of your vision!
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.a
                href="mailto:hello@example.com"
                className="p-3 bg-tab-pink rounded-xl hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-6 h-6 text-foreground" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-tab-lavender rounded-xl hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-6 h-6 text-foreground" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-tab-mint rounded-xl hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-6 h-6 text-foreground" />
              </motion.a>
            </div>

            {/* Made with love */}
            <div className="pt-6 border-t-2 border-dashed border-primary/20">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                Made with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-tab-pink fill-current" />
                </motion.span>
                by Sana Suman
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                © {new Date().getFullYear()} • Bangalore, India 🇮🇳
              </p>
            </div>

            {/* Hidden hint */}
            <p className="text-xs text-muted-foreground/50 mt-4">
              Psst... did you find the hidden game? ✨
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
