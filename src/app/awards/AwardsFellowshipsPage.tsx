import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

type Recognition = {
  title: string;
  role: string;
  period?: string;
  initiative?: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

type FeaturedRecognition = Recognition & {
  href: string;
  linkLabel: string;
  image: { src: string; alt: string; position: string; fit?: "cover" | "contain" };
};

const awards: Recognition[] = [
  {
    title: "UNESCO MENA Top 20 Women Change Makers",
    role: "Recognition",
    period: "2022",
    description:
      "Recognized among women driving change and impact across the MENA region.",
    href: "https://asfariinstitute.org/2022/01/28/maha-jouini-artificial-intelligence-and-beyond/",
    linkLabel: "Read the 2022 profile",
  },
  {
    title: "Google Women Techmakers Ambassador",
    role: "Ambassador",
    period: "Since 2022",
    description:
      "Part of Google’s global Women Techmakers community, supporting the visibility and advancement of women in technology.",
    href: "https://www.linkedin.com/posts/maha-jouini_google-technology-team-activity-6998359240415264768-GpQj",
    linkLabel: "View the ambassador announcement",
  },
];

// Programme details supplied by Maha. Official profile links are included where
// verified; the UNESCO 2026–2027 programme is separate from the 2022 recognition.
const featuredProgrammes: FeaturedRecognition[] = [
  {
    title: "Microsoft Elevate Changemaker Fellowship",
    role: "Fellow",
    period: "2026",
    description:
      "Selected for a global changemaker programme supporting leaders using technology to drive meaningful social impact. Her fellowship work focuses on an open-source conversational tool for women with breast and cervical cancer across MENA, including regional dialects and data privacy.",
    href: "https://ms-elevate.caribou.global/meet-the-fellows/",
    linkLabel: "Meet the Microsoft Elevate fellows",
    image: {
      src: "/images/awards-fellowships/chifaa-tunisia-profile-card.png",
      alt: "CHIFAA Tunisia profile card featuring Maha Jouini and her cancer-care AI initiative",
      position: "50% 50%",
      fit: "contain",
    },
  },
  {
    title: "UNESCO Intercultural Leadership Programme",
    role: "Youth for Peace",
    period: "2026–2027",
    description:
      "Featured in UNESCO’s Youth for Peace cohort, bringing perspectives on responsible AI, gender-responsive digital transformation and culturally grounded technology to intercultural dialogue.",
    href: "https://www.unesco.org/en/interculturaldialogue/youthforpeace/maha-jouini",
    linkLabel: "Read the UNESCO profile",
    image: {
      src: "/images/awards-fellowships/unesco.png",
      alt: "UNESCO Youth for Peace website showing Maha Jouini’s leadership programme profile",
      position: "50% 50%",
      fit: "contain",
    },
  },
];

const fellowships: Recognition[] = [
  {
    title: "Stanford Ethics, Technology & Public Policy Practitioner Program",
    role: "Practitioner · 2025 / Cohort leader · 2026",
    description:
      "Selected for a practitioner programme exploring the intersection of emerging technologies, ethics and public policy.",
  },
  {
    title: "Global Center on AI Governance",
    role: "Research Fellow",
    initiative: "Women in Focus",
    description:
      "Contributing research and perspectives on responsible AI and AI governance through the Women in Focus initiative, with particular attention to women’s leadership, inclusion and AI governance in Africa.",
  },
  {
    title: "TechForward Policy Fellowship",
    role: "Mentor",
    period: "2026",
    description:
      "Supporting emerging professionals working at the intersection of AI and public policy.",
  },
  {
    title: "UNDP Arab States",
    role: "Business Mentor",
    period: "2023",
    description:
      "Mentored women entrepreneurs and emerging innovators across the Arab States, providing guidance on business development, innovation and entrepreneurship.",
  },
  {
    title: "ARIN Publishing Academy — First Cohort",
    role: "Fellow",
    period: "2026",
    description:
      "Selected for the inaugural cohort of the ARIN Publishing Academy, strengthening research, academic writing and publishing capacity for African scholars and practitioners.",
  },
  {
    title: "UNFPA Tunisia — Pool of Experts in AI & Technology-Facilitated Gender-Based Violence (TFGBV)",
    role: "Expert",
    period: "2026",
    description:
      "Selected to contribute expertise on AI, digital safety and technology-facilitated gender-based violence, supporting gender-responsive and responsible approaches to emerging technologies in Tunisia.",
  },
];

function SourceLink({
  href,
  children,
  inverse = false,
  stretched = false,
}: {
  href: string;
  children: ReactNode;
  inverse?: boolean;
  stretched?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 ${inverse ? "text-white decoration-white/50 hover:decoration-white" : "text-brand-navy decoration-brand-navy/40 hover:decoration-brand-navy"} ${stretched ? "after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-brand-pink" : ""}`}
    >
      {children}
      <ArrowUpRight size={16} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function FeaturedProgramme({ item }: { item: FeaturedRecognition }) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-brand-navy/15 bg-brand-soft-blue/40" data-featured-programme>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${item.title}: view the programme profile (opens in a new tab)`}
        className={`relative block aspect-[3/2] w-full overflow-hidden ${item.image.fit === "contain" ? "bg-white" : "bg-brand-navy"} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy`}
      >
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(min-width: 1440px) 624px, (min-width: 768px) 44vw, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
          className={item.image.fit === "contain" ? "object-contain" : "object-cover"}
          style={{ objectPosition: item.image.position }}
        />
      </a>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="mb-3 text-xs font-semibold leading-relaxed tracking-wide text-brand-navy/70">
          {item.role}{item.period && <> · {item.period}</>}
        </p>
        <h3 className="font-sans text-2xl font-semibold leading-snug tracking-tight text-brand-navy sm:text-[1.75rem]">
          {item.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-foreground/85">{item.description}</p>
        <div className="mt-auto pt-6">
          <SourceLink href={item.href}>{item.linkLabel}</SourceLink>
        </div>
      </div>
    </article>
  );
}

function Programme({ item }: { item: Recognition }) {
  return (
    <article className="min-w-0 border-t border-brand-navy/20 py-7 sm:py-8">
      <p className="mb-3 text-xs font-semibold leading-relaxed tracking-wide text-brand-navy/70">
        {item.role}
        {item.period && <> · {item.period}</>}
        {item.initiative && <> · {item.initiative}</>}
      </p>
      <h3 className="font-sans text-xl font-semibold leading-snug tracking-tight text-brand-navy sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/85">
        {item.description}
      </p>
      {item.href && item.linkLabel && (
        <div className="mt-4">
          <SourceLink href={item.href}>{item.linkLabel}</SourceLink>
        </div>
      )}
    </article>
  );
}

export default function AwardsFellowshipsPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-foreground">
      <Navbar solid mobileMenuFont="sans" />

      <section aria-labelledby="awards-heading" className="px-6 pb-16 pt-36 sm:px-10 sm:pt-44 lg:px-16 lg:pb-24 lg:pt-56">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="min-w-0 py-4 lg:py-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy/65">
              Responsible AI. Public impact.
            </p>
            <h1 id="awards-heading" className="font-sans text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-brand-navy sm:text-6xl xl:text-7xl">
              Awards &amp;<br />Fellowships
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/85 sm:text-xl sm:leading-9">
              Recognized for advancing responsible AI, ethical technology, digital inclusion and women’s leadership across Africa and globally.
            </p>
            <nav aria-label="On this page" className="mt-9 flex flex-col items-start gap-x-7 gap-y-2 border-t border-brand-navy/20 pt-5 sm:flex-row sm:flex-wrap">
              <a href="#recognition" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-navy underline decoration-brand-navy/35 underline-offset-4 hover:decoration-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4">
                Awards &amp; recognition
              </a>
              <a href="#fellowships" className="inline-flex min-h-11 items-center text-sm font-semibold text-brand-navy underline decoration-brand-navy/35 underline-offset-4 hover:decoration-brand-navy focus-visible:outline-2 focus-visible:outline-offset-4">
                Fellowships &amp; leadership
              </a>
            </nav>
          </div>
          <figure className="min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden bg-brand-soft-blue lg:aspect-[5/6]">
              <Image
                src="/images/awards-fellowships/maha-jouini-portrait.jpg"
                alt="Maha Jouini standing outdoors, holding a tablet"
                fill
                priority
                sizes="(min-width: 1440px) 530px, (min-width: 1024px) 43vw, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-brand-navy/65">
              Maha Jouini · AI governance, policy and advocacy
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="recognition" aria-labelledby="recognition-heading" className="scroll-mt-32 bg-brand-soft-blue px-6 py-16 sm:px-10 lg:scroll-mt-52 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 id="recognition-heading" className="mb-9 font-sans text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            Awards &amp; recognition
          </h2>

          <article data-award-card className="relative isolate grid items-center gap-9 bg-brand-navy p-6 text-white sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-14">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase leading-6 tracking-[0.14em] text-brand-pink">
                AI Thought Leadership · Winner · 2026
              </p>
              <h3 className="mt-5 max-w-lg font-sans text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                She Shapes AI<br className="hidden sm:block" /> Global Awards
              </h3>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
                Recognized for leadership and impact in responsible and ethical AI.
              </p>
              <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
                Her work brings Arab, Muslim and African women’s perspectives into global AI governance, connecting public policy with the communities technology should serve.
              </p>
              <dl className="mt-7 grid gap-x-7 gap-y-5 border-t border-white/20 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-white/65">Awards ceremony</dt>
                  <dd className="mt-1 text-sm font-semibold">16 April 2026</dd>
                </div>
                <div>
                  <dt className="text-xs text-white/65">Location</dt>
                  <dd className="mt-1 text-sm font-semibold leading-6">London School of Economics</dd>
                </div>
              </dl>
              <div className="mt-6">
                <SourceLink href="https://www.sheshapes.ai/202526-awards/thought-leadership-in-ai-winner" inverse stretched>
                  View the award &amp; winner profile
                </SourceLink>
              </div>
            </div>
            <figure className="mx-auto w-full max-w-md lg:max-w-none">
              <Image
                src="/images/awards-fellowships/she-shapes-ai-winner.png"
                alt="Official She Shapes AI 2025/26 Global Awards graphic naming Maha Jouini the Thought Leadership in AI winner"
                width={1080}
                height={1080}
                sizes="(min-width: 1440px) 460px, (min-width: 1024px) 38vw, (min-width: 640px) 448px, calc(100vw - 96px)"
                className="h-auto w-full"
              />
              <figcaption className="mt-3 text-xs leading-relaxed text-white/65">
                Winner announcement · She Shapes AI
              </figcaption>
            </figure>
          </article>

          <div className="mt-6 grid gap-x-12 md:grid-cols-2 lg:gap-x-20">
            {awards.map((item) => <Programme key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section id="fellowships" aria-labelledby="fellowships-heading" className="scroll-mt-32 px-6 py-16 sm:px-10 lg:scroll-mt-52 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <header className="grid gap-5 border-b border-brand-navy/20 pb-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <h2 id="fellowships-heading" className="max-w-xl font-sans text-3xl font-semibold leading-tight tracking-tight text-brand-navy sm:text-4xl">
              Fellowships &amp;<br className="hidden sm:block" /> leadership programmes
            </h2>
            <p className="max-w-xl self-end text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8">
              Research, public policy and mentorship: working with institutions and communities to put responsible technology into practice.
            </p>
          </header>

          <div className="mt-10 grid items-stretch gap-8 md:grid-cols-2 lg:gap-10">
            {featuredProgrammes.map((item) => <FeaturedProgramme key={item.title} item={item} />)}
          </div>

          <div className="mt-10 grid gap-x-12 md:grid-cols-2 lg:mt-14 lg:gap-x-20">
            {fellowships.map((item) => <Programme key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
