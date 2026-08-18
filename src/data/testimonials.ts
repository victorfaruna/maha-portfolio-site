// PLACEHOLDER — awaiting real testimonials from Maha. Replace name/title/quote fields before launch.

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Maha brought clarity and depth to a conversation the room badly needed. Her ability to connect policy with lived experience left a lasting impression on every attendee.",
    name: "Placeholder Name",
    title: "Conference Organizer, [Event Name]",
  },
  {
    id: "test-2",
    quote:
      "Her keynote reframed how our team thinks about AI governance in emerging markets. Direct, well-researched, and genuinely moving.",
    name: "Placeholder Name",
    title: "Program Director, [Organization]",
  },
  {
    id: "test-3",
    quote:
      "One of the most compelling speakers we've hosted — she makes complex policy accessible without losing its urgency.",
    name: "Placeholder Name",
    title: "Panel Moderator, [Summit Name]",
  },
];
