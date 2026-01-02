import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  shortTitle: string;
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
    shortTitle: "Tailor Swift",
    description: "Created a web-based platform for generating kurta designs based on customer preferences and user prompts, featuring customization options and a recommendation system leveraging user similarity and purchase history. Developed the 'Kouture' dataset, consisting of 20,000 high-quality, annotated kurta images, and fine-tuned the Stable Diffusion XL (SDXL) model with Low Rank Adaptation (LoRA) for enhanced design generation. Built an aesthetic-looking web application using NextJS, SQL and Neo4j for efficient data management.",
    color: "text-foreground",
    bgColor: "bg-tab-pink",
    tags: ["AI/ML", "NextJS", "Neo4j", "Stable Diffusion"],
  },
  {
    id: 2,
    title: "Hydra AI",
    shortTitle: "Hydra AI",
    description: "Developed a Flask and MongoDB web app for water management and integrated it with OpenStreetMap for mapping locations with water-related issues. Extracted water-related tweets using Selenium and pinpointed issues like shortages, leakages, and drainage problems. Also provided information on the five closest water tankers to supply water to affected areas.",
    color: "text-foreground",
    bgColor: "bg-tab-lavender",
    tags: ["Flask", "MongoDB", "OpenStreetMap", "Selenium"],
  },
  {
    id: 3,
    title: "PESU Clubs",
    shortTitle: "PESU Clubs",
    description: "Designed a Full-Stack application using ReactJS, NodeJS, and SQL for effective club management and event registration. Improved SQL database performance through triggers, functions, and stored procedures, ensuring seamless experiences for club heads and members.",
    color: "text-foreground",
    bgColor: "bg-tab-mint",
    tags: ["ReactJS", "NodeJS", "SQL", "Full-Stack"],
  },
  {
    id: 4,
    title: "FlagNet",
    shortTitle: "FlagNet",
    description: "Utilizes Computer Vision and Image Processing to generate colour masks for the differently coloured portions of a flag, and subsequently identifies the nationality of the user uploaded flag. The interface is developed using Streamlit, whereas the image processing utilizes the cv2 library available in Python.",
    color: "text-foreground",
    bgColor: "bg-tab-peach",
    tags: ["Computer Vision", "Python", "Streamlit", "OpenCV"],
  },
  {
    id: 5,
    title: "RAD Dataset",
    shortTitle: "RAD Dataset",
    description: "Created the RAD (Road Anomaly Detection) dataset with 10,000 annotated images. Applied YOLO v5 for object detection, and MiDas for depth estimation. Achieved 1000+ downloads on Kaggle.",
    color: "text-foreground",
    bgColor: "bg-tab-yellow",
    github: "https://www.kaggle.com/datasets/rohitsuresh15/radroad-anomaly-detection",
    tags: ["Dataset", "YOLO", "Computer Vision", "Research"],
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-muted-foreground">Click on a bookmark to explore!</p>
        </motion.div>

        {/* Book with bookmarks */}
        <div className="relative flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Bookmarks container */}
          <div className="relative w-full lg:w-80">
            {/* Book spine effect */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-foreground/10 to-transparent rounded-l-lg" />
            
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`tab-item relative flex items-center cursor-pointer mb-2`}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ x: 15 }}
              >
                {/* Bookmark tab */}
                <div 
                  className={`${project.bgColor} px-6 py-4 rounded-r-xl shadow-md flex items-center gap-3 w-full`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%)",
                  }}
                >
                  <span className={`font-semibold ${project.color} text-lg`}>
                    {project.shortTitle}
                  </span>
                  <ChevronRight className={`w-5 h-5 ${project.color} ml-auto`} />
                </div>
                
                {/* Page peek effect */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-2 bg-paper-cream border-l border-foreground/5"
                  style={{ zIndex: -1 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Project details - open book page */}
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <motion.div
                key={selectedProject.id}
                className="relative flex-1 max-w-2xl"
                initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Paper layers */}
                <div className="absolute inset-0 bg-paper-lavender rounded-2xl transform rotate-1" />
                <div className="absolute inset-0 bg-paper-mint rounded-2xl transform -rotate-1" />
                
                <div className={`relative ${selectedProject.bgColor}/20 bg-paper-cream rounded-2xl p-8 shadow-paper-lg paper-texture`}>
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-paper-pink rounded-full hover:bg-tab-pink transition-colors"
                  >
                    <X className="w-4 h-4 text-foreground" />
                  </button>

                  {/* Title with color accent */}
                  <div className={`inline-block ${selectedProject.bgColor} px-4 py-2 rounded-lg mb-4`}>
                    <h3 className={`text-2xl font-display font-bold ${selectedProject.color}`}>
                      {selectedProject.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-paper-lavender rounded-full text-sm font-medium text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}

                  {/* Decorative tape */}
                  <div className="absolute -top-3 left-8 w-14 h-6 bg-tab-yellow/70 transform -rotate-6 rounded-sm" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="flex-1 max-w-2xl flex items-center justify-center h-64 lg:h-96"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center p-8 bg-paper-cream/50 rounded-2xl border-2 border-dashed border-primary/30">
                  <p className="text-muted-foreground text-lg font-medium">
                    👈 Click a bookmark to see project details!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
