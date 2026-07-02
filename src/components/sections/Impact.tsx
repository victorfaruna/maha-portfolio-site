"use client";

import { motion } from "framer-motion";
import { Globe2, Users, FileText, Briefcase } from "lucide-react";

export function Impact() {
  const stats = [
    {
      value: "15+",
      label: "Years Experience",
      desc: "Dedicated to driving change at the intersection of AI, ethics, and public policy.",
      icon: Briefcase,
      colSpan: "md:col-span-7 lg:col-span-8",
      bgClass: "bg-secondary/30",
      borderClass: "border-white/10",
      accent: "from-accent/20 to-transparent",
    },
    {
      value: "20+",
      label: "Countries Impacted",
      desc: "Spanning across Africa, the Middle East, and the Global South.",
      icon: Globe2,
      colSpan: "md:col-span-5 lg:col-span-4",
      bgClass: "bg-accent/5",
      borderClass: "border-accent/20",
      accent: "from-accent/30 to-accent/5",
    },
    {
      value: "50+",
      label: "Policy Frameworks",
      desc: "Shaping digital sovereignty and ethical AI guidelines.",
      icon: FileText,
      colSpan: "md:col-span-5 lg:col-span-4",
      bgClass: "bg-background/40",
      borderClass: "border-white/10",
      accent: "from-foreground/5 to-transparent",
    },
    {
      value: "10k+",
      label: "Women Empowered",
      desc: "Through survivor-led initiatives and tech leadership programs.",
      icon: Users,
      colSpan: "md:col-span-7 lg:col-span-8",
      bgClass: "bg-secondary/20",
      borderClass: "border-white/10",
      accent: "from-accent/10 to-transparent",
    },
  ];

  return (
    <section className="py-32 relative bg-background overflow-hidden">
      {/* Decorative futuristic grid & blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4 flex items-center justify-center gap-2">
            <div className="w-8 h-[2px] bg-accent" /> Measurable Change <div className="w-8 h-[2px] bg-accent" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-foreground font-medium tracking-tight">
            Driving Global <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">Impact</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${stat.colSpan} relative flex flex-col justify-between p-8 md:p-10 lg:p-12 rounded-3xl ${stat.bgClass} backdrop-blur-xl border ${stat.borderClass} hover:border-accent/40 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden`}
            >
              {/* Dynamic hover gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              {/* Animated glowing orb behind icon */}
              <div className="absolute top-12 right-12 w-24 h-24 bg-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-background border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                  <stat.icon className="w-7 h-7 text-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif text-foreground group-hover:scale-105 transition-transform duration-500 tracking-tighter">
                  {stat.value}
                </h3>
              </div>

              <div className="relative z-10">
                <h4 className="text-xl md:text-2xl text-foreground font-medium mb-3">
                  {stat.label}
                </h4>
                <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed max-w-md">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
