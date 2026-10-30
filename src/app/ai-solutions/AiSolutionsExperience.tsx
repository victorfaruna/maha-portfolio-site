"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { initiatives, principles, services } from "./content";
import { ParticlePortrait } from "./ParticlePortrait";
import styles from "./ai-solutions.module.css";

const focusStyles = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy";

const motionPreference = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionPreference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getMotionPreference() {
  return window.matchMedia(motionPreference).matches;
}
function getServerMotionPreference() {
  return true;
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);
}

function scrollToSection(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = event.currentTarget.hash;
  const section = document.getElementById(hash.slice(1));
  if (!section) return;

  event.preventDefault();
  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  section.focus({ preventScroll: true });
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  });
}

function ServiceAccordion() {
  const [openServices, setOpenServices] = useState<string[]>([services[0].id]);
  const reduceMotion = usePrefersReducedMotion();
  const allOpen = openServices.length === services.length;

  function toggleService(id: string) {
    setOpenServices(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  return (
    <div data-service-accordion>
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={() => setOpenServices(allOpen ? [] : services.map(service => service.id))}
          className={`py-2 text-xs font-semibold text-brand-navy underline decoration-brand-navy/35 underline-offset-4 transition-colors hover:text-brand-pink ${focusStyles}`}
        >
          {allOpen ? "Collapse all" : "Expand all services"}
        </button>
      </div>
      <div className="border-t border-brand-navy/20">
        {services.map(service => {
          const isOpen = openServices.includes(service.id);
          return (
            <div key={service.id} className="border-b border-brand-navy/20">
              <h3 className="font-sans">
                <button
                  id={`service-${service.id}`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => toggleService(service.id)}
                  className={`group flex w-full items-center gap-4 py-6 text-left sm:gap-6 sm:py-7 ${focusStyles}`}
                >
                  <span className={`self-start pt-1 text-xs font-normal tracking-wider sm:pt-2 ${isOpen ? "text-brand-pink" : "text-brand-navy/45"}`} aria-hidden="true">
                    {service.number}
                  </span>
                  <span className="min-w-0 flex-1 text-xl font-medium leading-snug tracking-tight text-brand-navy transition-colors group-hover:text-brand-pink sm:text-2xl">
                    {service.title}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center" aria-hidden="true">
                    <Plus
                      strokeWidth={1.5}
                      className={`h-5 w-5 text-brand-navy transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                    />
                  </span>
                </button>
              </h3>
              <motion.div
                id={`service-panel-${service.id}`}
                role="region"
                aria-labelledby={`service-${service.id}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-8 sm:pl-10">
                  <p className="max-w-xl text-base leading-relaxed text-foreground/80">{service.description}</p>
                  <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {service.items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-navy">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-brand-pink" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AiSolutionsExperience() {
  const pageRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [activeInitiative, setActiveInitiative] = useState<string>(initiatives[0].id);
  const reduceMotion = usePrefersReducedMotion();

  // Progressive enhancement: content stays visible without JS or with reduced motion.
  useEffect(() => {
    const elements = Array.from(pageRef.current?.querySelectorAll<HTMLElement>("[data-ai-reveal]") ?? []);
    if (reduceMotion || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.revealState = "visible";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    elements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.dataset.revealState = "pending";
        observer.observe(element);
      }
    });
    return () => {
      observer.disconnect();
      elements.forEach(element => delete element.dataset.revealState);
    };
  }, [reduceMotion]);

  // Keep the in-page navigation in sync with the initiative being read.
  useEffect(() => {
    let frame = 0;
    const sections = initiatives.map(initiative => document.getElementById(initiative.id));
    function update() {
      frame = 0;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 96;
      const readingLine = headerHeight + (navRef.current?.offsetHeight ?? 64) + 50;
      let current: string = initiatives[0].id;
      sections.forEach(section => {
        if (section && section.getBoundingClientRect().top <= readingLine) current = section.id;
      });
      setActiveInitiative(current);
    }
    function requestUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <main ref={pageRef} className={`${styles.page} bg-white font-sans text-brand-navy`}>
      <section aria-labelledby="ai-heading" className="mx-auto max-w-[1440px] px-6 pb-12 pt-36 sm:px-10 sm:pt-44 md:px-12 md:pt-52 lg:px-16 lg:pb-20 lg:pt-60">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12 xl:gap-16">
          <div className={styles.heroCopy}>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">AI Solutions</p>
            <h1 id="ai-heading" className="max-w-3xl font-sans text-[clamp(2.5rem,5.2vw,4.75rem)] font-medium leading-[1.07] tracking-[-0.045em] text-brand-navy">
              Building<br />responsible AI.
              <span className="mt-3 block text-[0.75em] font-normal leading-[1.15] tracking-[-0.035em]">For people and society.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              I design, advise and build AI solutions that are ethical, human-centred and context-aware, with a strong focus on Africa and the Global South.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a href="#expertise" onClick={scrollToSection} className={`inline-flex min-h-12 items-center justify-center gap-4 bg-brand-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-pink ${focusStyles}`}>
                Explore my expertise <ArrowDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href="#initiatives" onClick={scrollToSection} className={`inline-flex min-h-12 items-center gap-3 py-3 text-sm font-semibold text-brand-navy underline decoration-brand-navy/30 underline-offset-4 transition-colors hover:text-brand-pink ${focusStyles}`}>
                Ideas into practice <ArrowDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className={`${styles.heroVisual} relative min-w-0 border border-brand-navy/15`}>
            <div className="relative aspect-[1.08/1] overflow-hidden bg-white">
              <ParticlePortrait reduceMotion={reduceMotion} />
              <span className="pointer-events-none absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60 sm:left-6 sm:top-6">Technology with a human perspective</span>
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-navy/15 px-5 py-4 text-xs sm:px-6">
              <span className="font-semibold">People. Context. Purpose.</span>
              <span className="text-brand-navy/60">Africa &amp; the Global South</span>
            </figcaption>
          </figure>
        </div>

        <ul className="mt-12 grid gap-6 border-t border-brand-navy/15 pt-7 md:grid-cols-3 md:gap-8 lg:mt-16">
          {principles.map((principle, index) => (
            <li key={principle} className="flex items-start gap-4 text-sm font-medium leading-relaxed">
              <span className="pt-0.5 text-[10px] font-normal tracking-wider text-brand-pink" aria-hidden="true">0{index + 1}</span>
              <span>{principle}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="expertise" tabIndex={-1} aria-labelledby="expertise-heading" className={`${styles.sectionTarget} border-y border-brand-navy/10 bg-brand-soft-blue`}>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 sm:px-10 md:px-12 md:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-16 lg:py-24">
          <div data-ai-reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">How I can help</p>
            <h2 id="expertise-heading" className="max-w-md font-sans text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl">Responsible AI,<br />from strategy<br className="hidden lg:block" /> to practice.</h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-foreground/75">Helping organizations adopt AI, build practical safeguards and develop the people who lead it.</p>
            <Link href="/work" className={`mt-8 inline-flex min-h-12 items-center gap-3 text-sm font-semibold underline decoration-brand-navy/30 underline-offset-4 transition-colors hover:text-brand-pink ${focusStyles}`}>
              Let’s work together <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
          <div data-ai-reveal><ServiceAccordion /></div>
        </div>
      </section>

      <section id="initiatives" tabIndex={-1} aria-labelledby="initiatives-heading" className={styles.sectionTarget}>
        <div className="mx-auto grid max-w-[1440px] gap-5 px-6 pb-10 pt-16 sm:px-10 md:grid-cols-2 md:items-end md:gap-16 md:px-12 md:pt-24 lg:px-16" data-ai-reveal>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">Founded &amp; developed by Maha</p>
            <h2 id="initiatives-heading" className="font-sans text-4xl font-medium leading-tight tracking-tight sm:text-5xl lg:text-6xl">Ideas into practice.</h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-foreground/75">Initiatives and frameworks I have founded or developed to bring responsible AI to life through health, knowledge and governance.</p>
        </div>

        <nav ref={navRef} aria-label="Explore the initiatives" className={`${styles.initiativeNav} sticky z-30 border-y border-brand-navy/15 bg-white/95 backdrop-blur-md`}>
          <div className="mx-auto grid max-w-[1440px] grid-cols-3 px-6 sm:px-10 md:px-12 lg:px-16">
            {initiatives.map(initiative => (
              <a
                key={initiative.id}
                href={`#${initiative.id}`}
                onClick={scrollToSection}
                aria-current={activeInitiative === initiative.id ? "location" : undefined}
                className={`relative flex min-h-16 items-center gap-3 border-b-2 py-4 text-xs font-semibold transition-colors sm:text-sm ${activeInitiative === initiative.id ? "border-brand-pink text-brand-navy" : "border-transparent text-brand-navy/60 hover:text-brand-navy"} ${focusStyles}`}
              >
                <span className="hidden text-[10px] font-normal text-brand-navy/45 sm:inline" aria-hidden="true">{initiative.number}</span>
                {initiative.name}
              </a>
            ))}
          </div>
        </nav>

        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 md:px-12 lg:px-16">
          {initiatives.map(initiative => (
            <article key={initiative.id} id={initiative.id} tabIndex={-1} aria-labelledby={`${initiative.id}-heading`} className={`${styles.initiativeTarget} grid gap-8 border-b border-brand-navy/15 py-12 last:border-b-0 md:gap-10 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-20`}>
              <div data-ai-reveal className={`relative flex min-w-0 flex-col justify-between overflow-hidden p-7 sm:p-10 ${initiative.id === "chifaa" ? "bg-[#FBF0F4]" : initiative.id === "hikma" ? "bg-[#F3F3EE]" : "bg-[#F8F6F0]"}`}>
                <p className="relative z-10 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-navy/65">
                  <span>{initiative.category}</span><span aria-hidden="true">{initiative.number}</span>
                </p>
                <div className={`relative my-8 w-full ${initiative.id === "chifaa" ? "aspect-[2/1]" : "aspect-[1.4/1]"}`}>
                  <Image src={initiative.logo} alt={initiative.logoAlt} fill sizes="(min-width: 1440px) 480px, (min-width: 1024px) 38vw, 85vw" className={`object-contain ${initiative.id === "hikma" ? "p-5 sm:p-8" : ""}`} />
                </div>
                <p className="border-t border-brand-navy/15 pt-5 text-sm font-medium leading-relaxed text-brand-navy">
                  {initiative.id === "chifaa" ? "Survivor-led. Human-centred." : initiative.id === "hikma" ? "Knowledge. Culture. Wisdom." : "Born in Carthage. Open to the world."}
                </p>
              </div>

              <div data-ai-reveal>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">{initiative.id === "carthage" ? initiative.title : initiative.name}</p>
                <h3 id={`${initiative.id}-heading`} className="max-w-2xl font-sans text-3xl font-medium leading-[1.18] tracking-tight text-brand-navy sm:text-4xl lg:text-[2.65rem]">
                  {initiative.id === "carthage" ? <>The Carthage Bill<span className="mt-2 block text-xl font-normal leading-snug tracking-normal sm:text-2xl">for Responsible Artificial Intelligence</span></> : initiative.title}
                </h3>
                {initiative.id === "carthage" && (
                  <div className="mt-6 border-l-2 border-brand-navy pl-5">
                    <p className="text-base font-medium leading-relaxed">A Global Framework for Human-Centered AI, Peace, and Dialogue of Civilizations</p>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/75">Born in Carthage. Built for the Mediterranean. Open to the World.</p>
                  </div>
                )}
                <p className="mt-6 text-base leading-relaxed text-foreground/80">{initiative.description}</p>
                <ul className="mt-6 grid gap-3 border-t border-brand-navy/15 pt-6 sm:grid-cols-2 sm:gap-x-6">
                  {initiative.items.map(item => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brand-navy">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-brand-pink" aria-hidden="true" />{item}
                    </li>
                  ))}
                </ul>
                {"href" in initiative ? (
                  <a href={initiative.href} target="_blank" rel="noopener noreferrer" className={`mt-8 inline-flex min-h-12 items-center gap-4 border-b border-brand-navy pb-2 text-sm font-semibold transition-colors hover:border-brand-pink hover:text-brand-pink ${focusStyles}`}>
                    {initiative.cta}<ArrowUpRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                ) : (
                  <Link href="/work" className={`mt-8 inline-flex min-h-12 items-center gap-4 border-b border-brand-navy pb-2 text-sm font-semibold transition-colors hover:border-brand-pink hover:text-brand-pink ${focusStyles}`}>
                    Discuss the framework<ArrowUpRight className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="A people-first approach to AI" className="bg-brand-navy text-white">
        <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-10 md:px-12 md:py-20 lg:px-16 lg:py-24" data-ai-reveal>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-12 xl:gap-16">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">The conviction behind the work</p>
              <blockquote className="text-3xl font-normal leading-[1.25] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.5rem]">
                AI should not begin with the technology. It should begin with <span className="text-brand-pink">people, context and purpose.</span>
              </blockquote>
            </div>
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden lg:aspect-square">
              <Image
                src="/images/1.jpeg"
                alt="Maha Jouini speaking at a conference"
                fill
                sizes="(min-width: 640px) 384px, calc(100vw - 48px)"
                className="object-cover object-center"
              />
            </figure>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/20 pt-7">
            <p className="text-sm text-white/75">Maha Jouini</p>
            <Link href="/work" className="inline-flex min-h-12 items-center gap-4 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-pink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Start a conversation<ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
