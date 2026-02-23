import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Instagram, ShoppingBag, Star, ArrowRight, Menu as MenuIcon } from 'lucide-react';

const Card = ({ title, price, color, image, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="relative group min-w-[300px] md:min-w-[350px] aspect-[4/5] rounded-[2.5rem] overflow-hidden glass transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10`} />
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end">
      <div className={`w-16 h-1 mb-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]`} style={{ backgroundColor: `var(--color-${color})` }} />
      <h3 className="text-4xl font-street text-white mb-3 tracking-wider">{title}</h3>
      <p className="text-white/60 text-sm mb-6 font-light leading-relaxed line-clamp-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-white tracking-tight">₹{price}</span>
        <button className="px-8 py-3 bg-white text-black rounded-full font-extrabold text-[10px] tracking-[0.2em] hover:bg-white/90 transition-all hover:scale-105 active:scale-95 uppercase">
          Quick Order
        </button>
      </div>
    </div>
  </motion.div>
);

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const menuX = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="bg-charcoal text-white selection:bg-momo-red selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-2xl font-street tracking-tighter text-momo-red drop-shadow-lg">
          RAJU <span className="text-white">MOMOS</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          <a href="#menu" className="hover:text-momo-red transition-colors">Menu</a>
          <a href="#legacy" className="hover:text-momo-red transition-colors">The Legacy</a>
          <a href="#locations" className="hover:text-momo-red transition-colors">Locations</a>
        </div>
        <button className="md:hidden">
          <MenuIcon size={24} />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 z-10" />
          <img
            src="/images/hero.png"
            className="w-full h-full object-cover object-center"
            alt="Hero Background"
          />
        </motion.div>

        <motion.div
          style={{ y: textY }}
          className="relative z-20 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-2"
          >
            <span className="text-momo-yellow font-bold uppercase tracking-[0.3em] text-sm">Legendary Mysuru Street Food</span>
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[10rem] font-street mb-4 tracking-tighter leading-[0.85] text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            RAJU <br />
            <span className="text-momo-red">MOMOS</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl font-light tracking-widest max-w-2xl mx-auto uppercase opacity-90"
          >
            The Sizzle of Mysuru's Soul
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-momo-red to-transparent" />
        </motion.div>
      </section>

      {/* The Sizzle Section */}
      <section id="legacy" className="py-40 px-6 md:px-24 flex flex-col lg:flex-row items-center gap-20 max-w-7xl mx-auto">
        <div className="flex-1 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-momo-yellow/10 border border-momo-yellow/20 text-momo-yellow text-xs font-bold uppercase tracking-widest mb-6">Since 2008</div>
            <h2 className="text-5xl md:text-8xl font-street mb-8 leading-none">
              FROM A STALL  <br /><span className="text-momo-yellow italic">TO AN ICON</span>
            </h2>
            <p className="text-xl md:text-2xl font-light opacity-70 mb-12 leading-relaxed">
              What started as a humble stall near Surya Bakery has grown into a culinary landmark.
              Our secret? The same traditional tandoor, the same family recipes, and the same
              unwavering heat that Mysuru loves.
            </p>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <span className="text-5xl font-street text-momo-red leading-none">02</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Branches</span>
              </div>
              <div className="flex flex-col">
                <span className="text-5xl font-street text-momo-red leading-none">50+</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Daily Batches</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex-1 order-1 lg:order-2 relative w-full aspect-square">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl shadow-momo-red/20 group"
          >
            <img src="/images/tandoor.png" alt="Tandoor pot" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-momo-yellow/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-momo-red/10 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* Rainbow Menu Section */}
      <section id="menu" className="py-40 bg-black/30 border-y border-white/5">
        <div className="px-6 md:px-24 mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-street leading-none">
              PALETTE OF <span className="text-momo-green">FLAVORS</span>
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 mt-6">
              <p className="text-xl opacity-60 uppercase tracking-[0.2em] font-light">The Rainbow Menu</p>
              <div className="hidden md:block h-px w-20 bg-white/20" />
              <p className="text-sm opacity-40 uppercase tracking-widest">Handcrafted & Wood-Fired</p>
            </div>
          </motion.div>
        </div>

        <div className="flex gap-8 px-6 md:px-24 overflow-x-auto pb-12 snap-x no-scrollbar">
          <Card
            title="Red Barbeque"
            price="150"
            color="momo-red"
            image="/images/red_momo.png"
            description="Our signature spicy chicken momos glazed in a fiery BBQ sauce and charred to perfection."
          />
          <Card
            title="Yellow Tandoori"
            price="140"
            color="momo-yellow"
            image="/images/hero.png" // Placeholder
            description="Classic wood-fired taste with a rich turmeric and yogurt marinade."
          />
          <Card
            title="Green Haryali"
            price="130"
            color="momo-green"
            image="/images/hero.png" // Placeholder
            description="A fresh mint and spinach infusion that's both healthy and spicy."
          />
          <Card
            title="Classic Malai"
            price="160"
            color="white"
            image="/images/red_momo.png" // Placeholder
            description="Creamy, melt-in-your-mouth momos for those who love it rich and mild."
          />
        </div>
      </section>

      {/* VVCE Legacy Section */}
      <section className="py-32 px-6 md:px-24 bg-momo-red">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-6xl md:text-9xl font-street text-black leading-none mb-12">
            VVCE'S <br />EXTRACURRICULAR <br />HEADQUARTERS
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-black/80 leading-relaxed mb-16">
            Located right across Vidyavardhaka College of Engineering, Raju Momos has been
            the witness to thousands of project brainstorms, pre-exam stress snacks,
            and post-exam celebrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm">Surya Bakery Circle</span>
            <span className="px-8 py-3 bg-black text-white rounded-full font-bold uppercase tracking-widest text-sm">Vijayanagar 2nd Stage</span>
          </div>
        </div>
      </section>

      {/* Wall of Love Marquee (CSS only for simplicity) */}
      <section className="py-32 bg-charcoal overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex gap-16 px-8 items-center">
              <div className="flex flex-col gap-2">
                <div className="flex text-momo-yellow gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                <p className="text-2xl font-light italic opacity-90 italic">"Best momos in Mysuru. Period."</p>
                <span className="text-sm font-bold uppercase tracking-widest text-momo-red">Ismail B.</span>
              </div>
              <div className="w-1 h-12 bg-white/10" />
              <div className="flex flex-col gap-2">
                <div className="flex text-momo-yellow gap-1"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                <p className="text-2xl font-light italic opacity-90 italic">"The Haryali Veg is a perfect blend of spices."</p>
                <span className="text-sm font-bold uppercase tracking-widest text-momo-red">Rahul K.</span>
              </div>
              <div className="w-1 h-12 bg-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-32 px-6 md:px-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="glass p-12 rounded-3xl">
            <h3 className="text-4xl font-street mb-6 flex items-center gap-4">
              <MapPin className="text-momo-red" /> THE OG BRANCH
            </h3>
            <p className="text-xl font-light opacity-70 mb-8">
              Surya Bakery Circle, Opposite VVCE, <br />
              Vijayanagar 2nd Stage, Mysuru.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-momo-red font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Get Directions <ArrowRight size={20} />
            </a>
          </div>
          <div className="glass p-12 rounded-3xl border-l-4 border-momo-yellow">
            <h3 className="text-4xl font-street mb-6 flex items-center gap-4">
              <MapPin className="text-momo-yellow" /> FAMILY RESTAURANT
            </h3>
            <p className="text-xl font-light opacity-70 mb-8">
              High Tension Double Road, Kumbarakoppal, <br />
              Vijayanagar 2nd Stage, Mysuru.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-momo-yellow font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Get Directions <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
        <div className="glass rounded-full px-8 py-4 flex items-center justify-between shadow-2xl border-white/20">
          <div className="flex gap-6 items-center">
            <a href="tel:+917259721731" className="p-2 hover:bg-white/10 rounded-full transition-colors"><Phone size={20} /></a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 hover:bg-white/10 rounded-full transition-colors"><MapPin size={20} /></a>
          </div>
          <button className="flex items-center gap-3 bg-momo-red px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase hover:scale-105 transition-transform active:scale-95">
            <ShoppingBag size={18} /> Order Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-white/5 opacity-50 text-sm tracking-widest uppercase">
        <p>Made for Momo Lovers in Mysuru</p>
        <p className="mt-2 text-momo-red">Open: 11:30 AM – 10:30 PM</p>
        <p className="mt-8 text-[10px]">© 2024 Raju Momos. Not really, just a cool site.</p>
      </footer>
    </div>
  );
}

export default App;
