"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function EventCards3D() {

  const projects = [
    {
      title: "Music Festival",
      description: "Live bands and DJs performing all night.",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
      gradient: "from-purple-600 to-pink-600",
      icon: "🎵"
    },
    {
      title: "Tech Conference",
      description: "Latest trends in AI, Web & Cloud.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
      gradient: "from-blue-600 to-cyan-600",
      icon: "💻"
    },
    {
      title: "Gaming Tournament",
      description: "Compete and win exciting prizes.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",      gradient: "from-orange-600 to-red-600",
      icon: "🎮"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto overflow-hidden px-4">
      {projects.map((project, index) => (
        <Tilt
          key={index}
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1.05}
          glareEnable={true}
          glareMaxOpacity={0.3}
          glareColor="white"
          glarePosition="all"
          className="bg-[#111] rounded-xl border border-white/10 shadow-xl overflow-hidden"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 mix-blend-overlay`} />
              <div className="absolute top-3 right-3 text-2xl">
                {project.icon}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-purple-600/20 rounded-lg hover:bg-purple-600 transition border border-purple-500/30 text-sm font-semibold w-full"
              >
                Learn More →
              </motion.button>
            </div>
          </motion.div>
        </Tilt>
      ))}
    </div>
  );
}