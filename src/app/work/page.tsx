import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ServicesScrollLink } from "./ServicesScrollLink";
import { getPageMetadata } from "@/lib/site-metadata";

export const metadata = getPageMetadata("/work");

const CONTACT_EMAIL = "mailto:hello@mahajouini.net";

const services = [
  {
    title: "Responsible AI Advisory",
    description:
      "Strategic guidance for organizations navigating AI adoption, ethics and governance.",
    image: "/images/work-with-me-portrait.jpg",
    alt: "Maha Jouini contributing to a discussion at a professional gathering",
    position: "50% 42%",
    items: [
      "AI strategy",
      "Responsible AI frameworks",
      "AI governance",
      "Risk & impact assessment",
      "Safeguards",
    ],
  },
  {
    title: "AI Policy & Governance",
    description:
      "Support in translating ethical principles into practical policies, institutional frameworks and accountability mechanisms.",
    image: "/images/abouthero.JPG",
    alt: "Maha Jouini taking part in an international policy discussion",
    position: "50% 35%",
    items: [
      "AI policies",
      "Governance frameworks",
      "Ethics guidelines",
      "Inclusion",
      "Human-centred AI",
    ],
  },
  {
    title: "Training & Capacity Building",
    description:
      "Tailored workshops and learning programmes that help teams understand AI and develop the capacity to use it responsibly.",
    image: "/images/myjourney1.jpeg",
    alt: "Maha Jouini listening and exchanging ideas with fellow participants",
    position: "45% 50%",
    items: [
      "AI literacy",
      "AI ethics",
      "Responsible AI",
      "AI policy",
      "AI & vulnerable communities",
    ],
  },
  {
    title: "Speaking & Thought Leadership",
    description:
      "Available for conferences, panels, keynotes, expert dialogues, podcasts and institutional events exploring the societal implications of AI.",
    image: "/images/3.jpeg",
    alt: "Maha Jouini speaking into a microphone during a panel discussion",
    position: "50% 35%",
    items: [
      "Responsible AI",
      "AI governance",
      "Africa & AI",
      "Women & technology",
      "Digital inclusion",
      "AI for social impact",
    ],
  },
  {
    title: "Mentorship",
    description:
      "Mentorship for women, emerging leaders, entrepreneurs and innovators working across AI, technology and social impact.",
    image: "/images/From Storytelling and Poetry to AI Systems.jpg",
    alt: "Maha Jouini beside a collection of books on technology and culture",
    position: "25% 30%",
    items: [
      "Leadership",
      "Responsible innovation",
      "AI entrepreneurship",
      "Career development",
      "Social-impact technology",
    ],
  },
];

const collaborationSteps = [
  {
    title: "Start with your context",
    description:
      "Tell me about your organization, the communities you serve and the questions you are working through.",
  },
  {
    title: "Shape the right engagement",
    description:
      "Together, we define the focus, format and priorities—whether that is strategic advice, a workshop or a longer-term collaboration.",
  },
  {
    title: "Move from principles to practice",
    description:
      "Connect ethical thinking with practical steps that help your team build, adopt or govern AI responsibly.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { title, description, image, alt, position, items } = service;

  return (
    <article
      className={
        "group flex min-w-0 flex-col border border-border/80 bg-background p-5 sm:p-6 " +
        (index < 2 ? "lg:col-span-3" : "lg:col-span-2")
      }
    >
      <a
        href={CONTACT_EMAIL}
        aria-label={"Enquire about " + title}
        className="relative mb-6 block aspect-[16/10] overflow-hidden rounded-2xl bg-brand-soft-blue focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-pink"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes={
            index < 2
              ? "(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
              : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover"
          style={{ objectPosition: position }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-navy/0 transition-colors duration-200 group-hover:bg-brand-navy/10 motion-reduce:transition-none"
        />
      </a>

      <p className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-brand-pink">
        {String(index + 1).padStart(2, "0")} / COLLABORATE
      </p>
      <h3 className="mb-3 font-sans text-2xl leading-tight text-brand-navy sm:text-[28px]">
        <a
          href={CONTACT_EMAIL}
          className="decoration-1 underline-offset-4 hover:underline focus-visible:outline-brand-pink"
        >
          {title}
        </a>
      </h3>
      <p className="mb-5 text-base leading-relaxed text-foreground/75">
        {description}
      </p>
      <ul
        aria-label={title + " areas of focus"}
        className="mb-6 flex flex-wrap gap-2 border-t border-border/80 pt-4 text-xs leading-relaxed text-foreground/65"
      >
        {items.map((item) => (
          <li key={item} className="max-w-full border border-brand-navy/10 bg-brand-soft-blue/60 px-2.5 py-1.5">
            {item}
          </li>
        ))}
      </ul>
      <a
        href={CONTACT_EMAIL}
        className="mt-auto inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-navy underline-offset-4 hover:underline focus-visible:outline-brand-pink"
      >
        Discuss this service
        <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
      </a>
    </article>
  );
}

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <Navbar mobileMenuFont="sans" />

      <section
        aria-labelledby="work-heading"
        className="relative isolate flex min-h-[800px] items-end overflow-hidden bg-black pb-14 pt-48 md:min-h-[780px] md:pb-20 lg:min-h-[820px]"
      >
        <Image
          src="/images/advice.jpeg"
          alt="Maha Jouini sharing perspectives on technology and responsible innovation"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[60%_30%] lg:object-[center_35%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/10 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/40 lg:to-black/5"
        />

        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12">
          <div className="max-w-2xl">
            <h1
              id="work-heading"
              className="font-sans text-5xl leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              Responsible AI.
              <span className="mt-2 block italic text-brand-pink">
                Human impact.
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              Turning responsible AI into strategy, governance and impact together,
              with people at the centre.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href={CONTACT_EMAIL}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-pink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-pink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Start a conversation
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <ServicesScrollLink
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/45 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the services
                <ArrowDown size={17} strokeWidth={1.75} aria-hidden="true" />
              </ServicesScrollLink>
            </div>
            <div className="mt-12 flex items-center gap-2.5 border-t border-white/20 pt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 sm:text-xs">
              <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
              Africa <span className="text-brand-pink">/</span> MENA{" "}
              <span className="text-brand-pink">/</span> Global South
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="collaboration-heading"
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 md:px-12 md:py-24"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">
              A shared purpose
            </p>
            <h2
              id="collaboration-heading"
              className="max-w-lg font-sans text-3xl leading-tight text-brand-navy sm:text-4xl lg:text-5xl"
            >
              Good technology begins with people.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-foreground/80 md:pt-8 md:text-lg">
            <p>
              I partner with organizations, governments, NGOs, companies,
              startups and research institutions to adopt and govern AI
              responsibly, with a focus on Africa, the MENA region and the
              Global South.
            </p>
            <p>
              From a strategic conversation to a hands-on workshop, my work
              brings technology, ethics and cultural context together—so that
              innovation serves the communities it is designed for.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 pt-1 text-sm font-semibold text-brand-navy underline-offset-4 hover:underline focus-visible:outline-brand-pink"
            >
              Get to know my approach
              <ArrowRight
                size={18}
                strokeWidth={1.75}
                className="text-brand-pink"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="ways-to-work"
        tabIndex={-1}
        aria-labelledby="services-heading"
        className="scroll-mt-28 border-y border-border/60 bg-brand-soft-blue/60 py-16 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12">
          <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">
                Expertise into action
              </p>
              <h2
                id="services-heading"
                className="font-sans text-3xl leading-tight text-brand-navy sm:text-4xl lg:text-5xl"
              >
                Ways we can work together
              </h2>
            </div>
            <p className="max-w-xs text-base leading-relaxed text-foreground/70">
              Different ways to collaborate. The same commitment to responsible,
              inclusive AI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-9 lg:gap-y-16">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="partnership-heading"
        className="bg-brand-navy py-16 text-white md:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 md:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <figure className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl rounded-tr-[4.5rem] bg-black">
              <Image
                src="/images/mahaholdingbook.jpeg"
                alt="Maha Jouini reading a book, reflecting the connection between culture, knowledge and her work in AI"
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-5 border-l-2 border-brand-pink pl-4 font-sans text-lg italic leading-relaxed text-white/85">
              Technology should empower people, protect rights and advance
              inclusion.
            </figcaption>
          </figure>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">
              The way forward
            </p>
            <h2
              id="partnership-heading"
              className="font-sans text-3xl leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              A partnership built around your context.
            </h2>
            <ol className="mt-9 divide-y divide-white/15 border-y border-white/15">
              {collaborationSteps.map((step, index) => (
                <li key={step.title} className="flex gap-5 py-6">
                  <span
                    aria-hidden="true"
                    className="pt-1 text-xs font-semibold tracking-wider text-brand-pink"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-2 font-sans text-xl text-white sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={CONTACT_EMAIL}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-brand-pink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-pink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Let&apos;s work together
              <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
