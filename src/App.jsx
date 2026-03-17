import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from 'framer-motion';
import { MapPin, Phone, Instagram, ShoppingBag, Star, ArrowRight, Menu as MenuIcon, MessageCircle, X } from 'lucide-react';

const Card = ({ title, price, subtitle, color, image, description, spice, onOrder }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -15, scale: 1.02 }}
      className="relative group min-w-[280px] sm:min-w-[320px] md:min-w-[380px] h-[440px] md:h-[460px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-black transition-all duration-500 shadow-2xl glass-premium"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" 
      />
      <motion.img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 filter brightness-105 contrast-110"
        style={{ 
          willChange: 'transform', 
          transform: 'translateZ(0) scale(1.1)',
        }}
      />
      <div 
        style={{ transform: "translateZ(75px)" }}
        className="absolute inset-0 z-20 p-8 md:p-10 flex flex-col justify-end"
      >
        {spice && (
          <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{spice}</span>
          </div>
        )}
        <div className="mb-4">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] opacity-60 text-white">{subtitle}</span>
          <div className="w-12 h-1 mt-2 rounded-full" style={{ backgroundColor: color }} />
        </div>
        <h3 className="text-3xl md:text-4xl font-street text-white mb-3 tracking-wider">{title}</h3>
        <p className="text-white/60 text-[12px] md:text-sm mb-6 md:mb-8 font-light leading-relaxed line-clamp-2 md:line-clamp-3 italic">"{description}"</p>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-40">Starts at</span>
            <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">₹{price}</span>
          </div>
          <button
            onClick={onOrder}
            className="group/btn px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-black text-[9px] md:text-[10px] tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all duration-300 uppercase flex items-center gap-2 whitespace-nowrap"
          >
            Order <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};



const GrainOverlay = React.memo(() => <div className="grain-overlay" />);




const GlobalBackground = React.memo(({ progress }) => {
  const driftX1 = useTransform(progress, [0, 1], [0, -50]);
  const driftY1 = useTransform(progress, [0, 1], [0, 50]);
  const driftX2 = useTransform(progress, [0, 1], [0, 80]);
  const driftY2 = useTransform(progress, [0, 1], [0, -40]);
  const driftX3 = useTransform(progress, [0, 1], [0, -60]);
  const driftY3 = useTransform(progress, [0, 1], [0, -80]);
  const driftX4 = useTransform(progress, [0, 1], [0, 50]);
  const driftY4 = useTransform(progress, [0, 1], [0, 100]);

  const momos = [
    { src: 'white', x: driftX1, y: driftY1, rotate: -45, pos: 'top-10 right-10 md:top-24 md:right-24', w: 'w-[24vw] md:w-[15vw]', opacity: 0.6 },
    { src: 'red', x: driftX2, y: driftY2, rotate: 15, pos: 'top-10 left-10 md:top-24 md:left-24', w: 'w-[38vw] md:w-[18vw]', opacity: 0.8 },
    { src: 'yellow', x: driftX3, y: driftY3, rotate: -10, pos: 'bottom-10 right-10 md:bottom-24 md:right-24', w: 'w-[42vw] md:w-[20vw]', opacity: 0.7 },
    { src: 'green', x: driftX4, y: driftY4, rotate: 45, pos: 'bottom-20 left-20 md:bottom-32 md:left-32', w: 'w-[34vw] md:w-[13vw]', opacity: 0.6 }
  ];

  const bgOpacity = useTransform(progress, [0, 0.15, 0.5], [1, 0, 0]);
  const bgZIndex = useTransform(progress, [0, 0.15], [50, -1]);

  return (
    <motion.div 
      style={{ 
        opacity: bgOpacity,
        zIndex: bgZIndex
      }} 
      className="fixed inset-0 pointer-events-none"
    >
      {momos.map((m, i) => (
        <motion.div
          key={i}
          className={`absolute ${m.pos} ${m.w}`}
          style={{
            x: m.x,
            y: m.y,
            willChange: 'transform'
          }}
        >
          <motion.img
            animate={{
              y: [0, -20, 0],
              rotate: [m.rotate, m.rotate + 8, m.rotate - 8, m.rotate],
            }}
            transition={{
              duration: 7 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              rotate: m.rotate,
              opacity: m.opacity,
              mixBlendMode: 'screen',
              filter: 'contrast(1.2) brightness(1.1) saturate(1)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
              maskImage: 'radial-gradient(circle at center, black 40%, transparent 75%)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
            src={`/images/flying_${m.src}.png`}
            className="w-full h-auto"
          />
        </motion.div>
      ))}
    </motion.div>
  );
});



const CharReveal = ({ text, delay = 0 }) => (
  <span className="inline-block overflow-hidden pb-0 leading-[1.1]">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.2,
          delay: delay + i * 0.03,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

const SteamFilter = () => (
  <svg className="fixed pointer-events-none opacity-0">
    <filter id="steam">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1">
        <animate attributeName="baseFrequency" dur="60s" values="0.015;0.025;0.015" repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" scale="40" />
    </filter>
  </svg>
);

const SectionHeading = React.memo(({ title, subtitle, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="mb-8 text-center"
  >
    <span className={`text-${accent} font-bold uppercase tracking-[0.4em] text-xs mb-4 block`}>
      <CharReveal text={subtitle} />
    </span>
    <h2 className="text-5xl md:text-9xl font-street leading-[0.9] tracking-tight">
      <CharReveal text={typeof title === 'string' ? title : ""} />
      {typeof title !== 'string' && title}
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

  const muttonMomoY = useTransform(smoothProgress, [0, 0.2], [0, 100]);
  const muttonMomoOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const muttonMomoBlur = useTransform(smoothProgress, [0, 0.12], [0, 20]);

  const topTextX = useTransform(smoothProgress, [0, 0.25], [0, -50]);
  const botTextX = useTransform(smoothProgress, [0, 0.25], [0, 50]);
  const headlineScale = useTransform(smoothProgress, [0, 0.15], [1, 0.85]);

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
              Authentic Himalayan Soul
            </span>
            <div className="overflow-hidden mb-6 md:mb-8">
              <motion.h1 style={{ x: topTextX }} className="text-[16vw] md:text-[14vw] font-street leading-[0.75] tracking-tighter uppercase mb-4">
                <CharReveal text="MYSURU'S FAVORITE" />
              </motion.h1>

              <motion.h1 style={{ x: botTextX }} className="text-[18vw] md:text-[16vw] font-street leading-[0.75] tracking-tight uppercase text-white outline-text">
                <CharReveal text="MOMO ROLL" delay={0.4} />
              </motion.h1>
            </div>

            <div className="h-px w-20 md:w-24 bg-momo-red mx-auto mb-8 md:mb-10" />
            <p className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] font-black opacity-30 max-w-xl mx-auto px-6 leading-loose">
              The Peak of Flavor in Every Bite. <br /> Straight from the Himalayas to the Heart of Mysuru.


            </p>
          </motion.div>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            style={{ filter: 'url(#steam)', opacity: useTransform(smoothProgress, [0, 0.2], [0.15, 0]) }}
            className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5"
          />
          <motion.div

            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_70%)]"
            style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
          />

          <motion.div
            style={{
              x: '-50%',
              y: '-50%',
              top: '50%',
              translateY: muttonMomoY,
              opacity: muttonMomoOpacity,
              filter: `blur(${muttonMomoBlur}px)`,
              willChange: 'transform, opacity, filter'
            }}
            className="absolute left-1/2 w-[55vw] md:w-[28vw] z-40"
          >
            <motion.img
              animate={{
                y: [0, -25, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                mixBlendMode: 'screen',
                filter: 'contrast(1.2) brightness(1) saturate(1)',
                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
              }}
              src="/images/flying_mutton.png"
              className="w-full h-auto"
            />
          </motion.div>
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
    <section ref={sizzleRef} id="legacy" className="relative py-32 px-6 md:px-24 bg-black/20 backdrop-blur-sm overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 order-2 md:order-1"
        >
          <SectionHeading subtitle="The Himalayan Roots" title={<>THIN<br /><span className="text-momo-red">WRAPPED</span></>} accent="white" />
          <p className="text-white/40 text-sm md:text-lg max-w-xl leading-relaxed font-light italic">
            Inspired by the traditional dumpling houses of the Himalayas, our momos are thin-wrapped to perfection—succulent, juicy, and served with our signature "fiery red" chutney that Hubli obsesses over.

          </p>
          <div className="flex gap-8 md:gap-12 mt-10 md:mt-0">
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-street text-momo-yellow">500°C</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-40">Tandoor Temp</span>
            </div>
            <div className="w-px h-10 md:h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl md:text-4xl font-street text-momo-red">100%</span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest opacity-40">Hand-Crafted</span>
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
    <section ref={horizontalRef} id="menu" className="relative h-auto md:h-[300vh] bg-transparent py-20 md:py-0" style={{ contentVisibility: 'auto' }}>
      <div className="relative md:sticky top-0 md:h-screen overflow-hidden flex flex-col justify-center">
        <motion.div
          style={{ x: useTransform(localProgress, [0, 1], ["10%", "-30%"]), willChange: 'transform', transform: 'translateZ(0)' }}
          className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[25vw] font-street opacity-[0.03] select-none pointer-events-none"
        >
          PALETTE OF FLAVORS HILL SPECIAL MOMOS THE RAINBOW
        </motion.div>
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-6 md:px-24 mb-4">
            <SectionHeading subtitle="The Rainbow Menu" title={<>A SYMPHONY<br />OF <span className="text-momo-red">SPICE</span></>} accent="momo-yellow" />
          </div>
          <motion.div style={{ x: cardsX }} className="hidden md:flex gap-12 px-24">
            {[
              { title: "Chicken Steamed", subtitle: "The Bestseller", price: "140", color: "#ff3e3e", src: "/images/steamed_chicken_momos_1773676803158.png", desc: "Succulent minced chicken, light seasoning, and pure Himalayan soul. The purist's choice.", spice: "Medium" },
              { title: "Paneer Hariyali", subtitle: "Tandoori Fusion", price: "160", color: "#2ecc71", src: "/images/hariyali_paneer_momos_1773676838649.png", desc: "Soft paneer coated in a refreshing green mint-coriander paste and charred to perfection.", spice: "Mild" },
              { title: "Chicken Tandoori", subtitle: "Smoky Classic", price: "170", color: "#ffb800", src: "/images/tandoori_momos_charred_1773676821098.png", desc: "Marinated in spicy yogurt and tandoor-charred for that unmistakable fusion kick.", spice: "Hill-Spicy" },
              { title: "Cheese Corn", subtitle: "Sweet & Savory", price: "150", color: "#f5f5f5", src: "white", desc: "A creamy, fusion of sweet corn and melting cheese for those velvet cravings.", spice: "Mild" },
              { title: "Schezwan Fried", subtitle: "The Crunch Factor", price: "160", color: "#c0392b", src: "/images/crispy_fried_momos_1773676860107.png", desc: "Tossed in a spicy, tangy Indo-Chinese sauce with a golden, crispy shell.", spice: "Hill-Spicy" }
            ].map((card, i) => (
              <Card
                key={i}
                title={card.title}
                subtitle={card.subtitle}
                price={card.price}
                color={card.color}
                image={card.src.startsWith('/') ? card.src : `/images/flying_${card.src}.png`}
                description={card.desc}
                spice={card.spice}
                onOrder={() => window.dispatchEvent(new CustomEvent('openOrder'))}
              />
            ))}
          </motion.div>

          {/* Mobile Swipe Container */}
          <div className="flex md:hidden overflow-x-auto gap-6 px-6 no-scrollbar pb-10">
            {[
              { title: "Chicken Steamed", subtitle: "Bestseller", price: "140", color: "#ff3e3e", src: "/images/steamed_chicken_momos_1773676803158.png", desc: "Succulent minced chicken and pure soul.", spice: "Medium" },
              { title: "Paneer Hariyali", subtitle: "Tandoori Fusion", price: "160", color: "#2ecc71", src: "/images/hariyali_paneer_momos_1773676838649.png", desc: "Refreshing green mint-coriander paste.", spice: "Mild" },
              { title: "Chicken Tandoori", subtitle: "Smoky Fusion", price: "170", color: "#ffb800", src: "/images/tandoori_momos_charred_1773676821098.png", desc: "Marinated in spicy yogurt and charred.", spice: "Hill-Spicy" },
              { title: "Himalayan Thukpa", subtitle: "Traditional Soup", price: "120", color: "#f39c12", src: "/images/himalayan_thukpa_soup_1773676878261.png", desc: "Authentic Himalayan noodle soup with veggies.", spice: "Mild" }
            ].map((card, i) => (
              <Card
                key={i}
                title={card.title}
                subtitle={card.subtitle}
                price={card.price}
                color={card.color}
                image={card.src.startsWith('/') ? card.src : `/images/flying_${card.src}.png`}
                description={card.desc}
                spice={card.spice}
                onOrder={() => window.dispatchEvent(new CustomEvent('openOrder'))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
const ReviewSection = React.memo(() => (
  <section className="py-20 bg-black/30 backdrop-blur-sm overflow-hidden border-y border-white/10" style={{ contentVisibility: 'auto' }}>
    <div className="text-center mb-20 uppercase tracking-[0.5em] text-xs opacity-60">High 4.4+ Star Ratings on Google, Justdial & Magicpin</div>
    <div className="flex whitespace-nowrap animate-marquee">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="flex gap-10 px-5 items-center">
          {[
            { name: "Ismail B.", text: "Best chicken momos in Hubli! Hill Special Momos has been our go-to spot near BVB. That signature red chutney is literally fire!" },

            { name: "Rahul K.", text: "The Hariyali spice mix is unmatched. Best experience at Hill Special Momos Jayalakshmipuram for years." }
          ].map((review, j) => (
            <div key={j} className="glass p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] w-[280px] md:w-[480px] whitespace-normal">
              <div className="flex text-momo-yellow gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-[10px] h-[10px] md:w-4 md:h-4" fill="currentColor" />)}

              </div>
              <p className="text-sm md:text-2xl font-light italic opacity-90 mb-4 md:mb-8 leading-relaxed">"{review.text}"</p>
              <span className="text-[10px] md:text-sm font-black uppercase tracking-widest text-momo-red">{review.name}</span>
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
    <section ref={hubRef} className="relative py-20 px-6 md:px-24 bg-black/20 backdrop-blur-sm text-white overflow-hidden border-y border-white/5" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-6xl mx-auto text-center py-20 relative z-10">


        <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}>
          <span className="font-bold uppercase tracking-[0.5em] text-[8px] mb-4 md:mb-6 block text-momo-red">Mysuru's Favorite</span>


          <h2 className="text-[10vw] md:text-[14vw] font-street leading-[0.85] tracking-tighter mb-8 md:mb-16">AUTHENTIC <br />HIMALAYAN <br />SOUL</h2>
          <p className="text-sm md:text-3xl text-white/60 font-medium leading-relaxed mb-8 md:mb-16">
            What started as a local gem in Mysuru has become a city-wide legend. We specialize in the thin-wrapped, succulent dumplings inspired by the traditional houses of the Himalayas.
          </p>






          <div className="flex flex-wrap justify-center gap-6">


            <div className="border border-white/10 px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl backdrop-blur-md">3:30 PM – 10:00 PM</div>
            <div className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl">Takeaway / Quick Bite</div>
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
  <section id="locations" className="relative py-20 px-6 md:px-24 bg-black/10 backdrop-blur-sm" style={{ contentVisibility: 'auto' }}>
    <div className="grid lg:grid-cols-2 gap-24 max-w-7xl mx-auto">
      <div className="space-y-12">
        <SectionHeading subtitle="Visit Us" title={<>FIND OUR<br /><span className="text-momo-red">BRANCHES</span></>} accent="momo-yellow" />
        {[
          { name: "BVB HUB", addr: "In front of BVB, near Sutra, Hubli - 580031.", time: "3:30 PM – 10:00 PM", color: "momo-red" }
        ].map((loc, i) => (

          <div key={i} className={`glass p-10 md:p-12 rounded-[2.5rem] md:rounded-[3rem] hover:border-${loc.color === 'white' ? 'white' : loc.color}/50 transition-colors group mb-6`}>
            <h3 className="text-2xl md:text-5xl font-street mb-4 md:mb-8 flex items-center gap-4 group-hover:text-momo-red transition-colors">
              <MapPin className="w-6 h-6 md:w-9 md:h-9" /> {loc.name}

            </h3>
            <p className="text-lg md:text-3xl font-light opacity-60 mb-8 md:mb-12 leading-relaxed">
              Kalidasa Rd, Vijayanagar 1st Stage, Vijayanagar, Mysuru, Karnataka 570017<br />
              <span className="text-sm md:text-lg font-bold mt-2 md:mt-4 block">{loc.time}</span>
            </p>


            <div className="flex items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Cash & UPI Accepted</span>
              <button className={`flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:gap-6 transition-all ${loc.color === 'momo-yellow' ? 'text-momo-yellow' : ''}`}>
                Maps <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="relative order-2 md:order-none mt-12 md:mt-0">
        <div className="sticky top-40 glass p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-momo-red" />
          <h3 className="text-4xl md:text-5xl font-street mb-8 uppercase">Let's Talk Momos</h3>
          <p className="text-lg md:text-xl font-light opacity-60 mb-12">Questions? Bulk orders for parties? Just want to say hi?</p>
          <div className="flex flex-col gap-4">
            <a href="tel:+918217245480" className="flex items-center justify-center gap-4 bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-momo-red hover:text-white transition-all text-xs md:text-base"><Phone size={20} /> +91 82172 45480</a>
            <a href="#" className="flex items-center justify-center gap-4 border border-white/20 py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-xs md:text-base"><Instagram size={20} /> @hillspecialmomos_official</a>
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
          <a href="tel:+918217245480" className="p-2 hover:text-white transition-colors"><Phone size={20} /></a>
          <a href="#" className="p-2 hover:text-white transition-colors"><Instagram size={20} /></a>
          <div className="w-px h-6 bg-white/10 mx-2" />
          <a href="#locations" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors hidden sm:block">Find Us</a>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 md:gap-4 bg-momo-red px-6 md:px-12 py-3 md:py-4 rounded-full font-black text-[10px] md:text-lg tracking-[0.15em] md:tracking-[0.2em] uppercase shadow-lg shadow-momo-red/30">
          <ShoppingBag className="w-[18px] h-[18px] md:w-6 md:h-6 hidden min-[400px]:block" /> <span>Order <span className="hidden min-[400px]:inline">on Swiggy</span></span>
        </motion.button>

      </div>
    </motion.div>
  );
});

const Footer = React.memo(() => (
  <footer className="pt-6 pb-4 md:pt-20 md:pb-16 text-center opacity-30 text-[8px] md:text-base font-black tracking-[0.3em] uppercase">
    <div className="flex justify-center gap-6 md:gap-16 mb-6 md:mb-16">
      {["Instagram", "Swiggy", "Zomato"].map(s => <span key={s} className="hover:text-momo-red cursor-pointer transition-colors px-2">{s}</span>)}
    </div>
    <p className="md:text-2xl">Authentic Himalayan Soul • The Favorite Roll</p>
    <p className="mt-2 md:mt-6 tracking-widest md:text-lg">ALL RIGHTS ARE RESERVED – © 2024 HILL SPECIAL Momos</p>
    <div className="mt-4 md:mt-6 flex flex-col items-center gap-2">
      <span className="h-[1px] w-12 bg-white/10" />
      <p className="text-white/80 tracking-[0.5em] md:text-sm font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        DEVELOPED BY <span className="text-white">TECH NEXUS</span>
      </p>
    </div>
  </footer>



));

const GallerySection = React.memo(() => {
  const images = [
    { src: "/images/steamed_chicken_momos_1773676803158.png", size: "col-span-2 row-span-2", label: "Steamed Chicken", branch: "Vontikoppal HQ" },
    { src: "/images/tandoori_momos_charred_1773676821098.png", size: "col-span-1 row-span-1", label: "Tandoori Char", branch: "Jayalakshmipuram" },
    { src: "/images/hariyali_paneer_momos_1773676838649.png", size: "col-span-1 row-span-2", label: "Hariyali Punch", branch: "Vijayanagar" },
    { src: "/images/crispy_fried_momos_1773676860107.png", size: "col-span-1 row-span-1", label: "The Crunch Factor", branch: "Vontikoppal HQ" },
    { src: "/images/himalayan_thukpa_soup_1773676878261.png", size: "col-span-2 row-span-1", label: "Himalayan Thukpa", branch: "Jayalakshmipuram" },
    { src: "/images/media__1773676801118.png", size: "col-span-2 row-span-1", label: "Hill Special Platter", branch: "Vijayanagar" },
    { src: "/images/media__1773676759486.png", size: "col-span-1 row-span-1", label: "Evening Lights", branch: "Mysuru Vibes" },
    { src: "/images/media__1773677008048.png", size: "col-span-1 row-span-1", label: "Handcrafted Love", branch: "Vontikoppal HQ" },
    { src: "/images/media__1773677032363.png", size: "col-span-1 row-span-1", label: "The Perfect Skin", branch: "Jayalakshmipuram" }



  ];

  return (
    <section className="py-20 px-6 md:px-24 bg-transparent overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-20 gap-8">
          <SectionHeading
            subtitle="The Living Legend"
            title={<>STREET<br /><span className="text-momo-red">CHRONICLES</span></>}
            accent="white"
          />
          <motion.a
            href="https://www.google.com/search?q=hill+special+momos+mysuru+photos"
            target="_blank"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-momo-red transition-all pointer-events-auto"
          >
            Explore Full Album <ArrowRight size={14} />
          </motion.a>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.3 }
            }
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 auto-rows-[160px] md:auto-rows-[350px]"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "circOut" } }
              }}
              className={`relative overflow-hidden rounded-2xl md:rounded-[2.5rem] group bg-white/5 ${img.size}`}
            >

              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                src={img.src.startsWith('/') ? img.src : img.src}
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
        </motion.div>

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    mass: 0.6,
    restDelta: 0.001
  });

  React.useEffect(() => {
    const handleOpen = () => setIsOrderModalOpen(true);
    window.addEventListener('openOrder', handleOpen);
    return () => window.removeEventListener('openOrder', handleOpen);
  }, []);

  const bgShift = useTransform(smoothProgress, [0, 0.4, 0.8, 1], ["#000000", "#0a0a0a", "#1a1515", "#000000"]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgShift }}
      className="text-white selection:bg-momo-red selection:text-white relative"
    >

      <SteamFilter />
      <GrainOverlay />

      <GlobalBackground progress={smoothProgress} />

      <nav className="fixed top-0 w-full z-50 p-6 md:px-12 md:py-8 flex justify-between items-center bg-transparent pointer-events-none">



        <div className="flex flex-col pointer-events-auto">
          <div className="text-4xl font-street tracking-tighter text-white leading-none">HILL SPECIAL <span className="text-momo-red">MOMOS</span></div>
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
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden bg-white/10 backdrop-blur-xl p-4 rounded-full border border-white/20 pointer-events-auto shadow-2xl active:scale-90 transition-transform"
        >
          <MenuIcon size={20} />
        </button>

      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-zinc-900 z-[100] flex flex-col p-8 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-2xl font-street">HILL SPECIAL</div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="bg-white/5 p-4 rounded-full border border-white/10"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {["menu", "legacy", "locations"].map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-6xl md:text-8xl font-street uppercase tracking-tighter hover:text-momo-red transition-colors group flex items-center justify-between"
                >
                  <span>{id.replace('legacy', 'Sizzle').replace('menu', 'Rainbow')}</span>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-momo-red" />
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/10">
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={() => { setIsOrderModalOpen(true); setIsMenuOpen(false); }}
                className="w-full bg-momo-red text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.3em] text-lg shadow-2xl shadow-momo-red/20 mb-8"
              >
                Order Now
              </motion.button>
              <div className="flex justify-center gap-10 opacity-40">
                <Instagram size={24} />
                <Phone size={24} />
                <MessageCircle size={24} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} />

      <Hero smoothProgress={smoothProgress} />
      <SizzleSection smoothProgress={smoothProgress} />
      <MenuSection smoothProgress={smoothProgress} />
      <ReviewSection />
      <GallerySection />
      <HubSection scrollYProgress={scrollYProgress} />
      <LocationSection />
      <Footer />

    </motion.div>
  );
}

export default App;
