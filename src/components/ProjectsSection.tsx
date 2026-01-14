import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  borderColor: string;
  bgColor: string;
  accentColor: string;
  github?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "FlagNet",
    description: "Utilizes Computer Vision and Image Processing to generate colour masks for the differently coloured portions of a flag, and subsequently identifies the nationality of the user uploaded flag. The interface is developed using Streamlit, whereas the image processing utilizes the cv2 library available in Python.",
    borderColor: "border-rose-300",
    bgColor: "bg-rose-50",
    accentColor: "bg-rose-200",
    tags: ["Computer Vision", "Python", "Streamlit", "OpenCV"],
  },
  {
    id: 2,
    title: "Hydra AI",
    description: "Developed a Flask and MongoDB web app for water management and integrated it with OpenStreetMap for mapping locations with water-related issues. Extracted water-related tweets using Selenium and pinpointed issues like shortages, leakages, and drainage problems. Also provided information on the five closest water tankers to supply water to affected areas.",
    borderColor: "border-sky-300",
    bgColor: "bg-sky-50",
    accentColor: "bg-sky-200",
    tags: ["Flask", "MongoDB", "OpenStreetMap", "Selenium"],
  },
  {
    id: 3,
    title: "Tailor Swift",
    description: "Created a web-based platform for generating kurta designs based on customer preferences and user prompts, featuring customization options and a recommendation system leveraging user similarity and purchase history. Developed the 'Kouture' dataset, consisting of 20,000 high-quality, annotated kurta images, and fine-tuned the Stable Diffusion XL (SDXL) model with Low Rank Adaptation (LoRA) for enhanced design generation. Built an aesthetic-looking web application using NextJS, SQL and Neo4j for efficient data management.",
    borderColor: "border-violet-300",
    bgColor: "bg-violet-50",
    accentColor: "bg-violet-200",
    tags: ["AI/ML", "NextJS", "Neo4j", "Stable Diffusion"],
  },
  {
    id: 4,
    title: "PESU Clubs",
    description: "Designed a Full-Stack application using ReactJS, NodeJS, and SQL for effective club management and event registration. Improved SQL database performance through triggers, functions, and stored procedures, ensuring seamless experiences for club heads and members.",
    borderColor: "border-emerald-300",
    bgColor: "bg-emerald-50",
    accentColor: "bg-emerald-200",
    tags: ["ReactJS", "NodeJS", "SQL", "Full-Stack"],
  },
  {
    id: 5,
    title: "RAD Dataset",
    description: "Created the RAD (Road Anomaly Detection) dataset with 10,000 annotated images. Applied YOLO v5 for object detection, and MiDas for depth estimation. Achieved 1000+ downloads on Kaggle.",
    borderColor: "border-amber-300",
    bgColor: "bg-amber-50",
    accentColor: "bg-amber-200",
    github: "https://www.kaggle.com/datasets/rohitsuresh15/radroad-anomaly-detection",
    tags: ["Dataset", "YOLO", "Computer Vision", "Research"],
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
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
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Click the top card to see the next project
            <Sparkles className="w-4 h-4" />
          </p>
        </motion.div>

        {/* Stacked cards container */}
        <div className="relative h-[500px] flex items-center justify-center">
          {projects.map((project, index) => {
            const position = (index - currentIndex + projects.length) % projects.length;
            const isVisible = position < 3;
            
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
                  rotateZ: position * 5,
                  opacity: 1 - position * 0.25
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
                <div className={`${project.bgColor} rounded-3xl p-8 md:p-10 shadow-xl paper-texture border-4 ${project.borderColor}`}>
                  {/* Title with color accent */}
                  <div className={`inline-block ${project.accentColor} px-5 py-2 rounded-xl mb-5 border-2 ${project.borderColor}`}>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
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
                        className={`px-3 py-1 ${project.accentColor} rounded-full text-sm font-medium text-foreground border ${project.borderColor}`}
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
                      className="inline-flex items-center gap-2 px-5 py-2 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity font-medium"
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
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all border-2 ${
                index === currentIndex
                  ? `${project.bgColor} ${project.borderColor} w-8`
                  : "bg-muted border-muted-foreground/30 hover:bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;