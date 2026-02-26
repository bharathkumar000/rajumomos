import React, { useRef, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Instagram, ShoppingBag, Star, ArrowRight, Menu as MenuIcon, MessageCircle, X } from 'lucide-react';

const Card = ({ title, price, subtitle, color, image, description, onOrder }) => (
  <motion.div
    whileHover={{ y: -15, scale: 1.02 }}
    className="relative group min-w-[320px] md:min-w-[380px] h-[460px] rounded-[3rem] overflow-hidden bg-black transition-all duration-500 shadow-2xl"
  >
    <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10`} />
    <img
      src={image}
      alt={title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 filter brightness-105 contrast-110"
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
        <button
          onClick={onOrder}
          className="group/btn px-8 py-4 bg-white text-black rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all duration-300 uppercase flex items-center gap-2"
        >
          Order Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  </motion.div>
);

const SectionHeading = React.memo(({ title, subtitle, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="mb-8 text-center md:text-left"
  >
    <span className={`text-${accent} font-bold uppercase tracking-[0.4em] text-xs mb-4 block`}>{subtitle}</span>
    <h2 className="text-5xl md:text-7xl lg:text-8xl font-street leading-[0.9] tracking-tight">
      {title}
    </h2>
  </motion.div>
));

const Hero = React.memo(({ smoothProgress }) => {
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 1.2]);
  const headlineY = useTransform(smoothProgress, [0, 0.15], [0, -100]);

  // Momo Storm (Optimized Positions)
  const redMomoX = useTransform(smoothProgress, [0, 0.3], [0, -200]);
  const redMomoY = useTransform(smoothProgress, [0, 0.3], [0, -100]);
  const yellowMomoX = useTransform(smoothProgress, [0, 0.3], [0, 300]);
  const yellowMomoY = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const greenMomoX = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const greenMomoY = useTransform(smoothProgress, [0, 0.3], [0, 150]);
  const whiteMomoX = useTransform(smoothProgress, [0, 0.3], [0, 200]);
  const whiteMomoY = useTransform(smoothProgress, [0, 0.3], [0, -150]);
  const whiteMomoOpacity = useTransform(smoothProgress, [0, 0.15], [0.6, 1]);

  const muttonMomoScale = useTransform(smoothProgress, [0, 0.2], [1, 1.8]);
  const muttonMomoY = useTransform(smoothProgress, [0, 0.2], [0, 800]);

  const topTextX = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const botTextX = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const headlineScale = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);

  return (
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
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: headlineY, scale: headlineScale, willChange: 'transform, opacity', transform: 'translateZ(0)' }}
          className="relative z-20 text-center"
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "circOut" }}>
            <span className="text-momo-yellow font-bold uppercase tracking-[0.5em] text-xs mb-12 block px-4 border-x border-momo-yellow/30 mx-auto w-fit">
              The Legend Returns
            </span>
            <div className="overflow-hidden mb-8">
              <motion.h1 style={{ x: topTextX }} className="text-[14vw] font-street leading-[0.75] tracking-tighter uppercase mb-4">THE COLORS OF</motion.h1>
              <motion.h1 style={{ x: botTextX }} className="text-[16vw] font-street leading-[0.75] tracking-tight uppercase text-white outline-text">COMFORT</motion.h1>
            </div>
            <div className="h-px w-24 bg-momo-red mx-auto mb-10" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-30 max-w-xl mx-auto px-6 leading-loose">
              One bite is a story, every plate is a legend. <br /> Welcome to the heart of Mysuru's street soul.
            </p>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]"
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          />

          {[
            { src: 'white', x: whiteMomoX, y: whiteMomoY, rotate: -45, opacity: whiteMomoOpacity, pos: 'top-10 right-10 md:top-24 md:right-24', w: 'w-[32vw] md:w-[15vw]', z: 'z-10' },
            { src: 'red', x: redMomoX, y: redMomoY, rotate: 15, pos: 'top-10 left-10 md:top-24 md:left-24', w: 'w-[50vw] md:w-[18vw]', z: 'z-30' },
            { src: 'yellow', x: yellowMomoX, y: yellowMomoY, rotate: -10, pos: 'bottom-10 right-10 md:bottom-24 md:right-24', w: 'w-[56vw] md:w-[20vw]', z: 'z-30' },
            { src: 'green', x: greenMomoX, y: greenMomoY, rotate: 45, pos: 'bottom-20 left-20 md:bottom-32 md:left-32', w: 'w-[44vw] md:w-[13vw]', z: 'z-30' }
          ].map((momo, i) => (
            <motion.img
              key={i}
              style={{
                x: momo.x,
                y: momo.y,
                rotate: momo.rotate,
                opacity: momo.opacity || 1,
                mixBlendMode: 'screen',
                filter: 'contrast(1.1) brightness(1.05) saturate(1.05)',
                WebkitMaskImage: 'radial-gradient(circle, black 65%, transparent 90%)',
                maskImage: 'radial-gradient(circle, black 65%, transparent 90%)',
                willChange: 'transform',
                transform: 'translateZ(0)'
              }}
              src={`/images/flying_${momo.src}.png`}
              className={`absolute ${momo.pos} ${momo.w} ${momo.z}`}
            />
          ))}

          <motion.img
            style={{
              scale: muttonMomoScale,
              y: muttonMomoY,
              mixBlendMode: 'screen',
              filter: 'contrast(1.15) brightness(1.1) saturate(1.1)',
              WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 85%)',
              maskImage: 'radial-gradient(circle, black 55%, transparent 85%)',
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
            src="/images/flying_mutton.png"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[69vw] md:w-[28vw] z-40"
          />
        </div>
      </div>
    </section>
  );
});

const SizzleSection = React.memo(({ smoothProgress }) => {
  const sizzleRef = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: sizzleRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sizzleRef} id="legacy" className="relative py-32 px-6 md:px-24 bg-black overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 order-2 md:order-1"
        >
          <SectionHeading subtitle="The Secret Sauce" title={<>THE<br /><span className="text-momo-red">SIZZLE</span></>} accent="white" />
          <p className="text-white/40 text-sm md:text-lg max-w-xl leading-relaxed font-light italic">
            Our momos aren't just cooked; they're crafted for pure obsession. Tandoor-fired at blistering temperatures to lock in that smoky, unmistakable Raju magic.
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
              rotate: useTransform(localProgress, [0.3, 0.7], [5, -5]),
              scale: useTransform(localProgress, [0.3, 0.7], [1, 1.05]),
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
            className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
          >
            <img src="/images/tandoor.png" className="w-full h-full object-cover opacity-80" alt="Tandoor" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </motion.div>
        </div>
      </div>
      <motion.div
        style={{ x: useTransform(localProgress, [0, 1], ["20%", "-20%"]), willChange: 'transform', transform: 'translateZ(0)' }}
        className="absolute top-1/2 left-0 text-[30vw] font-street opacity-[0.02] whitespace-nowrap pointer-events-none select-none"
      >
        STREET PRIDE MYSURU PRIDE
      </motion.div>
    </section>
  );
});

const MenuSection = React.memo(({ smoothProgress }) => {
  const horizontalRef = useRef(null);
  const { scrollYProgress: localProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"]
  });

  const cardsX = useTransform(localProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={horizontalRef} id="menu" className="relative h-[300vh] bg-black" style={{ contentVisibility: 'auto' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ x: useTransform(localProgress, [0, 1], ["10%", "-30%"]), willChange: 'transform', transform: 'translateZ(0)' }}
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[25vw] font-street opacity-[0.03] select-none pointer-events-none"
        >
          PALETTE OF FLAVORS RAJU MOMOS THE RAINBOW
        </motion.div>
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-24 mb-4">
            <SectionHeading subtitle="The Rainbow Menu" title={<>A SYMPHONY<br />OF <span className="text-momo-red">SPICE</span></>} accent="momo-yellow" />
          </div>
          <motion.div style={{ x: cardsX, willChange: 'transform', transform: 'translateZ(0)' }} className="flex gap-12 px-6 md:px-24">
            {[
              { title: "Red Barbeque", subtitle: "The Fire Starter", price: "150", color: "#ff3e3e", src: "red", desc: "A stress-snack that actually hits back. Smoky BBQ glaze charred to perfection." },
              { title: "Yellow Tandoori", subtitle: "The Classic", price: "160", color: "#ffb800", src: "yellow", desc: "The OG that started it all. Infused with 12 secret spices and baked in clay." },
              { title: "Green Haryali", subtitle: "The Fresh Kick", price: "175", color: "#2ecc71", src: "green", desc: "Fresh mint, vibrant spinach, and spices that wake you up with a punch of pure flavor." },
              { title: "White Malai", subtitle: "The Velvet Touch", price: "160", color: "#f5f5f5", src: "white", desc: "Creamy, mild, and absolutely decadent. For those days when you need a hug in momo form." },
              { title: "Mutton Steamed", subtitle: "The OG High", price: "180", color: "#c0392b", src: "mutton", desc: "The connoisseur's choice. Hand-minced mutton, perfectly seasoned, and steamed to silk." }
            ].map((card, i) => (
              <Card
                key={i}
                title={card.title}
                subtitle={card.subtitle}
                price={card.price}
                color={card.color}
                image={`/images/flying_${card.src}.png`}
                description={card.desc}
                onOrder={() => window.dispatchEvent(new CustomEvent('openOrder'))}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});
const ReviewSection = React.memo(() => (
  <section className="py-20 bg-black/50 overflow-hidden border-y border-white/10" style={{ contentVisibility: 'auto' }}>
    <div className="text-center mb-20 uppercase tracking-[0.5em] text-xs opacity-60">What they say on Google Maps</div>
    <div className="flex whitespace-nowrap animate-marquee">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex gap-20 px-10 items-center">
          {[
            { name: "Ismail B.", text: "Best mutton momos in Mysuru! Affordable, spicy, and absolutely addictive. The VVCE student lifeline." },
            { name: "Rahul K.", text: "The Haryali spice mix is unmatched. Best experience near VVCE gates for years." }
          ].map((review, j) => (
            <div key={j} className="glass p-12 rounded-[2rem] w-[400px] whitespace-normal">
              <div className="flex text-momo-yellow gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <p className="text-xl font-light italic opacity-90 mb-6 leading-relaxed">"{review.text}"</p>
              <span className="text-xs font-black uppercase tracking-widest text-momo-red">{review.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
));

const HubSection = React.memo(({ scrollYProgress }) => {
  const hubRef = useRef(null);
  const x = useTransform(scrollYProgress, [0.6, 0.9], [0, -200]);

  return (
    <section ref={hubRef} className="relative py-20 px-6 md:px-24 bg-black text-white overflow-hidden border-y border-white/5" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-6xl mx-auto text-center py-20 relative z-10">
        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
          <span className="font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block text-momo-red">Local Landmark</span>
          <h2 className="text-[10vw] font-street leading-[0.85] tracking-tighter mb-12">MYSURU'S <br />ORIGINAL <br />MOMO HUB</h2>
          <p className="text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-12">
            Located right across the gates of VVCE. We've fueled three generations of flavor seekers through late-night cravings, rainy evenings, and legendary feast marathons.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="border border-white/10 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl backdrop-blur-md">Est. 2008</div>
            <div className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl">Official Hunger Partner</div>
          </div>
        </motion.div>
      </div>
      <motion.div style={{ x, willChange: 'transform', transform: 'translateZ(0)' }} className="absolute bottom-0 left-0 text-[15vw] font-black text-white/[0.04] whitespace-nowrap leading-none pointer-events-none uppercase">
        EVERY BITE IS BLISS EVERY MOMO IS MAGIC
      </motion.div>
    </section>
  );
});

const LocationSection = React.memo(() => (
  <section id="locations" className="relative py-20 px-6 md:px-24" style={{ contentVisibility: 'auto' }}>
    <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
      <div className="space-y-12">
        <SectionHeading subtitle="Visit the Gates" title={<>FIND OUR<br /><span className="text-momo-red">BRANCHES</span></>} accent="momo-yellow" />
        {[
          { name: "SURYA BAKERY (OG)", addr: "Opposite VVCE Main Gate, Vijayanagar 2nd Stage, Mysuru.", time: "11:30 AM – 10:30 PM", color: "momo-red" },
          { name: "FAMILY RESTAURANT", addr: "High Tension Double Road, Kumbarakoppal, Mysuru.", time: "12:30 PM – 11:00 PM", color: "momo-yellow" }
        ].map((loc, i) => (
          <div key={i} className={`glass p-12 rounded-[3rem] hover:border-${loc.color}/50 transition-colors group`}>
            <h3 className={`text-3xl font-street mb-4 flex items-center gap-4 group-hover:text-${loc.color} transition-colors`}>
              <MapPin size={24} /> {loc.name}
            </h3>
            <p className="text-xl font-light opacity-60 mb-8 leading-relaxed">
              {loc.addr}<br />
              <span className="text-sm font-bold mt-2 block">{loc.time}</span>
            </p>
            <button className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-6 transition-all ${loc.color === 'momo-yellow' ? 'text-momo-yellow' : ''}`}>
              Open on Maps <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="sticky top-40 glass p-16 rounded-[4rem] text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-momo-red" />
          <h3 className="text-5xl font-street mb-8 uppercase">Let's Talk Momos</h3>
          <p className="text-xl font-light opacity-60 mb-12">Questions? Bulk orders for parties? Just want to say hi?</p>
          <div className="flex flex-col gap-4">
            <a href="tel:+917259721731" className="flex items-center justify-center gap-4 bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all"><Phone size={20} /> +91 72597 21731</a>
            <a href="#" className="flex items-center justify-center gap-4 border border-white/20 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"><Instagram size={20} /> @rajumomosmysuru</a>
          </div>
        </div>
      </div>
    </div>
  </section>
));

const ActionBar = React.memo(({ scrollYProgress }) => {
  const opacity = useTransform(scrollYProgress, [0.85, 0.92], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0.85, 0.92], [20, 0]);

  return (
    <motion.div
      style={{
        opacity,
        y: translateY,
        left: '50%',
        translateX: '-50%',
        willChange: 'opacity, transform'
      }}
      className="fixed bottom-10 z-50 w-[95%] max-w-3xl pointer-events-none"
    >
      <div className="glass rounded-full p-4 md:px-10 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-white/20 backdrop-blur-2xl pointer-events-auto">
        <div className="flex gap-4 md:gap-8 items-center text-white/50">
          <a href="tel:+917259721731" className="p-2 hover:text-white transition-colors"><Phone size={20} /></a>
          <a href="#" className="p-2 hover:text-white transition-colors"><Instagram size={20} /></a>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <a href="#locations" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors hidden sm:block">Find Us</a>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 bg-momo-red px-8 py-3 rounded-full font-black text-xs tracking-[0.2em] uppercase shadow-lg shadow-momo-red/30">
          <ShoppingBag size={18} /> Order on Swiggy
        </motion.button>
      </div>
    </motion.div>
  );
});

const Footer = React.memo(() => (
  <footer className="pt-10 pb-6 text-center opacity-30 text-[10px] font-black tracking-[0.4em] uppercase">
    <div className="flex justify-center gap-8 mb-8">
      {["Instagram", "Swiggy", "Zomato"].map(s => <span key={s} className="hover:text-momo-red cursor-pointer transition-colors">{s}</span>)}
    </div>
    <p>Made for Momo Lovers in Mysuru • Crafting the Perfect Spice</p>
    <p className="mt-4">© 2024 Raju Momos Mysuru</p>
  </footer>
));

const GallerySection = React.memo(() => {
  const images = [
    { src: "https://images.unsplash.com/photo-1541696490-8744a5db7f3d?q=80&w=1200", size: "col-span-2 row-span-2", label: "The OG Steam", branch: "Surya Bakery" },
    { src: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1200", size: "col-span-1 row-span-1", label: "Golden Tandoor", branch: "Family Rest." },
    { src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1200", size: "col-span-1 row-span-2", label: "Smoky BBQ", branch: "Surya Bakery" },
    { src: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?q=80&w=1200", size: "col-span-1 row-span-1", label: "Midnight Cravings", branch: "Main Street" },
    { src: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200", size: "col-span-2 row-span-1", label: "The Ultimate Feast", branch: "VVCE Gates" },
    { src: "https://images.unsplash.com/photo-1544333344-67c2741d2742?q=80&w=1200", size: "col-span-1 row-span-1", label: "Late Night Spice", branch: "Night Shift" },
    { src: "https://images.unsplash.com/photo-1625225230510-73ffb61df388?q=80&w=1200", size: "col-span-1 row-span-2", label: "The Red Dip", branch: "Secret Recipe" },
    { src: "https://images.unsplash.com/photo-1628543102715-bb824440fb52?q=80&w=1200", size: "col-span-1 row-span-1", label: "Midnight Silk", branch: "VVCE Gates" },
    { src: "https://images.unsplash.com/photo-1605333396513-d2ad2ac10469?q=80&w=1200", size: "col-span-1 row-span-1", label: "Dumpling Heavens", branch: "Street Side" },
    { src: "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?q=80&w=1200", size: "col-span-1 row-span-1", label: "Hissing Heat", branch: "Tandoor" },
    { src: "https://images.unsplash.com/photo-1585032226651-759b368d724a?q=80&w=1200", size: "col-span-2 row-span-1", label: "Asian Soul", branch: "Wok Magic" },
    { src: "https://images.unsplash.com/photo-1512484776474-128c824c1640?q=80&w=1200", size: "col-span-1 row-span-1", label: "Evening Lights", branch: "Mysuru Vibes" },
    { src: "https://images.unsplash.com/photo-1562967914-8a07c3d100c5?q=80&w=1200", size: "col-span-1 row-span-1", label: "Handcrafted Love", branch: "Artisanal" },
    { src: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1200", size: "col-span-1 row-span-1", label: "The Perfect Skin", branch: "Master Class" },
    { src: "https://images.unsplash.com/photo-1536510233921-8e5043fce771?q=80&w=1200", size: "col-span-1 row-span-1", label: "City Hustle", branch: "Vijayanagar" },
    { src: "https://images.unsplash.com/photo-1541696432-72c1c7201ce8?q=80&w=1200", size: "col-span-1 row-span-1", label: "Steam Storm", branch: "Fresh Batch" }
  ];

  return (
    <section className="py-20 px-6 md:px-24 bg-black overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionHeading
            subtitle="The Living Legend"
            title={<>STREET<br /><span className="text-momo-red">CHRONICLES</span></>}
            accent="white"
          />
          <motion.a
            href="https://www.google.com/search?q=raju+momos+mysuru+photos"
            target="_blank"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-momo-red transition-all pointer-events-auto"
          >
            Explore Full Album <ArrowRight size={14} />
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[250px] md:auto-rows-[350px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative overflow-hidden rounded-[2.5rem] group bg-white/5 ${img.size}`}
            >
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover opacity-100 transition-all duration-1000 grayscale-0"
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute bottom-10 left-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-momo-red mb-3 block">
                  {img.branch}
                </span>
                <h4 className="text-3xl font-street text-white leading-none">{img.label}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

const OrderModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-zinc-900 border border-white/10 w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>

          <div className="p-12">
            <div className="mb-10">
              <span className="text-momo-red font-bold uppercase tracking-[0.4em] text-[10px] mb-2 block">Choose Your App</span>
              <h3 className="text-5xl font-street text-white tracking-widest">Order <span className="text-momo-red">Now</span></h3>
            </div>

            <div className="grid gap-4">
              <a
                href="https://www.swiggy.com"
                target="_blank"
                className="flex items-center justify-between group p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-[#fc8019] transition-all duration-300 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#fc8019]/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ShoppingBag size={24} className="text-[#fc8019] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xl font-street tracking-widest text-white">SWIGGY</span>
                </div>
                <ArrowRight className="text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </a>

              <a
                href="https://www.zomato.com"
                target="_blank"
                className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-[#cb202d] transition-all duration-300 group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#cb202d]/20 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ShoppingBag size={24} className="text-[#cb202d] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xl font-street tracking-widest text-white">ZOMATO</span>
                </div>
                <ArrowRight className="text-white/20 group-hover:translate-x-1 group-hover:text-white transition-all" />
              </a>
            </div>

            <p className="mt-10 text-[10px] uppercase font-bold tracking-[0.2em] text-white/20 text-center">
              Curating the perfect spice since 2014
            </p>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 30,
    mass: 0.8,
    restDelta: 0.01
  });

  React.useEffect(() => {
    const handleOpen = () => setIsOrderModalOpen(true);
    window.addEventListener('openOrder', handleOpen);
    return () => window.removeEventListener('openOrder', handleOpen);
  }, []);

  return (
    <motion.div ref={containerRef} className="bg-black text-white selection:bg-momo-red selection:text-white">
      <nav className="fixed top-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-transparent pointer-events-none">
        <div className="flex flex-col pointer-events-auto">
          <div className="text-4xl font-street tracking-tighter text-white leading-none">RAJU <span className="text-momo-red">MOMOS</span></div>
          <div className="flex items-center gap-2 ml-1 mt-1">
            <div className="w-4 h-[2px] bg-momo-red" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Mysuru's Soul</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-16 text-[10px] font-black tracking-[0.3em] uppercase items-center pointer-events-auto">
          {["menu", "legacy", "locations"].map(id => (
            <a key={id} href={`#${id}`} className="text-white/60 hover:text-white transition-all duration-300 capitalize">{id.replace('legacy', 'The Sizzle').replace('menu', 'The Rainbow')}</a>
          ))}
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="bg-momo-red text-white py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-momo-red/30"
          >
            Order Now
          </button>
        </div>
        <button className="lg:hidden bg-white/10 backdrop-blur-xl p-5 rounded-full border border-white/20 pointer-events-auto shadow-2xl"><MenuIcon size={24} /></button>
      </nav>

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <Hero smoothProgress={smoothProgress} />
      <SizzleSection smoothProgress={smoothProgress} />
      <MenuSection smoothProgress={smoothProgress} />
      <ReviewSection />
      <GallerySection />
      <HubSection scrollYProgress={scrollYProgress} />
      <LocationSection />
    </motion.div>
  );
}

export default App;
