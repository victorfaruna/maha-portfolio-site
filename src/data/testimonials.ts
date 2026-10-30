// Preview content only. Published dashboard entries replace these examples automatically.

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar?: string;
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Maha brought clarity and depth to a conversation the room badly needed. Her ability to connect policy with lived experience left a lasting impression on every attendee.",
    name: "Sample conference organiser",
    title: "Example only — not a real endorsement",
    isPlaceholder: true,
  },
  {
    id: "test-2",
    quote:
      "Her keynote reframed how our team thinks about AI governance in emerging markets. Direct, well-researched, and genuinely moving.",
    name: "Sample programme director",
    title: "Example only — not a real endorsement",
    isPlaceholder: true,
  },
  {
    id: "test-3",
    quote:
      "One of the most compelling speakers we've hosted — she makes complex policy accessible without losing its urgency.",
    name: "Sample panel moderator",
    title: "Example only — not a real endorsement",
    isPlaceholder: true,
  },
];
