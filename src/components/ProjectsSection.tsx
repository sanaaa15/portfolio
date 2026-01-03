import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink } from "lucide-react";

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
    title: "FlagNet",
    description: "Utilizes Computer Vision and Image Processing to generate colour masks for the differently coloured portions of a flag, and subsequently identifies the nationality of the user uploaded flag. The interface is developed using Streamlit, whereas the image processing utilizes the cv2 library available in Python.",
    color: "text-foreground",
    bgColor: "bg-tab-peach",
    tags: ["Computer Vision", "Python", "Streamlit", "OpenCV"],
  },
  {
    id: 2,
    title: "Hydra AI",
    description: "Developed a Flask and MongoDB web app for water management and integrated it with OpenStreetMap for mapping locations with water-related issues. Extracted water-related tweets using Selenium and pinpointed issues like shortages, leakages, and drainage problems. Also provided information on the five closest water tankers to supply water to affected areas.",
    color: "text-foreground",
    bgColor: "bg-tab-pink",
    tags: ["Flask", "MongoDB", "OpenStreetMap", "Selenium"],
  },
  {
    id: 3,
    title: "Tailor Swift",
    description: "Created a web-based platform for generating kurta designs based on customer preferences and user prompts, featuring customization options and a recommendation system leveraging user similarity and purchase history. Developed the 'Kouture' dataset, consisting of 20,000 high-quality, annotated kurta images, and fine-tuned the Stable Diffusion XL (SDXL) model with Low Rank Adaptation (LoRA) for enhanced design generation. Built an aesthetic-looking web application using NextJS, SQL and Neo4j for efficient data management.",
    color: "text-foreground",
    bgColor: "bg-tab-lavender",
    tags: ["AI/ML", "NextJS", "Neo4j", "Stable Diffusion"],
  },
    {
    id: 4,
    title: "PESU Clubs",
    description: "Designed a Full-Stack application using ReactJS, NodeJS, and SQL for effective club management and event registration. Improved SQL database performance through triggers, functions, and stored procedures, ensuring seamless experiences for club heads and members.",
    color: "text-foreground",
    bgColor: "bg-tab-mint",
    tags: ["ReactJS", "NodeJS", "SQL", "Full-Stack"],
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
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handleCardClick = (index: number) => {
    if (index === currentIndex) {
      handleNext();
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 relative flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground">
            Click the top card to see the next project
          </p>
        </motion.div>

        {/* Stacked cards container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {projects.map((project, index) => {
            const position = (index - currentIndex + projects.length) % projects.length;
            const isVisible = position < 3; // Show only top 3 cards in stack
            
            if (!isVisible) return null;

            return (
              <motion.div
                key={project.id}
                className={`absolute w-full max-w-2xl cursor-pointer`}
                style={{
                  zIndex: projects.length - position,
                }}
                animate={{ 
                  scale: 1 - position * 0.05,
                  y: position * 20,
                  rotateZ: position * 7,
                  opacity: 1 - position * 0.3
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 40
                }}
                onClick={() => handleCardClick(index)}
                whileHover={position === 0 ? { 
                  scale: 1.02,
                  rotateZ: 0,
                  transition: { duration: 0.2 }
                } : {}}
              >
                  <div className={`${project.bgColor} bg-paper-cream rounded-3xl p-8 md:p-10 shadow-paper-lg paper-texture border-4 border-${project.bgColor}`}>
                    {/* Decorative tape */}
                    <div className="absolute -top-3 left-8 w-16 h-6 bg-tab-yellow/70 transform -rotate-6 rounded-sm" />
                    <div className="absolute -top-2 right-16 w-12 h-5 bg-tab-lavender/70 transform rotate-3 rounded-sm" />

                    {/* Title with color accent */}
                    <div className={`inline-block ${project.bgColor} px-5 py-2 rounded-xl mb-5`}>
                      <h3 className={`text-2xl md:text-3xl font-heading font-bold ${project.color}`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/80 leading-relaxed mb-6 text-base md:text-lg">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-paper-lavender rounded-full text-sm font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-paper-lavender hover:bg-tab-lavender"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
