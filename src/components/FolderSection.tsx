import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, GraduationCap, BookOpen, ExternalLink, Code2 } from "lucide-react";

type TabType = "work" | "publications" | "education" | "techstack";

interface WorkItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface Publication {
  title: string;
  type: string;
  links: { label: string; url: string }[];
}

interface Education {
  degree: string;
  school: string;
  period: string;
  details?: string;
}

interface TechCategory {
  category: string;
  technologies: string[];
}

const workHistory: WorkItem[] = [
  {
    title: "Associate Software Engineer",
    company: "G2",
    period: "Current",
    description: [
      "AI Visibility Dashboard tracks citations real time to learn where buyers are finding you, what LLMs you are being searched on and which pages are being cited.",
      "Adoption rate of 56% against the 25% goal. 91% of users expressed positive sentiment.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "G2",
    period: "Previous",
    description: [
      "SEM Arbitrage generated over $80k in revenue, 2x increase in intent-driven traffic at an ROI of 203%.",
      "Pros & Cons AI Summaries doubled the citations, won over 450 new keywords on Google SERPs.",
    ],
  },
  {
    title: "Summer Intern",
    company: "G2",
    period: "Previous",
    description: [
      "Worked on a feature that summarizes buyer intent data using Ruby on Rails and Slack API.",
      "Enhanced user engagement by providing access to key data points directly within Slack.",
    ],
  },
  {
    title: "Research Intern",
    company: "PES University",
    period: "Previous",
    description: [
      "Created the RAD (Road Anomaly Detection) dataset with 10,000 annotated images.",
      "Applied YOLO v5 for object detection and MiDas for depth estimation. 1000+ downloads.",
    ],
  },
];

const publications: Publication[] = [
  {
    title: "Kouture Dataset",
    type: "Capstone Project",
    links: [
      { label: "Kaggle", url: "https://www.kaggle.com/datasets/sanasuman15/kouture-a-dataset-for-womens-kurtas" },
      { label: "IEEE", url: "https://ieeexplore.ieee.org/abstract/document/10962951" },
      { label: "Springer 1", url: "https://link.springer.com/chapter/10.1007/978-981-96-2697-7_31" },
      { label: "Springer 2", url: "https://link.springer.com/chapter/10.1007/978-3-031-92625-9_7" },
    ],
  },
  {
    title: "RAD Dataset",
    type: "Research @ PES University",
    links: [
      { label: "Kaggle", url: "https://www.kaggle.com/datasets/rohitsuresh15/radroad-anomaly-detection" },
      { label: "Springer", url: "https://link.springer.com/chapter/10.1007/978-981-97-2004-0_34" },
    ],
  },
];

const education: Education[] = [
  {
    degree: "B.Tech in Computer Science",
    school: "PES University, Bangalore",
    period: "2020 - 2024",
    details: "Focus on AI/ML and Data Science",
  },
];

const techStack: TechCategory[] = [
  {
    category: "Languages",
    technologies: ["Python", "JavaScript", "TypeScript", "SQL", "Ruby"],
  },
  {
    category: "Frameworks & Libraries",
    technologies: ["React", "Next.js", "Node.js", "Flask", "Ruby on Rails", "TailwindCSS"],
  },
  {
    category: "AI/ML",
    technologies: ["PyTorch", "TensorFlow", "Stable Diffusion", "YOLO", "Scikit-learn"],
  },
  {
    category: "Databases",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Neo4j", "Firebase"],
  },
  {
    category: "Tools & Platforms",
    technologies: ["Git", "Docker", "AWS", "OpenStreetMap", "Selenium", "Streamlit"],
  },
];

const FolderSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("work");

  const tabs: { id: TabType; label: string; icon: React.ReactNode; bgColor: string; lightBg: string }[] = [
    { id: "work", label: "Work", icon: <Briefcase className="w-5 h-5" />, bgColor: "bg-rose-200", lightBg: "bg-rose-100" },
    { id: "publications", label: "Publications", icon: <BookOpen className="w-5 h-5" />, bgColor: "bg-violet-200", lightBg: "bg-violet-100" },
    { id: "education", label: "Education", icon: <GraduationCap className="w-5 h-5" />, bgColor: "bg-emerald-200", lightBg: "bg-emerald-100" },
    { id: "techstack", label: "Tech Stack", icon: <Code2 className="w-5 h-5" />, bgColor: "bg-amber-200", lightBg: "bg-amber-100" },
  ];

  const activeTabConfig = tabs.find(t => t.id === activeTab)!;

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-4">
            My Journey
          </h2>
          <p className="text-muted-foreground">Open a folder tab to explore!</p>
        </motion.div>

        {/* Folder with tabs */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background folder layers for depth */}
          <div className={`absolute inset-0 top-12 rounded-2xl rounded-tl-none transform translate-y-2 translate-x-1 ${
            activeTab === 'work' ? 'bg-violet-100' :
            activeTab === 'publications' ? 'bg-emerald-100' :
            'bg-rose-100'
          }`} />
          <div className={`absolute inset-0 top-12 rounded-2xl rounded-tl-none transform translate-y-4 translate-x-2 ${
            activeTab === 'work' ? 'bg-emerald-100' :
            activeTab === 'publications' ? 'bg-rose-100' :
            'bg-violet-100'
          }`} />

          {/* Folder tabs at top */}
          <div className="flex gap-0 relative z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-4 font-medium flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? `${tab.bgColor} rounded-t-2xl shadow-sm`
                    : "bg-muted/50 hover:bg-muted/80 rounded-t-lg"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Folder body */}
          <div className="relative">
            {/* Main folder content */}
            <motion.div 
              className={`relative rounded-2xl rounded-tl-none p-6 md:p-10 shadow-lg paper-texture min-h-[500px] ${activeTabConfig.lightBg} border-2 border-${activeTabConfig.bgColor.replace('bg-', '')}/50`}
            >
              <AnimatePresence mode="wait">
                {/* Work History */}
                {activeTab === "work" && (
                  <motion.div
                    key="work"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="space-y-6"
                  >
                    <motion.h3 
                      className="text-3xl font-heading font-bold text-rose-800 flex items-center gap-3"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Briefcase className="w-8 h-8 text-rose-600" />
                      </motion.div>
                      Work Experience
                    </motion.h3>
                    <div className="space-y-6">
                      {workHistory.map((job, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-8 border-l-4 border-rose-300"
                          initial={{ opacity: 0, y: 20, x: -10 }}
                          animate={{ opacity: 1, y: 0, x: 0 }}
                          transition={{ 
                            delay: 0.2 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <motion.div 
                            className="absolute -left-2.5 top-1 w-5 h-5 bg-rose-300 rounded-full border-4 border-rose-100"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 300 }}
                          />
                          
                          <motion.div 
                            className="bg-white/80 rounded-xl p-5 backdrop-blur-sm shadow-sm"
                            whileHover={{ scale: 1.02, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="font-bold text-rose-800 text-lg">{job.title}</h4>
                              <span className="px-2 py-0.5 bg-rose-200 rounded-full text-sm text-rose-800">
                                @ {job.company}
                              </span>
                              <span className="text-rose-600 text-sm ml-auto">
                                {job.period}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {job.description.map((desc, i) => (
                                <li key={i} className="text-rose-700 text-sm flex gap-2">
                                  <span className="text-rose-500 font-bold">✦</span>
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Publications */}
                {activeTab === "publications" && (
                  <motion.div
                    key="publications"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="space-y-6"
                  >
                    <motion.h3 
                      className="text-3xl font-heading font-bold text-violet-800 flex items-center gap-3"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <BookOpen className="w-8 h-8 text-violet-600" />
                      </motion.div>
                      Research & Publications
                    </motion.h3>
                    <div className="space-y-6">
                      {publications.map((pub, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            delay: 0.2 + index * 0.15,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.03, 
                            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <h4 className="font-bold text-violet-800 text-xl">{pub.title}</h4>
                            <span className="px-3 py-1 bg-violet-200 rounded-full text-sm text-violet-800">
                              {pub.type}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {pub.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors text-sm font-medium"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Education */}
                {activeTab === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="space-y-6"
                  >
                    <motion.h3 
                      className="text-3xl font-heading font-bold text-emerald-800 flex items-center gap-3"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <GraduationCap className="w-8 h-8 text-emerald-600" />
                      </motion.div>
                      Education
                    </motion.h3>
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm"
                          initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          transition={{ 
                            delay: 0.2 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.03, 
                            rotateZ: 1,
                            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                            transition: { duration: 0.3 }
                          }}
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                            <div>
                              <h4 className="font-bold text-emerald-800 text-2xl mb-1">
                                {edu.degree}
                              </h4>
                              <p className="text-emerald-700 text-lg font-medium mb-2">
                                {edu.school}
                              </p>
                              <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-emerald-200 rounded-full text-sm text-emerald-800">
                                  {edu.period}
                                </span>
                                {edu.details && (
                                  <span className="text-emerald-600 text-sm italic">
                                    {edu.details}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tech Stack */}
                {activeTab === "techstack" && (
                  <motion.div
                    key="techstack"
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="space-y-6"
                  >
                    <motion.h3 
                      className="text-3xl font-display font-bold text-amber-800 flex items-center gap-3"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Code2 className="w-8 h-8 text-amber-600" />
                      </motion.div>
                      Tech Stack
                    </motion.h3>
                    <div className="space-y-4">
                      {techStack.map((category, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            delay: 0.2 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                            transition: { duration: 0.2 }
                          }}
                        >
                          <h4 className="font-bold text-amber-800 text-lg mb-3">{category.category}</h4>
                          <div className="flex flex-wrap gap-2">
                            {category.technologies.map((tech, i) => (
                              <motion.span
                                key={i}
                                className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgb(254 243 199)" }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 text-6xl opacity-10 font-display">
                📁
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FolderSection;