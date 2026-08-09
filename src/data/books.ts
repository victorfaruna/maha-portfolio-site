export type Book = {
  id: string;
  titleAr: string;
  titleEn: string;
  description: string;
  image: string;
  link: string;
  year?: string;
  publisher?: string;
};

export const books: Book[] = [
  {
    id: "book-1",
    titleAr: "عاشقة من إفريقيا",
    titleEn: "A Lover from Africa",
    description: "A deeply evocative narrative exploring identity, heritage, and the cultural bonds uniting African literature and human story-telling.",
    image: "/images/mahaholdingbook.jpeg",
    link: "#",
    year: "2018",
    publisher: "African Literary Press",
  },
  {
    id: "book-2",
    titleAr: "الرقصة الأخيرة: من قرطاج إلى الصين",
    titleEn: "The Last Dance: From Carthage to China",
    description: "An extraordinary journey connecting North African heritage with East Asian culture, reflecting on cross-continental dialogue and personal transformation.",
    image: "/images/booksimages.jpeg",
    link: "#",
    year: "2021",
    publisher: "Carthage Global Editions",
  },
];
