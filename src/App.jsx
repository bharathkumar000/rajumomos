import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { MapPin, Phone, Instagram, ShoppingBag, Star, ArrowRight, Menu as MenuIcon, MessageCircle } from 'lucide-react';

const Card = ({ title, price, subtitle, color, image, description }) => (
  <motion.div
    whileHover={{ y: -15, scale: 1.02 }}
    className="relative group min-w-[320px] md:min-w-[400px] h-[500px] rounded-[3rem] overflow-hidden bg-black transition-all duration-500 shadow-2xl"
  >
    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10`} />
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 filter brightness-110 contrast-125"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    />
    <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-[0.3em] opacity-60 text-white">{subtitle}</span>
        <div className="w-12 h-1 mt-2 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <h3 className="text-4xl font-street text-white mb-3 tracking-wider">{title}</h3>
      <p className="text-white/60 text-sm mb-8 font-light leading-relaxed line-clamp-3 italic">"{description}"</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest opacity-40">Starts at</span>
          <span className="text-3xl font-bold text-white tracking-tight">₹{price}</span>
        </div>
        <button className="group/btn px-8 py-4 bg-white text-black rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all duration-300 uppercase flex items-center gap-2">
          Order Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </motion.div>
);

const SectionHeading = ({ title, subtitle, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-20 text-center md:text-left"
  >
    <span className={`text-${accent} font-bold uppercase tracking-[0.4em] text-xs mb-4 block`}>{subtitle}</span>
    <h2 className="text-6xl md:text-9xl font-street leading-none tracking-tighter">
      {title}
    </h2>
  </motion.div>
);

function App() {
  const containerRef = useRef(null);
  const sizzleRef = useRef(null);
  const horizontalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoother scroll progress (Optimized for performance)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
    restDelta: 0.01
  });

  // Hero Section Animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 1.2]);
  const headlineY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  // Momo Storm (Spread across the entire screen)
  // Red Momo (Top Left)
  const redMomoX = useTransform(smoothProgress, [0, 0.3], [0, -200]);
  const redMomoY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const redMomoRotate = useTransform(smoothProgress, [0, 0.3], [15, 60]);

  // Yellow Momo (Bottom Right)
  const yellowMomoX = useTransform(smoothProgress, [0, 0.3], [0, 300]);
  const yellowMomoY = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const yellowMomoRotate = useTransform(smoothProgress, [0, 0.3], [-10, -50]);

  // Green Momo (Bottom Left)
  const greenMomoX = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const greenMomoY = useTransform(smoothProgress, [0, 0.3], [0, 150]);
  const greenMomoRotate = useTransform(smoothProgress, [0, 0.3], [45, 90]);

  // White Momo (Top Right)
  const whiteMomoX = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const whiteMomoY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const whiteMomoRotate = useTransform(smoothProgress, [0, 0.3], [-45, -90]);
  const whiteMomoOpacity = useTransform(smoothProgress, [0, 0.15], [0.3, 0.6]); // Use opacity instead of blur for performance

  // Mutton Momo (Central Foreground - Fast Zoom)
  const muttonMomoScale = useTransform(smoothProgress, [0, 0.2], [1, 1.8]);
  const muttonMomoX = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const muttonMomoY = useTransform(smoothProgress, [0, 0.2], [0, 800]);
  const muttonMomoRotate = useTransform(smoothProgress, [0, 0.2], [0, 45]);

  // Headline Cinematic Split
  const topTextX = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const botTextX = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const headlineScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

  // Background Color Transition removed for pure black 'void' look
  const bgColor = "#000000";

  // Horizontal Scroll for Menu
  const { scrollYProgress: horizontalScrollProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const horizontalX = useTransform(horizontalScrollProgress, [0, 1], ["0%", "-60%"]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
      className="text-white selection:bg-momo-red selection:text-white transition-colors duration-700"
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-transparent pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <div className="text-4xl font-street tracking-tighter text-white leading-none">
            RAJU <span className="text-momo-red">MOMOS</span>
          </div>
          <div className="flex items-center gap-2 ml-1 mt-1">
            <div className="w-4 h-[2px] bg-momo-red" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Mysuru's Soul</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-16 text-[10px] font-black tracking-[0.3em] uppercase items-center pointer-events-auto">
          <a href="#menu" className="text-white/60 hover:text-white transition-all duration-300">The Rainbow</a>
          <a href="#legacy" className="text-white/60 hover:text-white transition-all duration-300">The Sizzle</a>
          <a href="#locations" className="text-white/60 hover:text-white transition-all duration-300">Find Us</a>
          <button className="bg-momo-red text-white py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-momo-red/30">
            Order Now
          </button>
        </div>
        <button className="lg:hidden bg-white/10 backdrop-blur-xl p-5 rounded-full border border-white/20 pointer-events-auto shadow-2xl">
          <MenuIcon size={24} className="text-white" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[200vh] z-10">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
          <motion.div
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
            className="absolute inset-0 z-0 bg-black"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
            {/* Cleaner void look */}
          </motion.div>

          {/* Headline */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: headlineY,
              scale: headlineScale,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
            className="relative z-20 text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "circOut" }}
            >
              <span className="text-momo-yellow font-bold uppercase tracking-[0.5em] text-[10px] mb-12 block px-4 border-x border-momo-yellow/30 mx-auto w-fit">
                The Legend Returns
              </span>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  style={{ x: topTextX }}
                  className="text-[14vw] font-street leading-[0.75] tracking-tighter uppercase mb-4"
                >
                  THE COLORS OF
                </motion.h1>
                <motion.h1
                  style={{ x: botTextX }}
                  className="text-[16vw] font-street leading-[0.75] tracking-tighter uppercase text-white outline-text"
                >
                  COMFORT
                </motion.h1>
              </div>
              <div className="h-px w-24 bg-momo-red mx-auto mb-10" />
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-30 max-w-xl mx-auto px-6 leading-loose">
                Engineering is hard, eating momos is easy. <br />
                Welcome to VVCE's unofficial cafeteria.
              </p>
            </motion.div>
          </motion.div>

          {/* Momo Storm */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ambient Steam/Smoke Particles */}
            <motion.div
              animate={{
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]"
              style={{ pointerEvents: 'none', willChange: 'opacity', transform: 'translateZ(0)' }}
            />

            {/* White Momo (Background - Top Right) */}
            <motion.img
              style={{ x: whiteMomoX, y: whiteMomoY, rotate: whiteMomoRotate, opacity: whiteMomoOpacity, willChange: 'transform', transform: 'translateZ(0)' }}
              src="/images/flying_white.png"
              className="absolute top-10 right-10 md:top-24 md:right-24 w-[25vw] md:w-[12vw] z-10"
            />

            {/* Red Momo (Top Left) */}
            <motion.img
              style={{ x: redMomoX, y: redMomoY, rotate: redMomoRotate, willChange: 'transform', transform: 'translateZ(0)' }}
              src="/images/flying_red.png"
              className="absolute top-10 left-10 md:top-24 md:left-24 w-[40vw] md:w-[14vw] z-30 filter contrast-125"
            />

            {/* Yellow Momo (Bottom Right) */}
            <motion.img
              style={{ x: yellowMomoX, y: yellowMomoY, rotate: yellowMomoRotate, willChange: 'transform', transform: 'translateZ(0)' }}
              src="/images/flying_yellow.png"
              className="absolute bottom-10 right-10 md:bottom-24 md:right-24 w-[45vw] md:w-[16vw] z-30 filter contrast-125"
            />

            {/* Green Momo (Bottom Left) */}
            <motion.img
              style={{ x: greenMomoX, y: greenMomoY, rotate: greenMomoRotate, willChange: 'transform', transform: 'translateZ(0)' }}
              src="/images/flying_green.png"
              className="absolute bottom-20 left-20 md:bottom-32 md:left-32 w-[35vw] md:w-[10vw] z-30 filter contrast-125"
            />

            {/* Mutton Momo (Central Foreground - Fast Zoom) */}
            <motion.img
              style={{ scale: muttonMomoScale, x: muttonMomoX, y: muttonMomoY, rotate: muttonMomoRotate, willChange: 'transform', transform: 'translateZ(0)' }}
              src="/images/flying_mutton.png"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] md:w-[22vw] z-40 filter contrast-125"
            />
          </div>
        </div>
      </section>

      {/* The Sizzle Section (Sticky Reveal) */}
      <section ref={sizzleRef} id="legacy" className="relative py-60 px-6 md:px-24 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 order-2 md:order-1"
          >
            <SectionHeading
              subtitle="The Secret Sauce"
              title={<>THE<br /><span className="text-momo-red">SIZZLE</span></>}
              accent="white"
            />
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed mb-12">
              Our momos aren't just cooked; they're engineered for maximum dopamine.
              Tandoor-fired at blistering temperatures to lock in that smoky "Umm-Momos" flavor.
            </p>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <span className="text-4xl font-street text-momo-yellow">500°C</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Tandoor Temp</span>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-4xl font-street text-momo-red">100%</span>
                <span className="text-[10px] uppercase tracking-widest opacity-40">Hand-Crafted</span>
              </div>
            </div>
          </motion.div>
          <div className="flex-1 order-1 md:order-2">
            <motion.div
              style={{
                rotate: useTransform(smoothProgress, [0.2, 0.4], [5, -5]),
                scale: useTransform(smoothProgress, [0.2, 0.4], [1, 1.1])
              }}
              className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
            >
              <img src="/images/tandoor.png" className="w-full h-full object-cover mix-blend-lighten" alt="Tandoor" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>

        {/* Parallax Background Text */}
        <motion.div
          style={{
            x: useTransform(smoothProgress, [0.1, 0.4], ["10%", "-50%"]),
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          className="absolute top-1/2 left-0 text-[30vw] font-street opacity-[0.02] whitespace-nowrap pointer-events-none select-none"
        >
          STREET PRIDE MYSURU PRIDE
        </motion.div>
      </section>

      {/* Palette of Flavors (Immersive Horizontal Scroll) */}
      <section ref={horizontalRef} id="menu" className="relative h-[400vh] bg-black">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          {/* Parallax Background Heading */}
          <motion.div
            style={{
              x: useTransform(smoothProgress, [0.3, 0.8], ["20%", "-40%"]),
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
            className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[25vw] font-street opacity-[0.03] select-none pointer-events-none"
          >
            PALETTE OF FLAVORS RAJU MOMOS THE RAINBOW
          </motion.div>

          <div className="relative z-10 w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-24 mb-16">
              <SectionHeading
                subtitle="The Rainbow Menu"
                title={<>A SYMPHONY<br />OF <span className="text-momo-red">SPICE</span></>}
                accent="white"
              />
            </div>

            <motion.div
              style={{
                x: useTransform(smoothProgress, [0.3, 0.8], ["0%", "-150%"]),
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              className="flex gap-12 px-6 md:px-24"
            >
              <Card
                title="Red Barbeque"
                subtitle="The Fire Starter"
                price="150"
                color="#ff3e3e"
                image="/images/flying_red.png"
                description="A stress-snack that actually hits back. Smoky BBQ glaze charred to perfection."
              />
              <Card
                title="Yellow Tandoori"
                subtitle="The Classic"
                price="160"
                color="#ffb800"
                image="/images/flying_yellow.png"
                description="The OG that started it all. Infused with 12 secret spices and baked in clay."
              />
              <Card
                title="Green Haryali"
                subtitle="The Fresh Kick"
                price="175"
                color="#2ecc71"
                image="/images/flying_green.png"
                description="Fresh mint, vibrant spinach, and spices that wake you up faster than a 9 AM lab."
              />
              <Card
                title="White Malai"
                subtitle="The Velvet Touch"
                price="160"
                color="#f5f5f5"
                image="/images/flying_white.png"
                description="Creamy, mild, and absolutely decadent. For those days when you need a hug in momo form."
              />
              <Card
                title="Mutton Steamed"
                subtitle="The OG High"
                price="180"
                color="#c0392b"
                image="/images/flying_mutton.png"
                description="The connoisseur's choice. Hand-minced mutton, perfectly seasoned, and steamed to silk."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Review Marquee */}
      <section className="py-40 bg-black/50 overflow-hidden border-y border-white/10">
        <div className="text-center mb-20 uppercase tracking-[0.5em] text-[10px] opacity-40">What they say on Google Maps</div>
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-20 px-10 items-center">
              <div className="glass p-12 rounded-[2rem] w-[400px]">
                <div className="flex text-momo-yellow gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xl font-light italic opacity-90 mb-6 leading-relaxed">
                  "Best mutton momos in Mysuru! Affordable, spicy, and absolutely addictive. The VVCE student lifeline."
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest text-momo-red">Ismail B.</span>
              </div>
              <div className="glass p-12 rounded-[2rem] w-[400px]">
                <div className="flex text-momo-yellow gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-xl font-light italic opacity-90 mb-6 leading-relaxed">
                  "The Haryali spice mix is unmatched. Best experience near VVCE gates for years."
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest text-momo-red">Rahul K.</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VVCE Student Hub */}
      <section className="py-60 px-6 md:px-24 bg-black text-white overflow-hidden relative border-y border-white/5">
        <div className="max-w-6xl mx-auto text-center py-20 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block text-momo-red">Local Landmark</span>
            <h2 className="text-[10vw] font-street leading-[0.85] tracking-tighter mb-12">
              VVCE'S <br />RESEARCH & <br />DEVELOPMENT LAB
            </h2>
            <p className="text-2xl md:text-4xl font-light leading-relaxed max-w-4xl mx-auto mb-16 px-4 opacity-80">
              Located right across the gates of Vidyavardhaka College of Engineering.
              We've fueled three generations of engineers through dead-ends,
              compiled errors, and 4 AM project marathons.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="border border-white/10 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl backdrop-blur-md">
                Est. 2008
              </div>
              <div className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl">
                Official Hunger Partner
              </div>
            </div>
          </motion.div>
        </div>

        {/* Parallax Background Puns */}
        <motion.div
          style={{ x: useTransform(scrollYProgress, [0.6, 0.8], [0, -200]) }}
          className="absolute bottom-10 left-0 text-[15vw] font-street opacity-[0.03] whitespace-nowrap pointer-events-none"
        >
          ENGINEERING IS HARD EATING MOMOS IS EASY
        </motion.div>
      </section>

      {/* Locations & Contact */}
      <section id="locations" className="py-60 px-6 md:px-24">
        <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
          <div className="space-y-12">
            <SectionHeading
              subtitle="Visit the Gates"
              title={<>FIND OUR<br /><span className="text-momo-red">BRANCHES</span></>}
              accent="momo-yellow"
            />

            <div className="glass p-12 rounded-[3rem] hover:border-momo-red/50 transition-colors group">
              <h3 className="text-3xl font-street mb-4 flex items-center gap-4 group-hover:text-momo-red transition-colors">
                <MapPin size={24} /> SURYA BAKERY (OG)
              </h3>
              <p className="text-xl font-light opacity-60 mb-8 leading-relaxed">
                Opposite VVCE Main Gate, <br />
                Vijayanagar 2nd Stage, Mysuru. <br />
                <span className="text-sm font-bold mt-2 block">11:30 AM – 10:30 PM</span>
              </p>
              <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-6 transition-all">
                Open on Maps <ArrowRight size={14} />
              </button>
            </div>

            <div className="glass p-12 rounded-[3rem] hover:border-momo-yellow/50 transition-colors group">
              <h3 className="text-3xl font-street mb-4 flex items-center gap-4 group-hover:text-momo-yellow transition-colors">
                <MapPin size={24} /> FAMILY RESTAURANT
              </h3>
              <p className="text-xl font-light opacity-60 mb-8 leading-relaxed">
                High Tension Double Road, <br />
                Kumbarakoppal, Mysuru. <br />
                <span className="text-sm font-bold mt-2 block">12:30 PM – 11:00 PM</span>
              </p>
              <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-6 transition-all text-momo-yellow">
                Open on Maps <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="sticky top-40 glass p-16 rounded-[4rem] text-center overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-momo-red" />
              <h3 className="text-5xl font-street mb-8 uppercase">Let's Talk Momos</h3>
              <p className="text-xl font-light opacity-60 mb-12">
                Questions? Bulk orders for college fests? Just want to say hi?
              </p>
              <div className="flex flex-col gap-4">
                <a href="tel:+917259721731" className="flex items-center justify-center gap-4 bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all">
                  <Phone size={20} /> +91 72597 21731
                </a>
                <a href="#" className="flex items-center justify-center gap-4 border border-white/20 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                  <Instagram size={20} /> @rajumomosmysuru
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
        <div className="glass rounded-full p-4 md:px-10 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-white/20 backdrop-blur-2xl">
          <div className="flex gap-4 md:gap-8 items-center text-white/50">
            <a href="tel:+917259721731" className="p-2 hover:text-white transition-colors"><Phone size={20} /></a>
            <a href="#" className="p-2 hover:text-white transition-colors"><Instagram size={20} /></a>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <a href="#locations" className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors hidden sm:block">Find Us</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-momo-red px-8 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-momo-red/30"
          >
            <ShoppingBag size={18} /> Order on Swiggy
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-32 text-center opacity-30 text-[10px] font-black tracking-[0.4em] uppercase">
        <div className="flex justify-center gap-8 mb-8">
          <span className="hover:text-momo-red cursor-pointer transition-colors">Instagram</span>
          <span className="hover:text-momo-red cursor-pointer transition-colors">Swiggy</span>
          <span className="hover:text-momo-red cursor-pointer transition-colors">Zomato</span>
        </div>
        <p>Made for Momo Lovers in Mysuru • Engineering the Perfect Spice</p>
        <p className="mt-4">© 2024 Raju Momos Mysuru</p>
      </footer>
    </motion.div>
  );
}

export default App;
