/**
 * CENTRAL WEDDING CONFIGURATION
 * Every editable detail of the invitation lives here.
 * Temporary placeholder details (couple initials: A & B).
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
    firstName: "Amelia",
    fullName: "Amelia Anderson",
    parents: "Daughter of Mr. Arthur Anderson & Mrs. Alice Anderson",
  },

  groom: {
    firstName: "Benjamin",
    fullName: "Benjamin Brooks",
    parents: "Son of Mr. Bernard Brooks & Mrs. Beatrice Brooks",
  },

  initials: "A & B",

  /** Human readable date + time */
  date: "Saturday, 15 May 2027",

  dayName: "Saturday",
  dayNumber: "15",
  monthName: "May",
  year: "2027",

  time: "4:00 PM onwards",

  /** Used by countdown + calendar */
  dateISO: "2027-05-15T16:00:00",
  endISO: "2027-05-15T22:00:00",

  welcomeLine: "Together with our families",

  welcomeTitle: "Wedding Ceremony",

  welcomeJoin: "of",

  venue: {
    name: "The Aurelia Bay Estate",
    address: "Lakeview Road, Kakkanad, Kochi, Kerala 682030",
    mapsQuery: "The Aurelia Bay Estate, Kakkanad, Kochi",
  },

  events: [
    {
      id: "welcome",
      title: "Welcome Drinks",
      date: "Friday, 14 May 2027",
      time: "6:30 PM",
      venue: "The Aurelia Bay Estate, Lawn",
      icon: "lantern",
    },

    {
      id: "ceremony",
      title: "Wedding Ceremony",
      date: "Saturday, 15 May 2027",
      time: "4:00 PM",
      venue: "The Aurelia Bay Estate",
      icon: "crescent",
    },

    {
      id: "reception",
      title: "Reception",
      date: "Saturday, 15 May 2027",
      time: "5:30 PM",
      venue: "The Aurelia Bay Estate, Ballroom",
      icon: "rings",
    },

    {
      id: "brunch",
      title: "Farewell Brunch",
      date: "Sunday, 16 May 2027",
      time: "10:30 AM",
      venue: "The Aurelia Bay Estate, Terrace",
      icon: "dinner",
    },
  ] satisfies WeddingEvent[],

  dressCode: {
    description:
      "We invite you to celebrate with us in elegant attire inspired by soft, romantic and earthy tones.",

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
        name: "Mauve",
        hex: "#A8808A",
      },
      {
        name: "Sage",
        hex: "#A8B09A",
      },
      {
        name: "Warm Brown",
        hex: "#7A5A48",
      },
    ],
  },

  invitationMessage:
    "With immense joy and gratitude, together with our families, we warmly invite you to celebrate the beginning of our forever and share in the laughter, love and beautiful memories of our special day.",

  quote:
    "“Whatever our souls are made of, his and mine are the same.” — Emily Brontë",

  guestInformation: [
    {
      title: "Arrival",
      body: "We kindly request our guests to arrive at least 20 minutes before the ceremony begins.",
    },

    {
      title: "Dress Code",
      body: "Elegant semi-formal attire in soft earthy, burgundy, champagne and neutral tones is warmly encouraged.",
    },

    {
      title: "Family",
      body: "Families and children are warmly welcome to join us in celebrating this beautiful occasion.",
    },

    {
      title: "Parking",
      body: "Complimentary guest parking will be available at the venue. Venue staff will be present to assist you on arrival.",
    },

    {
      title: "Photography",
      body: "We would love for you to enjoy the ceremony with us. Kindly avoid flash photography during the vows.",
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
      "We look forward to celebrating this beautiful beginning with you.",
  },
} as const;

export type Wedding = typeof wedding;