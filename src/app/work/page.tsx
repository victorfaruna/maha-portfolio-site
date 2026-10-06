import Image from "next/image";
import {
  BookOpen,
  BriefcaseBusiness,
  FileCheck2,
  GraduationCap,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircleMore,
  Mic2,
  Search,
  Target,
  UserRoundSearch,
  UsersRound,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";

const BRAND_PURPLE = "#6B168E";
const NAVY = "#091225";

const services = [
  {
    Icon: Lightbulb,
    title: "Responsible AI Advisory",
    description:
      "Strategic guidance for organizations navigating AI adoption, ethics and governance.",
    items: [
      "AI strategy",
      "Responsible AI frameworks",
      "AI governance",
      "Risk & impact assessment",
      "Safeguards",
    ],
  },
  {
    Icon: FileCheck2,
    title: "AI Policy & Governance",
    description:
      "Support in translating ethical principles into practical policies, institutional frameworks and accountability mechanisms.",
    items: [
      "AI policies",
      "Governance frameworks",
      "Ethics guidelines",
      "Inclusion",
      "Human-centred AI",
    ],
  },
  {
    Icon: GraduationCap,
    title: "Training & Capacity Building",
    description:
      "Tailored workshops and learning programmes that help teams understand AI and develop the capacity to use it responsibly.",
    items: [
      "AI literacy",
      "AI ethics",
      "Responsible AI",
      "AI policy",
      "AI & vulnerable communities",
    ],
  },
  {
    Icon: Mic2,
    title: "Speaking & Thought Leadership",
    description:
      "Available for conferences, panels, keynotes, expert dialogues, podcasts and institutional events exploring the societal implications of AI.",
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
    Icon: UsersRound,
    title: "Mentorship",
    description:
      "Mentorship for women, emerging leaders, entrepreneurs and innovators working across AI, technology and social impact.",
    items: [
      "Leadership",
      "Responsible innovation",
      "AI entrepreneurship",
      "Career development",
      "Social-impact technology",
    ],
  },
];

const capabilities = [
  { Icon: MessageCircleMore, label: "Advisory" },
  { Icon: Target, label: "Consulting" },
  { Icon: BookOpen, label: "Training" },
  { Icon: Mic2, label: "Speaking" },
  { Icon: Search, label: "Research" },
  { Icon: UserRoundSearch, label: "Mentorship" },
];

function ServiceCard({
  service,
  wide = false,
}: {
  service: (typeof services)[number];
  wide?: boolean;
}) {
  const { Icon, title, description, items } = service;

  return (
    <article
      className={`rounded-xl border border-[#e4d5eb] bg-white/55 p-4 shadow-[0_2px_10px_rgba(56,19,73,0.04)] ${
        wide ? "lg:col-span-3" : "lg:col-span-2"
      }`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#6B168E] text-[#6B168E]">
          <Icon size={23} strokeWidth={1.4} />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold uppercase leading-tight text-[#182033]">
            {title}
          </h2>
          <span className="mt-1 block h-px w-8 bg-[#6B168E]" />
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-[#303541]">{description}</p>
      <ul className={`grid gap-x-5 text-[13px] leading-relaxed text-[#303541] ${wide ? "sm:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <li key={item} className="before:mr-2 before:text-[#6B168E] before:content-['•']">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function WorkWithMePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#101827]">
      <Navbar solid />

      <div className="w-full pt-24 sm:pt-[120px] md:pt-36 lg:pt-44">
        <section className="relative overflow-hidden bg-white">
          <Image
            src="/images/work-with-me-hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 1500px, 100vw"
            className="hidden object-cover object-[center_42%] lg:block"
          />

          <div className="relative z-10 w-full bg-white px-6 pb-9 pt-8 sm:px-10 lg:w-[60%] lg:bg-transparent lg:px-12 lg:pb-10 lg:pr-8 xl:px-14">
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_180px]">
              <div>
                <h1 className="whitespace-nowrap font-serif text-4xl leading-none tracking-tight text-[#0a1122] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
                  WORK WITH ME
                </h1>
                <div className="my-3 flex items-center">
                  <span className="h-0.5 w-16 bg-[#6B168E]" />
                  <span className="size-1.5 rounded-full bg-[#6B168E]" />
                </div>
                <h2 className="max-w-2xl text-lg font-bold uppercase leading-tight tracking-wide text-[#141a25] sm:text-xl lg:text-2xl">
                  Turning responsible AI into strategy, governance and impact
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#303746] sm:text-lg">
                  I partner with organizations, governments, NGOs, companies, startups and research institutions to adopt and govern AI responsibly, with a focus on Africa, the MENA region and the Global South.
                </p>
              </div>

              <blockquote className="pt-1 text-[#182033]">
                <span className="block font-serif text-6xl leading-[0.65] text-[#6B168E]">“</span>
                <p className="mt-4 text-sm leading-relaxed sm:text-base">
                  Technology should empower people, protect rights and advance inclusion.
                </p>
                <p className="mt-2 text-sm font-bold leading-snug sm:text-base">
                  That is the future I work towards.
                </p>
                <span className="mt-4 block h-px w-11 bg-[#6B168E]" />
              </blockquote>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {services.slice(0, 3).map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
              {services.slice(3).map((service) => (
                <ServiceCard key={service.title} service={service} wide />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-[#f7f2fa] px-5 py-8 sm:px-10 lg:hidden">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-purple-200 bg-black shadow-[0_20px_55px_rgba(38,17,58,0.2)] ring-1 ring-purple-900/10">
              <Image
                src="/images/hero.webp"
                alt="Maha Jouini"
                fill
                priority
                sizes="(max-width: 640px) calc(100vw - 40px), 448px"
                className="object-cover object-[center_22%]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
            </div>
          </div>
        </section>

        <section className="border-y border-[#e4d5eb] bg-white px-6 py-5 sm:px-10 lg:px-12">
          <div className="grid items-center gap-7 lg:grid-cols-[1.1fr_2fr_1.05fr]">
            <div className="flex items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#6B168E] text-white">
                <BriefcaseBusiness size={28} strokeWidth={1.4} />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold uppercase text-[#182033]">Let&apos;s work together</h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[#343946]">
                  If you are building, adopting or governing AI and want to ensure that people, ethics and context remain at the centre, I would be glad to explore how we can work together.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 divide-x divide-[#c8c1b6] sm:grid-cols-6">
              {capabilities.map(({ Icon, label }) => (
                <div key={label} className="flex min-h-16 flex-col items-center justify-center gap-1.5 px-2 text-center">
                  <Icon size={26} strokeWidth={1.35} className="text-[#131d32]" />
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#151b27]">{label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 lg:border-l lg:border-[#c8c1b6] lg:pl-7">
              <a
                href="mailto:hello@mahajouini.net"
                className="flex items-center justify-center gap-3 rounded-lg bg-[#6B168E] px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#4A0E66]"
              >
                <Mail size={18} />
                Get in touch
              </a>
              <a href="mailto:hello@mahajouini.net" className="flex items-center gap-2 text-sm font-medium text-[#343946] hover:text-[#6B168E]">
                <Mail size={16} /> hello@mahajouini.net
              </a>
              <p className="flex items-center gap-2 text-sm font-medium text-[#343946]">
                <MapPin size={16} fill={NAVY} /> Africa <span style={{ color: BRAND_PURPLE }}>•</span> MENA <span style={{ color: BRAND_PURPLE }}>•</span> Global
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
