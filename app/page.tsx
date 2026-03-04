"use client";

import EventCards3D from "../components/EventCards3D";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden w-full max-w-[100vw] relative scroll-smooth">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-black/30 border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-widest">EVENTO</h1>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#home" className="hover:text-purple-400 transition">Home</a>
            <a href="#events" className="hover:text-purple-400 transition">Events</a>
            <a href="#about" className="hover:text-purple-400 transition">About</a>
            <a href="#contact" className="hover:text-purple-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-full px-6 md:px-16 pt-32 relative overflow-hidden"
      >
        {/* Background Blur Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-600 rounded-full blur-[120px] opacity-30"></div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6 text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover Amazing <span className="text-purple-500">Events</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto lg:mx-0">
            Explore concerts, tech conferences, gaming tournaments,
            workshops and more. Book your seat today!
          </p>
          <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full transition shadow-lg shadow-purple-600/30">
            Explore Now
          </button>
        </motion.div>

        {/* 3D Event Cards */}
        <div className="lg:w-1/2 flex justify-center overflow-hidden">
          <EventCards3D />
        </div>
      </section>

      {/* ================= EVENTS SECTION ================= */}
      <section
        id="events"
        className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-[#111]"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Upcoming Events
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["Music Fest", "Tech Summit", "Gaming Night"].map((event, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-[#111] p-8 rounded-xl border border-white/10 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">{event}</h3>
              <p className="text-gray-400 mb-4">
                Join us for an unforgettable experience filled with fun,
                creativity and excitement.
              </p>
              <button className="text-purple-500 hover:underline">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-20 px-6 md:px-16 bg-[#0f0f0f] text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          About Us
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Evento is your all-in-one event booking platform bringing together
          event organizers and attendees in one seamless experience.
          Whether it's music, tech, esports or education —
          we help you discover and book effortlessly.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-20 px-6 md:px-16 bg-gradient-to-b from-[#0f0f0f] to-black text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Get In Touch
        </h2>
        <p className="text-gray-400 mb-6">
          Have questions? Reach out to us anytime.
        </p>
        <button className="px-8 py-3 border border-purple-500 rounded-full hover:bg-purple-600 transition">
          Contact Us
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-6 border-t border-white/10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Evento. All rights reserved.
      </footer>
    </main>
  );
}