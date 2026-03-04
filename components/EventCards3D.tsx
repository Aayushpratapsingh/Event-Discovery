"use client";

import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function EventCards3D() {

  const projects = [
    {
      title: "Music Festival",
      description: "Live bands and DJs performing all night.",
      image: "/event1.jpg",
    },
    {
      title: "Tech Conference",
      description: "Latest trends in AI, Web & Cloud.",
      image: "/event2.jpg",
    },
    {
      title: "Gaming Tournament",
      description: "Compete and win exciting prizes.",
      image: "/event3.jpg",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto overflow-hidden">
      {projects.map((project, index) => (
        <Tilt
          key={index}
          tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          scale={1}
          className="bg-[#111] p-6 rounded-xl border border-white/10 shadow-xl"
        >
          <motion.div whileHover={{ scale: 1.02 }}>
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {project.description}
            </p>
          </motion.div>
        </Tilt>
      ))}
    </div>
  );
}