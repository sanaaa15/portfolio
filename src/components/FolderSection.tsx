import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, GraduationCap, BookOpen, ExternalLink } from "lucide-react";

type TabType = "work" | "publications" | "education";

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

const FolderSection = () => {
  const [activeTab, setActiveTab] = useState<TabType>("work");

  const tabs: { id: TabType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: "work", label: "Work", icon: <Briefcase className="w-5 h-5" />, color: "bg-tab-pink" },
    { id: "publications", label: "Publications", icon: <BookOpen className="w-5 h-5" />, color: "bg-tab-lavender" },
    { id: "education", label: "Education", icon: <GraduationCap className="w-5 h-5" />, color: "bg-tab-mint" },
  ];

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
          <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-4">
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
          {/* Folder tabs at top */}
          <div className="flex gap-1 mb-0 relative z-10">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-t-xl font-medium flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? `${tab.color} shadow-md`
                    : "bg-paper-cream/70 hover:bg-paper-cream"
                }`}
                whileHover={{ y: -3 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Folder body */}
          <div className="relative">
            {/* Background folder layers */}
            <div className="absolute inset-0 bg-paper-lavender rounded-2xl rounded-tl-none transform translate-y-1" />
            <div className="absolute inset-0 bg-paper-mint rounded-2xl rounded-tl-none transform translate-y-2 translate-x-1" />
            
            {/* Main folder content */}
            <div className="relative bg-paper-cream rounded-2xl rounded-tl-none p-6 md:p-10 shadow-paper-lg paper-texture min-h-[500px]">
              <AnimatePresence mode="wait">
                {/* Work History */}
                {activeTab === "work" && (
                  <motion.div
                    key="work"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                      <Briefcase className="w-8 h-8 text-tab-pink" />
                      Work Experience
                    </h3>
                    <div className="space-y-6">
                      {workHistory.map((job, index) => (
                        <motion.div
                          key={index}
                          className="relative pl-8 border-l-4 border-tab-pink/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {/* Timeline dot */}
                          <div className="absolute -left-2.5 top-1 w-5 h-5 bg-tab-pink rounded-full border-4 border-paper-cream" />
                          
                          <div className="bg-paper-pink/30 rounded-xl p-5">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h4 className="font-bold text-foreground text-lg">{job.title}</h4>
                              <span className="px-2 py-0.5 bg-tab-pink/50 rounded-full text-sm">
                                @ {job.company}
                              </span>
                              <span className="text-muted-foreground text-sm ml-auto">
                                {job.period}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {job.description.map((desc, i) => (
                                <li key={i} className="text-foreground/80 text-sm flex gap-2">
                                  <span className="text-tab-pink">✦</span>
                                  {desc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Publications */}
                {activeTab === "publications" && (
                  <motion.div
                    key="publications"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                      <BookOpen className="w-8 h-8 text-tab-lavender" />
                      Research & Publications
                    </h3>
                    <div className="space-y-6">
                      {publications.map((pub, index) => (
                        <motion.div
                          key={index}
                          className="bg-paper-lavender/30 rounded-xl p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 }}
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <h4 className="font-bold text-foreground text-xl">{pub.title}</h4>
                            <span className="px-3 py-1 bg-tab-lavender/50 rounded-full text-sm">
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
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-tab-lavender text-foreground rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
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
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <h3 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-tab-mint" />
                      Education
                    </h3>
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <motion.div
                          key={index}
                          className="bg-paper-mint/30 rounded-xl p-8"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.15 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-tab-mint rounded-xl">
                              <GraduationCap className="w-8 h-8 text-foreground" />
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground text-xl mb-1">
                                {edu.degree}
                              </h4>
                              <p className="text-muted-foreground font-medium mb-2">
                                {edu.school}
                              </p>
                              <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-tab-mint/50 rounded-full text-sm">
                                  {edu.period}
                                </span>
                                {edu.details && (
                                  <span className="text-foreground/70 text-sm">
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
              </AnimatePresence>

              {/* Decorative elements */}
              <div className="absolute bottom-4 right-4 text-6xl opacity-10 font-display">
                📁
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FolderSection;
