/**
 * CENTRAL WEDDING CONFIGURATION
 * Every editable detail of the invitation lives here.
 * Temporary placeholder details (couple initials: S & N).
 * Replace the values below with the real wedding details.
 */

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  icon: "crescent" | "rings" | "lantern" | "dinner";
};

export const wedding = {
  bride: {
    firstName: "Sophia",
    fullName: "Sophia Laurent",
    parents: "Daughter of Mr. Henry Laurent & Mrs. Clara Laurent",
  },

  groom: {
    firstName: "Nathaniel",
    fullName: "Nathaniel Hayes",
    parents: "Son of Mr. Richard Hayes & Mrs. Eleanor Hayes",
  },

  initials: "S & N",

  /** Human readable date + time */
  date: "Saturday, 12 June 2027",

  dayName: "Saturday",
  dayNumber: "12",
  monthName: "June",
  year: "2027",

  time: "5:00 PM onwards",

  /** Used by countdown + calendar */
  dateISO: "2027-06-12T17:00:00",
  endISO: "2027-06-12T23:00:00",

  welcomeLine: "Together with our families",

  welcomeTitle: "Wedding Ceremony",

  welcomeJoin: "of",

  venue: {
    name: "Villa Bellavista",
    address: "Via Regina 24, Tremezzina, Lake Como, Lombardy 22016, Italy",
    mapsQuery: "Villa Bellavista, Tremezzina, Lake Como, Italy",
  },

  events: [
    {
      id: "welcome",
      title: "Welcome Aperitivo",
      date: "Friday, 11 June 2027",
      time: "7:00 PM",
      venue: "Villa Bellavista, Lakeside Garden",
      icon: "lantern",
    },

    {
      id: "ceremony",
      title: "Wedding Ceremony",
      date: "Saturday, 12 June 2027",
      time: "5:00 PM",
      venue: "Villa Bellavista, Rose Terrace",
      icon: "crescent",
    },

    {
      id: "reception",
      title: "Dinner & Reception",
      date: "Saturday, 12 June 2027",
      time: "6:30 PM",
      venue: "Villa Bellavista, Grand Salon",
      icon: "rings",
    },

    {
      id: "brunch",
      title: "Farewell Brunch",
      date: "Sunday, 13 June 2027",
      time: "11:00 AM",
      venue: "Villa Bellavista, Orangery",
      icon: "dinner",
    },
  ] satisfies WeddingEvent[],

  dressCode: {
    description:
      "We invite you to celebrate with us in refined attire inspired by soft, romantic tones of burgundy, blush and sage.",

    colors: [
      {
        name: "Ivory",
        hex: "#F8F3E9",
      },
      {
        name: "Champagne",
        hex: "#D9C19C",
      },
      {
        name: "Dusty Rose",
        hex: "#CFA6A3",
      },
      {
        name: "Burgundy",
        hex: "#6B2637",
      },
      {
        name: "Sage",
        hex: "#A8B09A",
      },
      {
        name: "Charcoal",
        hex: "#4A4A4C",
      },
      {
        name: "Soft Taupe",
        hex: "#B8A590",
      },
    ],
  },

  invitationMessage:
    "With hearts full of joy and gratitude, together with our families, we warmly invite you to celebrate the beginning of our new chapter and share in the laughter, love and beautiful memories of our special day.",

  quote:
    "“I have found the one whom my soul loves.” — Song of Solomon 3:4",

  guestInformation: [
    {
      title: "Arrival",
      body: "We kindly request our guests to be seated at least 15 minutes before the ceremony begins.",
    },

    {
      title: "Dress Code",
      body: "Elegant formal attire in soft burgundy, blush, sage, champagne and neutral tones is warmly encouraged.",
    },

    {
      title: "Family",
      body: "Children are warmly welcome at the ceremony and brunch. The evening reception is for guests aged 12 and over.",
    },

    {
      title: "Parking",
      body: "Valet parking will be available at the villa entrance. Our team will be on hand to guide you on arrival.",
    },

    {
      title: "Photography",
      body: "We invite you to be fully present with us during the ceremony. Kindly keep phones away until after the vows.",
    },

    {
      title: "Gifts",
      body: "Your presence is the greatest gift we could ask for.",
    },
  ],

  /** Optional background music */
  musicSrc: "",

  footer: {
    signOff: "With Love & Gratitude,",
    thanks:
      "We cannot wait to celebrate this beautiful beginning with you.",
  },
} as const;

export type Wedding = typeof wedding;