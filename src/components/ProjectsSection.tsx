import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  github?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Tailor Swift",
    description: "Created a web-based platform for generating kurta designs based on customer preferences and user prompts, featuring customization options and a recommendation system leveraging user similarity and purchase history. Developed the 'Kouture' dataset, consisting of 20,000 high-quality, annotated kurta images, and fine-tuned the Stable Diffusion XL (SDXL) model with Low Rank Adaptation (LoRA) for enhanced design generation. Built an aesthetic-looking web application using NextJS, SQL and Neo4j for efficient data management.",
    color: "text-foreground",
    bgColor: "bg-tab-pink",
    tags: ["AI/ML", "NextJS", "Neo4j", "Stable Diffusion"],
  },
  {
    id: 2,
    title: "Hydra AI",
    description: "Developed a Flask and MongoDB web app for water management and integrated it with OpenStreetMap for mapping locations with water-related issues. Extracted water-related tweets using Selenium and pinpointed issues like shortages, leakages, and drainage problems. Also provided information on the five closest water tankers to supply water to affected areas.",
    color: "text-foreground",
    bgColor: "bg-tab-lavender",
    tags: ["Flask", "MongoDB", "OpenStreetMap", "Selenium"],
  },
  {
    id: 3,
    title: "PESU Clubs",
    description: "Designed a Full-Stack application using ReactJS, NodeJS, and SQL for effective club management and event registration. Improved SQL database performance through triggers, functions, and stored procedures, ensuring seamless experiences for club heads and members.",
    color: "text-foreground",
    bgColor: "bg-tab-mint",
    tags: ["ReactJS", "NodeJS", "SQL", "Full-Stack"],
  },
  {
    id: 4,
    title: "FlagNet",
    description: "Utilizes Computer Vision and Image Processing to generate colour masks for the differently coloured portions of a flag, and subsequently identifies the nationality of the user uploaded flag. The interface is developed using Streamlit, whereas the image processing utilizes the cv2 library available in Python.",
    color: "text-foreground",
    bgColor: "bg-tab-peach",
    tags: ["Computer Vision", "Python", "Streamlit", "OpenCV"],
  },
  {
    id: 5,
    title: "RAD Dataset",
    description: "Created the RAD (Road Anomaly Detection) dataset with 10,000 annotated images. Applied YOLO v5 for object detection, and MiDas for depth estimation. Achieved 1000+ downloads on Kaggle.",
    color: "text-foreground",
    bgColor: "bg-tab-yellow",
    github: "https://www.kaggle.com/datasets/rohitsuresh15/radroad-anomaly-detection",
    tags: ["Dataset", "YOLO", "Computer Vision", "Research"],
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = projects[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="min-h-screen py-20 px-4 relative flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground">
            {currentIndex + 1} of {projects.length}
          </p>
        </motion.div>

        {/* Card container */}
        <div className="relative flex items-center justify-center">
          {/* Left arrow */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-0 md:-left-16 z-20 p-3 bg-paper-pink rounded-full shadow-lg hover:bg-tab-pink transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </motion.button>

          {/* Project card with stacked effect */}
          <div className="relative w-full max-w-2xl">
            {/* Background cards for stack effect */}
            <motion.div
              className="absolute inset-0 bg-paper-lavender rounded-3xl"
              style={{ transform: "rotate(4deg) translateY(8px)" }}
            />
            <motion.div
              className="absolute inset-0 bg-paper-mint rounded-3xl"
              style={{ transform: "rotate(-2deg) translateY(4px)" }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                className={`relative ${currentProject.bgColor}/30 bg-paper-cream rounded-3xl p-8 md:p-10 shadow-paper-lg paper-texture`}
                initial={{ opacity: 0, x: 50, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                {/* Close/Next button */}
                <motion.button
                  onClick={goToNext}
                  className="absolute top-4 right-4 p-2 bg-paper-pink rounded-full hover:bg-tab-pink transition-colors shadow-md"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-foreground" />
                </motion.button>

                {/* Decorative tape */}
                <div className="absolute -top-3 left-8 w-16 h-6 bg-tab-yellow/70 transform -rotate-6 rounded-sm" />
                <div className="absolute -top-2 right-16 w-12 h-5 bg-tab-lavender/70 transform rotate-3 rounded-sm" />

                {/* Title with color accent */}
                <div className={`inline-block ${currentProject.bgColor} px-5 py-2 rounded-xl mb-5`}>
                  <h3 className={`text-3xl font-display font-bold ${currentProject.color}`}>
                    {currentProject.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-foreground/80 leading-relaxed mb-6 text-lg">
                  {currentProject.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      className="px-3 py-1 bg-paper-lavender rounded-full text-sm font-medium text-foreground"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </a>
                )}

                {/* Project indicator dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {projects.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-primary"
                          : "bg-paper-lavender hover:bg-tab-lavender"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <motion.button
            onClick={goToNext}
            className="absolute right-0 md:-right-16 z-20 p-3 bg-paper-pink rounded-full shadow-lg hover:bg-tab-pink transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </motion.button>
        </div>

        {/* Hint text */}
        <motion.p
          className="text-center text-muted-foreground mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click ✕ or arrows to see more projects
        </motion.p>
      </div>
    </section>
  );
};

export default ProjectsSection;
