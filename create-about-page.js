const fs = require('fs');

const content = `"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

const taglines = [
  "I turn lived experience into policy.",
  "I build AI with wisdom, not just data.",
  "Every system carries a worldview.\\nI make sure it sees everyone.",
];

export default function AboutPage() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setTaglineIndex((prev) => (prev + 1) % taglines.length),
      3600,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* ── A: Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/images/abouthero.JPG"
          alt="Maha Jouini – AI Governance Expert"
          fill
          className="object-cover"
          style={{ objectPosition: "center 30%" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />

        {/* Rotating tagline */}
        <div className="absolute inset-0 flex items-end pb-12 px-8 md:px-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="text-white text-2xl md:text-4xl max-w-xl whitespace-pre-line font-script"
              style={{
                textShadow: "0px 2px 16px rgba(0,0,0,0.7)",
                lineHeight: 1.45,
              }}
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* ── B: Intro Paragraph ──────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="text-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
        >
          People say change happens in the blink of an eye — but I've lived
          through enough chapters to know it happens in waves. I'm{" "}
          <span className="text-brand-navy font-semibold font-serif">
            Maha Jouini
          </span>
          : AI governance expert, researcher, and founder of{" "}
          <span className="text-brand-pink font-medium">HIKMA AI</span> and{" "}
          <span className="text-brand-cyan font-medium">CHIFAA</span>. I build
          responsible, human-centered AI that bridges technology, health,
          ethics, and culture — amplifying the voices of Africa, the Arab world,
          and the Global South to shape a wiser, more inclusive future.
        </motion.p>
      </section>

      {/* ── 1. My Journey (Timeline) ────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-navy mb-6">
            My Journey
          </h2>
          <h3 className="text-xl md:text-2xl font-serif text-brand-pink mb-4">
            Building Responsible AI Through Policy, Governance, and Human-Centered Innovation
          </h3>
          <div className="text-foreground/80 text-lg leading-relaxed space-y-4 max-w-4xl">
            <p>
              For more than a decade, my work has been driven by a single conviction: technology should strengthen institutions, expand opportunity, and improve people's lives. My professional journey has taken me across Africa, the Middle East, Europe, and Asia, working at the intersection of artificial intelligence, digital governance, public policy, and social innovation.
            </p>
            <p>
              Today, I advise governments, international organizations, research institutions, and civil society on responsible AI, digital transformation, institutional capacity building, and public sector innovation. Yet my journey began long before artificial intelligence became a global priority.
            </p>
            <p className="font-semibold text-brand-navy">
              It began with people.
            </p>
          </div>
        </motion.div>

        <div className="relative mt-16">
          {/* Vertical rule — visible sm+ */}
          <div className="absolute left-[120px] top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="space-y-12">
            {[
              {
                period: "2011–2013",
                title: "Empowering Youth During Tunisia's Democratic Transition",
                content: (
                  <>
                    <p className="mb-3">My professional career started during one of the most transformative moments in Tunisia's modern history. Following the 2011 Revolution, I joined the Tunisian Forum for Youth Development, where I helped young people become active participants in rebuilding democratic institutions.</p>
                    <p className="mb-3">As Team Leader and Digital Communication Assistant, I co-developed communication strategies that encouraged civic participation, coordinated volunteer networks, and managed digital engagement initiatives designed to amplify youth voices in national dialogue.</p>
                    <p className="mb-3">This experience introduced me to the power of digital technologies as instruments of democratic participation. It also taught me that meaningful transformation depends not only on technology but on inclusive institutions, stakeholder engagement, and trust between governments and citizens.</p>
                    <p>These early years established the foundations of my work in digital governance, institutional collaboration, and public engagement.</p>
                  </>
                )
              },
              {
                period: "2014–2017",
                title: "Advancing Regional Policy at the African Union",
                content: (
                  <>
                    <p className="mb-3">I joined the African Union Campaign to End Child Marriage in Africa, based in Addis Ababa, where I contributed to one of the continent's largest policy and advocacy initiatives focused on protecting girls' rights.</p>
                    <p className="mb-3">Working across multiple African Union Member States, I coordinated regional consultations involving governments, Regional Economic Communities, United Nations agencies, development partners, and civil society organizations.</p>
                    <p className="mb-3">My responsibilities included conducting policy and regulatory analysis, mapping institutional and legal frameworks, collecting and analysing evidence, and producing policy briefs that informed continental strategies. I also contributed to monitoring and evaluation systems, knowledge management, and evidence-based advocacy supporting regional decision-making.</p>
                    <p className="mb-3">One of the highlights of this period was co-organising the First African Girls Summit in Lusaka, Zambia, which brought together policymakers, young leaders, and international partners to strengthen continental collaboration around gender equality.</p>
                    <p>This role significantly strengthened my expertise in government advisory, stakeholder engagement, institutional capacity building, and regional policy development—skills that would later become central to my work in AI governance.</p>
                  </>
                )
              },
              {
                period: "2018–2020",
                title: "Driving Digital Transformation Across the African Union",
                content: (
                  <>
                    <p className="mb-3">Following my regional policy experience, I joined the Office of the African Union Special Youth Envoy as Youth, Gender and Digital Transformation Advisor.</p>
                    <p className="mb-3">This role marked an important shift toward digital transformation and institutional innovation.</p>
                    <p className="mb-3">I supported the digitisation of internal workflows, knowledge management systems, and communication platforms, helping improve collaboration across African Union Member States. I worked to strengthen youth participation through digital tools while supporting institutional modernization and more efficient programme delivery.</p>
                    <p className="mb-3">Beyond technology implementation, I contributed to broader public sector digital transformation by supporting digital strategy implementation, institutional coordination, digital cooperation, and stakeholder engagement across multiple countries.</p>
                    <p className="mb-3">This experience deepened my understanding that successful digital transformation is not merely about adopting new technologies—it requires governance frameworks, institutional readiness, leadership, and people-centred change management.</p>
                    <p>These lessons continue to shape my approach to AI governance today.</p>
                  </>
                )
              },
              {
                period: "2020–2022",
                title: "Human Rights, Digital Inclusion, and Responsible Innovation",
                content: (
                  <>
                    <p className="mb-3">Returning to Tunisia, I joined the Arab Institute for Human Rights as Senior Advocacy Specialist, where my work expanded beyond traditional human rights into the growing relationship between technology and society.</p>
                    <p className="mb-3">I led national advocacy initiatives supporting migrants, women, and vulnerable communities while promoting access to healthcare, legal protection, and social inclusion.</p>
                    <p className="mb-3">Working alongside governments, international organizations, and civil society, I contributed to policy advocacy on technology-facilitated harms, online safety, digital inclusion, and the ethical use of emerging technologies.</p>
                    <p>This period reinforced my belief that digital transformation must be guided by human rights, equity, and social justice. It also strengthened my expertise in multi-stakeholder dialogue, institutional collaboration, public policy, and digital governance—areas that would become central to my international work in responsible AI.</p>
                  </>
                )
              },
              {
                period: "2022",
                title: "Advancing National Digital Transformation in Mauritania and STEM.",
                content: (
                  <>
                    <p className="mb-3">In 2022, I joined Infolog Group as a Digital Transformation and Digital Inclusion Consultant, contributing to the implementation of Mauritania's National Digital Transformation Strategy through the CACHILY Project. Working alongside government institutions, telecommunications operators, financial institutions, development partners, and local stakeholders, I supported initiatives designed to expand access to digital technologies and strengthen financial inclusion.</p>
                    <p className="mb-3">My work focused on connecting policy with implementation. I contributed to the development of digital public services, supported e-Government initiatives, and facilitated collaboration between the public and private sectors to improve the country's digital ecosystem. I also designed and delivered capacity-building programmes for entrepreneurs on digital entrepreneurship, innovation, and Design Thinking, helping strengthen institutional capabilities and foster a more inclusive digital economy.</p>
                    <p>This experience reinforced my understanding that digital transformation is ultimately about empowering people, strengthening institutions, and ensuring that technological progress creates opportunities for everyone.</p>
                  </>
                )
              },
              {
                period: "2022",
                title: "Contributing to the Global Conversation on AI Ethics",
                content: (
                  <>
                    <p className="mb-3">As artificial intelligence began reshaping societies around the world, I increasingly focused my work on understanding its ethical, social, and governance implications.</p>
                    <p className="mb-3">As an expert contributor to AIEthicsCourse.org, I provided analysis for educational content examining algorithmic bias, online harms, hate speech, and culturally grounded approaches to responsible AI. My contribution emphasized that effective AI governance cannot rely solely on technical safeguards—it must also reflect cultural diversity, social realities, and human values.</p>
                    <p>This marked the beginning of my transition from digital transformation into international AI governance.</p>
                  </>
                )
              },
              {
                period: "2023",
                title: "Measuring Responsible AI Across Africa",
                content: (
                  <>
                    <p className="mb-3">In 2023, I joined the Global Index on Responsible AI (GIRAI) as an AI Policy Researcher and Francophone Africa Lead, a role that significantly expanded my work across the African continent.</p>
                    <p className="mb-3">Working with governments, regulatory authorities, academic institutions, civil society organisations, and private-sector leaders, I assessed national AI governance readiness through one of the world's most comprehensive responsible AI benchmarking initiatives.</p>
                    <p className="mb-3">My work combined policy research with practical engagement. I conducted policy and regulatory analysis, evaluated national governance frameworks, collected qualitative and quantitative evidence, and facilitated high-level consultations with Ministries of Digital Economy, Technology, Innovation, and national regulators.</p>
                    <p className="mb-3">Beyond research, I led stakeholder engagement workshops that identified governance gaps, regulatory priorities, and opportunities for responsible AI adoption across Francophone Africa. Through digital ecosystem assessments, stakeholder mapping, and evidence-based policy recommendations, I contributed to government advisory processes supporting national AI strategies and responsible digital transformation.</p>
                    <p>This role provided invaluable insight into how different countries approach AI governance, highlighting both the shared opportunities and the unique challenges facing the Global South.</p>
                  </>
                )
              },
              {
                period: "2024",
                title: "Helping Shape Tunisia's Responsible AI Landscape",
                content: (
                  <>
                    <p className="mb-3">In 2024, I served as AI Policy Advocacy Consultant for GIZ Tunisia, supporting national and regional discussions on responsible artificial intelligence.</p>
                    <p className="mb-3">Working with policymakers, government institutions, civil society organisations, researchers, and international partners, I contributed to the development of practical recommendations for ethical AI implementation in Tunisia.</p>
                    <p className="mb-3">My work extended beyond policy advocacy. I advised on digital governance, digital policy, regulatory frameworks, institutional coordination, and digital transformation strategies while conducting policy and regulatory analysis, digital ecosystem assessments, and stakeholder mapping.</p>
                    <p>This experience strengthened my expertise in government advisory and demonstrated how responsible AI can become an integral component of national digital transformation strategies.</p>
                  </>
                )
              },
              {
                period: "2025",
                title: "Leading Research on AI Governance and Gender",
                content: (
                  <>
                    <p className="mb-3">My appointment as AI and Gender Fellow Researcher at the Global Center on AI Governance marked another important milestone in my career.</p>
                    <p className="mb-3">My research examines the intersection of artificial intelligence, gender, public policy, and digital governance within African contexts. I contribute to the implementation of the African Union Continental AI Strategy by developing evidence-based policy recommendations that promote responsible AI, digital inclusion, data governance, and women's leadership.</p>
                    <p className="mb-3">My work includes policy and regulatory analysis, stakeholder engagement, institutional capacity building, government advisory, and research supporting public sector digital transformation.</p>
                    <p>More broadly, my research explores how AI governance frameworks can reflect the realities of African societies while strengthening public institutions and protecting fundamental rights.</p>
                  </>
                )
              },
              {
                period: "2025",
                title: "Supervising Responsible AI Research Across Africa and the MENA Region",
                content: (
                  <>
                    <p className="mb-3">As Regional Supervisor (MENA & Africa) for the Global Index on Responsible AI, I oversee multidisciplinary research teams responsible for evaluating national AI governance systems across multiple countries.</p>
                    <p className="mb-3">My responsibilities include supervising research methodologies, ensuring evidence quality, supporting stakeholder engagement, and guiding assessments of transparency, accountability, explainability, and inclusion.</p>
                    <p className="mb-3">Through digital ecosystem assessments, policy analysis, stakeholder mapping, and regulatory evaluation, I help generate evidence that informs national AI strategies and supports governments in strengthening responsible digital governance.</p>
                    <p>This work allows me to contribute directly to the development of AI governance systems across diverse political, cultural, and regulatory contexts.</p>
                  </>
                )
              },
              {
                period: "2025-2026",
                title: "Educating the Next Generation of Responsible AI Leaders",
                content: (
                  <>
                    <p className="mb-3">Education has become an essential pillar of my work.</p>
                    <p className="mb-3">As Module Lead and Expert Contributor for the UNESCO–LG Global MOOC on the Ethics of AI, I developed the Human–AI Interaction module for one of UNESCO's flagship global education initiatives.</p>
                    <p className="mb-3">The course integrates international ethical standards with African and MENA perspectives, drawing on concepts such as Ubuntu and Hikma to demonstrate that responsible AI must be culturally grounded as well as technically robust.</p>
                    <p>Through this work, I have contributed to making AI ethics education more globally representative, ensuring that perspectives from Africa and the Global South become part of international conversations on AI governance.</p>
                  </>
                )
              },
              {
                period: "Present",
                title: "Advising on Artificial Intelligence and Technology-Facilitated Gender-Based Violence",
                content: (
                  <>
                    <p className="mb-3">As a member of the UNFPA Tunisia Expert Group on Technology-Facilitated Gender-Based Violence and Artificial Intelligence, I contribute technical expertise to one of the most urgent policy challenges created by emerging technologies.</p>
                    <p className="mb-3">Working alongside specialists from multiple disciplines, I support policy recommendations, expert consultations, and multi-stakeholder dialogue focused on AI governance, digital safety, women's rights, and responsible technology design.</p>
                    <p>This work reflects my broader commitment to ensuring that innovation strengthens human rights rather than undermining them, particularly for women and vulnerable communities.</p>
                  </>
                )
              },
              {
                period: "Present",
                title: "Building CHIFAA: Responsible AI for Women's Health",
                content: (
                  <>
                    <p className="mb-3">While my work with governments and international organisations has shaped policies, my most personal project is CHIFAA.</p>
                    <p className="mb-3">Founded after my own experience as a breast cancer survivor, CHIFAA is North Africa's first survivor-led AI companion designed to support women living with breast and cervical cancer.</p>
                    <p className="mb-3">The platform combines responsible AI, digital governance, ethical data governance, digital public services, and human-centred design to provide culturally grounded, multilingual support tailored to the realities of women across North Africa.</p>
                    <p className="mb-3">Beyond technology, CHIFAA represents a new model of innovation—one in which lived experience is recognised as expertise and patients become active partners in designing digital health solutions.</p>
                    <p>By bringing together clinicians, AI researchers, policymakers, survivors, and civil society organisations, CHIFAA demonstrates how inclusive governance can produce technologies that are both innovative and deeply human.</p>
                  </>
                )
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.04 }}
                className="relative flex flex-col sm:flex-row gap-3 sm:gap-0"
              >
                {/* Year — desktop left column */}
                <div className="hidden sm:flex w-[120px] flex-shrink-0 justify-end pr-8 pt-[3px]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-pink text-right leading-tight">
                    {item.period}
                  </span>
                </div>

                {/* Dot on the line */}
                <div className="hidden sm:block absolute left-[116px] top-[5px] w-[9px] h-[9px] rounded-full bg-brand-navy border-2 border-background shadow-sm" />

                {/* Content */}
                <div className="sm:pl-10 flex-1">
                  {/* Year visible on mobile */}
                  <span className="sm:hidden text-[11px] font-bold uppercase tracking-widest text-brand-pink mb-1 block">
                    {item.period}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold text-brand-navy font-serif mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-foreground/75 text-[15.5px] leading-relaxed max-w-3xl">
                    {item.content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Looking Ahead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-3xl sm:pl-[130px]"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-brand-navy mb-5">
            Looking Ahead
          </h3>
          <p className="text-foreground/75 text-[15.5px] leading-relaxed mb-4">
            My work continues through HIKMA AI, an initiative dedicated to advancing ethical, culturally grounded, and human-centred artificial intelligence inspired by the intellectual traditions of Africa and the Global South.
          </p>
          <p className="text-foreground/75 text-[15.5px] leading-relaxed mb-8">
            Across every role I have held—from youth engagement and continental policy to AI governance and public sector digital transformation—one principle has remained constant:
          </p>
          
          <blockquote className="border-l-4 border-brand-pink pl-5 sm:pl-8 py-3">
            <p className="text-lg md:text-xl font-serif italic text-foreground/85 leading-relaxed font-medium">
              &ldquo;Technology is most powerful when it strengthens institutions, expands opportunity, and serves humanity with wisdom, dignity, and justice.&rdquo;
            </p>
          </blockquote>
        </motion.div>
      </section>

      {/* ── 2. Academia Journey ──────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border bg-brand-navy/5 rounded-3xl mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-navy mb-12"
        >
          Academia Journey
        </motion.h2>

        <div className="space-y-0">
          {[
            {
              institution: "OPIT – Open Institute of Technology, Malta",
              degree: "Master of Science (MSc) in Responsible Artificial Intelligence (In Progress). Specialization: Machine Learning and AI Innovation.",
              year: "2026–Present",
            },
            {
              institution: "Stanford University, USA",
              degree: "Certificate in Ethics, Technology, and Public Policy for Practitioners",
              year: "2025",
            },
            {
              institution: "HEC Rabat, Morocco",
              degree: "Executive Master's in Cloud Computing, Cybersecurity, and Data Governance. Master's Thesis: Governance and Protection of Health Data for Women Living with Cancer in the Arab Maghreb Union (UMA): A Comparative Analysis with the General Data Protection Regulation (GDPR) Framework and Best Practice Recommendations for Secure Cloud Environments.",
              year: "2025",
            },
            {
              institution: "University of Cape Town, South Africa",
              degree: "Advanced Course in AI Policy and Ethics",
              year: "2024",
            },
            {
              institution: "CAIDP Center for AI and Digital Policy, USA",
              degree: "Fall Semester Certificate in AI Policy.",
              year: "2022",
            },
            {
              institution: "Tianjin University of Technology, China",
              degree: "Master of Science (MSc) in Applied Technology and Artificial Intelligence. Master's Thesis: The Impact of Artificial Intelligence on Surveillance Camera Systems: An Analysis of the Growth of Facial Recognition Technology.",
              year: "2016–2020",
            },
            {
              institution: "France 24 Media Center",
              degree: "Diploma in Digital Rights and Communication",
              year: "2016",
            },
            {
              institution: "Tunis High Institute of Human Sciences, Tunisia",
              degree: "Bachelor of Arts (BA) in French Literature and Civilization Specialized in 20th-century French literature and philosophy, studying the works of Jean-Paul Sartre, existentialism, l'esprit de liberté (the spirit of freedom), and the relationship between literature, ethics, and social engagement.",
              year: "2008–2012",
            },
            {
              institution: "Tunisian Institute of Technology",
              degree: "Diploma in Information Technology and Administration",
              year: "2008",
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.055 }}
              className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-border/60 py-6 last:border-0"
            >
              <span className="text-[12px] font-bold text-brand-pink uppercase tracking-widest md:w-36 flex-shrink-0">
                {item.year}
              </span>
              <div>
                <p className="font-semibold text-brand-navy font-serif text-xl leading-tight mb-2">
                  {item.institution}
                </p>
                <p className="text-foreground/75 text-[15.5px] leading-relaxed max-w-4xl">
                  {item.degree}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3. Bio & Philosophy ─────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-navy mb-12"
        >
          Bio
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-6 text-foreground/80 text-[15.5px] leading-relaxed">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="mb-4">
                Maha Jouini is an internationally recognized AI governance expert, researcher, and entrepreneur dedicated to advancing responsible, human-centered, and culturally grounded artificial intelligence. Her work bridges technology, public policy, ethics, healthcare, and sustainable development, with a particular focus on ensuring that AI reflects the realities and values of the Global South.
              </p>
              <p className="mb-4">
                She is the Founder of <strong>CHIFAA</strong>, a survivor-led responsible AI initiative developing culturally grounded AI solutions to support women affected by breast and cervical cancer across North Africa. Drawing on her own experience as a bilateral breast cancer survivor, she has transformed lived experience into innovation — demonstrating how AI can strengthen healthcare systems while preserving dignity, trust, and community.
              </p>
              <p className="mb-4">
                She is also the Founder of <strong>HIKMA AI</strong>, a platform dedicated to advancing AI governance, AI safety, and ethical AI through Arab and African perspectives. Through initiatives such as Salam AI, she promotes responsible AI systems designed to foster safer digital spaces, address online harms, and amplify the knowledge systems of the regions they serve.
              </p>
              <p className="mb-4">
                Her expertise spans AI governance, AI policy, AI safety, responsible AI, digital health, human-centered AI design, multilingual language technologies, and multi-stakeholder collaboration. She advises governments, international organizations, academic institutions, and civil society on developing AI strategies that are inclusive, trustworthy, and aligned with human rights and sustainable development.
              </p>
              <p className="mb-4">
                Maha has contributed to numerous international initiatives on AI governance and ethics, and has spoken at global conferences hosted by organizations including UNESCO, the African Union, the United Nations system, and leading academic and research institutions. She has authored research and policy publications on responsible AI, digital inclusion, and governance, with a particular focus on Africa and the Arab region.
              </p>
              <p className="mb-8">
                <strong>Beyond her work in AI, Maha is a recognized Arab storyteller and author.</strong> She has written <em>عاشقة من إفريقيا</em> (A Lover from Africa) and <em>الرقصة الأخيرة: من قرطاج إلى الصين</em> (The Last Dance: From Carthage to China). Her books are held in the official library of the Tunisian Ministry of Women and in the Tunisian National Library — a reflection of the same conviction that runs through her technical work: that wisdom, memory, and human stories are as vital to shaping the future as innovation itself.
              </p>

              <h3 className="text-2xl font-serif text-brand-navy mb-4 mt-12">From Storytelling and Poetry to AI Systems</h3>
              <p className="mb-4">
                Before algorithms, there were words. Maha Jouini's journey began not in code, but in poetry and prose — in <em>عاشقة من إفريقيا</em> and <em>الرقصة الأخيرة: من قرطاج إلى الصين</em>, where she explored identity, memory, and belonging across continents. That same instinct carried her into artificial intelligence: the belief that every system, like every story, carries a worldview — and that whoever writes it decides whose humanity is seen.
              </p>
              <p className="mb-8">
                Today, she moves fluidly between both worlds. As a novelist, she gives voice to lived experience. As an AI governance expert and founder of CHIFAA and HIKMA AI, she ensures that voice — and the wisdom of the Global South — is written into the systems shaping our future.
              </p>

              <div className="bg-brand-navy/5 p-6 rounded-xl border border-brand-navy/10 mb-12">
                <p className="mb-4">
                  Her contributions have been recognized internationally. She is the recipient of the <strong>She Shapes AI Global Award for AI Thought Leadership (2026)</strong> and was previously named among <strong>UNESCO's Top 20 Women AI Change Makers in the MENA Region</strong>. She also serves as <strong>Vice President of the Agence Francophone et Africaine de l'Intelligence Artificielle (AFRIA)</strong>.
                </p>
                <p className="mb-4">
                  Through her work — technical and literary alike — Maha advocates for a future where AI is not only advanced but socially responsible, culturally grounded, and designed to improve lives across diverse communities.
                </p>
                <blockquote className="italic font-serif text-brand-navy text-lg text-center mt-6">
                  "The future of AI will not be built by one region alone. It must be co-created by the communities it seeks to serve."
                </blockquote>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            {/* Vision */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-brand-pink" />
                <h3 className="text-xl font-semibold text-brand-navy font-serif">
                  What is my vision?
                </h3>
              </div>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-4">
                My vision is to ensure that the <strong>Global South becomes a global architect of responsible artificial intelligence</strong>, contributing not only technology and talent, but also wisdom, ethical leadership, and culturally grounded innovation.
              </p>
              <p className="text-foreground/75 leading-relaxed text-[15px]">
                I believe the future of AI should be shaped by many civilizations, languages, and knowledge systems. By bringing together science, philosophy, and public policy, I work to build AI that serves humanity, protects human dignity, and advances sustainable development for all.
              </p>
            </motion.div>

            {/* Approach */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-brand-cyan" />
                <h3 className="text-xl font-semibold text-brand-navy font-serif">
                  The Approach
                </h3>
              </div>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-4">
                Artificial intelligence is not only an engineering challenge—it is a human one.
              </p>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-4">
                My approach combines <strong>technology, ethics, philosophy, healthcare, and public policy</strong> to create AI that is trustworthy, inclusive, and rooted in the cultures and communities it serves.
              </p>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-4">
                Through <strong>CHIFAA</strong>, I transform responsible AI principles into practical healthcare solutions that empower women affected by breast and cervical cancer across North Africa.
              </p>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-4">
                Through <strong>HIKMA AI</strong>, I promote a vision inspired by the intellectual traditions of <strong>Timbuktu, Kairouan, Baghdad</strong>, and the timeless wisdom of <strong>Mawlānā Jalāl al-Dīn Rūmī</strong>, reminding us that intelligence without compassion is incomplete.
              </p>
              <p className="text-foreground/75 leading-relaxed text-[15px] mb-3 italic">
                As Rūmī wrote:
              </p>
              <blockquote className="border-l-2 border-brand-navy pl-4 italic text-[15px] text-brand-navy mb-4">
                "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself."
              </blockquote>
              <p className="text-foreground/75 leading-relaxed text-[15px]">
                I believe that the next generation of AI will not be defined solely by larger models or greater computational power, but by our ability to embed <strong>wisdom, empathy, cultural diversity, and human dignity</strong> into the systems we create.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Moonshot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <div className="bg-brand-navy rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.23L18.77 20H5.23L12 6.23z"/></svg>
            </div>
            <h3 className="text-brand-pink font-bold uppercase tracking-widest text-sm mb-6 relative z-10">Moonshot</h3>
            <p className="text-2xl md:text-3xl lg:text-4xl font-script leading-relaxed md:leading-relaxed text-white max-w-4xl mx-auto relative z-10" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
              Lived experience is not a footnote to expertise—it is expertise.<br className="hidden md:block" /> It transforms knowledge into wisdom, and innovation into impact.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
`

fs.writeFileSync('src/app/about/page.tsx', content);
