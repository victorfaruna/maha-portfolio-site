export const principles = [
  "Human dignity at the centre",
  "Ethics, transparency and accountability",
  "Cultural context, inclusion and equity",
] as const;

export const services = [
  {
    id: "strategy",
    number: "01",
    title: "AI Adoption & Strategy",
    description:
      "Helping organizations understand where AI creates value and how to adopt it responsibly.",
    items: [
      "AI readiness assessment",
      "Use-case identification",
      "AI adoption roadmaps",
      "Responsible tool selection",
      "Implementation guidance",
    ],
  },
  {
    id: "governance",
    number: "02",
    title: "Responsible AI & Governance",
    description:
      "Turning ethical principles into practical governance and safeguards.",
    items: [
      "AI policies and ethical guidelines",
      "Risk and impact assessments",
      "Safeguards and accountability",
      "Governance frameworks",
      "Transparency and fairness",
    ],
  },
  {
    id: "advisory",
    number: "03",
    title: "Advisory & Mentorship",
    description:
      "Supporting leaders, teams and innovators to build responsible and impactful AI initiatives.",
    items: [
      "Strategic advisory",
      "Project mentorship",
      "Capacity building",
      "Responsible innovation",
      "AI leadership support",
    ],
  },
] as const;

export const initiatives = [
  {
    id: "chifaa",
    number: "01",
    name: "CHIFAA",
    category: "Health & advocacy",
    title: "AI for Cancer Care & Advocacy",
    description:
      "A survivor-led AI and digital health initiative supporting women affected by breast and cervical cancer in North Africa.",
    items: [
      "Multilingual AI companion",
      "Trusted information and support",
      "Patient voices and advocacy",
      "Privacy, safety and dignity at the core",
    ],
    logo: "/images/chifaa.jpeg",
    logoAlt: "CHIFAA butterfly and wordmark",
    href: "https://www.chifaa.org/",
    cta: "Explore CHIFAA",
  },
  {
    id: "hikma",
    number: "02",
    name: "HIKMA AI",
    category: "Knowledge & dialogue",
    title: "Beyond Intelligence, Towards Wisdom",
    description:
      "A platform exploring responsible AI through African, Arab and Global South perspectives.",
    items: [
      "AI ethics and philosophy",
      "Research and thought leadership",
      "Dialogue and knowledge sharing",
      "Culturally grounded innovation",
    ],
    logo: "/images/hikmaa.png",
    logoAlt: "HIKMA AI Arabic and English wordmark",
    href: "https://hikmaai.org/",
    cta: "Explore HIKMA AI",
  },
  {
    id: "carthage",
    number: "03",
    name: "Carthage Bill",
    category: "Ethics & governance",
    title: "Carthage Bill for AI Ethics",
    description:
      "An ethical AI framework rooted in dignity, inclusion, and technological sovereignty, ensuring AI serves the public good with fairness, transparency, and responsibility. It promotes ethical governance, cross-civilizational dialogue, and international cooperation in AI research and innovation.",
    items: [
      "Human rights and dignity as core principles",
      "Inclusion, equity, and fairness",
      "Accountability, transparency, and oversight",
      "Technological sovereignty for the public good",
    ],
    // Same original as Downloads/awards and fellowship/cartage bill logo.jpeg.
    logo: "/images/carthagebillicon.jpeg",
    logoAlt: "The Carthage Bill for Responsible Artificial Intelligence logo",
  },
] as const;
