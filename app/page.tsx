"use client";

import EventCards3D from "../components/EventCards3D";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Define the Particle interface
interface Particle {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
}

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  // Fix: Add type annotation for particles state
  const [particles, setParticles] = useState<Particle[]>([]);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle window resize and initial size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial size
    handleResize();

    // Generate particles after window is defined
    const newParticles: Particle[] = [...Array(20)].map((_, i) => ({
      id: i,
      startX: Math.random() * window.innerWidth,
      startY: Math.random() * window.innerHeight,
      endX: Math.random() * window.innerWidth,
      endY: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Fix: Create a new array of particles with calculated values as numbers
  const particleElements = particles.map((particle) => {
    // Calculate the difference as numbers
    const xDiff = particle.endX - particle.startX;
    const yDiff = particle.endY - particle.startY;
    
    return (
      <motion.div
        key={particle.id}
        className="absolute w-1 h-1 bg-purple-500/20 rounded-full"
        style={{ 
          left: particle.startX,
          top: particle.startY,
        }}
        animate={{
          x: [0, xDiff, 0],
          y: [0, yDiff, 0],
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: particle.duration,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1]
        }}
      />
    );
  });

  const featuredEvents = [
    {
      title: "Neon Music Festival",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop",
      date: "Dec 15, 2024",
      price: "$49",
      category: "Music",
      attendees: "2.5k+",
      description: "Experience the biggest music festival with top artists and electrifying performances"
    },
    {
      title: "Tech Summit 2024",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
      date: "Jan 20, 2025",
      price: "$99",
      category: "Tech",
      attendees: "1.8k+",
      description: "Join industry leaders and innovators for the ultimate tech conference"
    },
    {
      title: "Gaming Championship",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
      date: "Feb 5, 2025",
      price: "$29",
      category: "Gaming",
      attendees: "3.2k+",
      description: "Compete with pro gamers and win massive prizes in this epic tournament"
    }
  ];

  const allEvents = [
    ...featuredEvents,
    {
      title: "Art & Design Expo",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
      date: "Mar 10, 2025",
      price: "$35",
      category: "Art",
      attendees: "1.2k+"
    },
    {
      title: "Wellness Retreat",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop",
      date: "Apr 8, 2025",
      price: "$79",
      category: "Wellness",
      attendees: "900+"
    },
    {
      title: "Food Festival",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop",
      date: "May 12, 2025",
      price: "$45",
      category: "Food",
      attendees: "4k+"
    }
  ];

  const stats = [
    { label: "Events Hosted", value: "500+", icon: "🎪" },
    { label: "Happy Attendees", value: "50k+", icon: "🙌" },
    { label: "Partner Venues", value: "200+", icon: "🏟️" },
    { label: "Cities Covered", value: "25+", icon: "🌍" }
  ];

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden w-full max-w-[100vw] relative scroll-smooth">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      {/* Floating particles - Only render on client */}
      {windowSize.width > 0 && (
        <div className="fixed inset-0 pointer-events-none">
          {particleElements}
        </div>
      )}

      {/* ================= NAVBAR ================= */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full backdrop-blur-xl bg-black/40 border-b border-white/10 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            EVENTO
          </motion.h1>
          <div className="hidden md:flex gap-8 text-sm">
            {["Home", "Events", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="hover:text-purple-400 transition relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-full px-6 md:px-16 pt-32 relative overflow-hidden"
      >
        {/* Interactive background glow that follows mouse */}
        {windowSize.width > 0 && (
          <>
            <motion.div 
              className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20"
              animate={{
                x: mousePosition.x * 0.1 - 200,
                y: mousePosition.y * 0.1 - 200,
              }}
              transition={{ type: "spring", damping: 10 }}
            />
            <motion.div 
              className="absolute w-96 h-96 bg-pink-600 rounded-full blur-[120px] opacity-20"
              animate={{
                x: mousePosition.x * -0.1 + 200,
                y: mousePosition.y * -0.1 + 200,
              }}
              transition={{ type: "spring", damping: 10 }}
            />
          </>
        )}

        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-purple-500/10"
              style={{
                width: 100 + i * 200,
                height: 100 + i * 200,
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: 360
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6 text-center lg:text-left relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm mb-4"
          >
            🎟️ Limited Tickets Available
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            Discover Amazing
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Events
            </motion.span>
          </h2>
          
          <p className="text-gray-400 max-w-lg mx-auto lg:mx-0 text-lg">
            Explore 500+ concerts, tech conferences, gaming tournaments,
            workshops and more. Book your seat today!
          </p>
          
          <div className="flex gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition shadow-lg shadow-purple-600/30 font-semibold"
            >
              🎫 Explore Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-purple-500/30 rounded-full hover:bg-purple-600/10 transition"
            >
              ▶️ Watch Demo
            </motion.button>
          </div>

          {/* Main Event Categories with Images */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            {featuredEvents.slice(0, 3).map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <div className="relative h-32 rounded-xl overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-2xl mb-1">
                      {event.category === "Music" && "🎵"}
                      {event.category === "Tech" && "💻"}
                      {event.category === "Gaming" && "🎮"}
                    </span>
                    <h3 className="text-sm font-bold">{event.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats with professional emojis */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 filter drop-shadow-lg group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Event Cards */}
        <motion.div 
          style={{ scale, opacity }}
          className="lg:w-1/2 flex justify-center overflow-hidden"
        >
          <EventCards3D />
        </motion.div>
      </section>

      {/* ================= FEATURED EVENTS ================= */}
      <section
        id="events"
        className="py-32 px-6 md:px-16 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Featured Events
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
        >
          Hand-picked events you don't want to miss
        </motion.p>

        {/* First row - Music, Tech, Gaming */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {event.category === "Music" && "🎵 "}
                  {event.category === "Tech" && "💻 "}
                  {event.category === "Gaming" && "🎮 "}
                  {event.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-1">
                    📅 {event.date}
                  </span>
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center gap-1">
                    👥 {event.attendees}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="text-3xl font-bold text-purple-400 ml-2">{event.price}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-6 py-2 bg-purple-600/20 rounded-full hover:bg-purple-600 transition border border-purple-500/30"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>

              {/* Popular tag for first event */}
              {index === 0 && (
                <div className="absolute -top-1 -left-1 rotate-[-15deg]">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                    🔥 MOST POPULAR
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Second row - Other events */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allEvents.slice(3).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600/90 backdrop-blur-sm rounded-full text-sm">
                  {event.category === "Art" && "🎨 "}
                  {event.category === "Wellness" && "🧘 "}
                  {event.category === "Food" && "🍳 "}
                  {event.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    📅 {event.date}
                  </span>
                  <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full">
                    👥 {event.attendees}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition">
                  {event.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-400">{event.price}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="px-5 py-2 bg-purple-600/20 rounded-full hover:bg-purple-600 transition border border-purple-500/30 text-sm"
                  >
                    Book Now →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-purple-500/50 rounded-full hover:bg-purple-600/20 transition font-semibold"
          >
            View All Events →
          </motion.button>
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="py-32 px-6 md:px-16 bg-[#0f0f0f] relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Evento</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed text-lg mb-16">
              We're revolutionizing the way people discover and attend events. 
              With our cutting-edge platform, we've helped thousands of event organizers 
              create unforgettable experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚡</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
                  <p className="text-gray-400">Book your favorite events in just a few clicks with our seamless platform</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🛡️</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                  <p className="text-gray-400">Your transactions are always safe and encrypted</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤝</div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Global Community</h3>
                  <p className="text-gray-400">Join millions of event lovers worldwide</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#111] p-6 rounded-2xl text-center border border-white/10"
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-purple-400">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Memories?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of happy attendees and start your event journey today
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold shadow-lg shadow-purple-600/30"
          >
            🚀 Get Started Now
          </motion.button>
        </motion.div>
      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="py-32 px-6 md:px-16 bg-gradient-to-b from-[#0f0f0f] to-black"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg mb-10"
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="👤 Your Name"
                className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition"
              />
              <input 
                type="email" 
                placeholder="📧 Your Email"
                className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition"
              />
            </div>
            <textarea 
              rows={5}
              placeholder="💬 Your Message"
              className="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl focus:border-purple-500 focus:outline-none transition"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg"
            >
              ✨ Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                EVENTO
              </h3>
              <p className="text-gray-500 text-sm">
                Your premier destination for discovering and booking amazing events.
              </p>
            </div>
            {["Quick Links", "Follow Us", "Legal"].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-4">{section}</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  {[...Array(4)].map((_, j) => (
                    <li key={j}>
                      <a href="#" className="hover:text-purple-400 transition">
                        Link {j + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center text-gray-500 text-sm pt-8 border-t border-white/10">
            © {new Date().getFullYear()} Evento. All rights reserved. Made with ❤️ for event lovers
          </div>
        </div>
      </footer>
    </main>
  );
}