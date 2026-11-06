export const consultation = {
  title: ["Book a", "consultation"],
  lead: "Tell us what is on the table. A partner who knows your sector will read it and call at the time you choose, for a free forty-five minute conversation.",
  sizes: [
    "Under $250M",
    "$250M – $1B",
    "$1B – $5B",
    "$5B – $20B",
    "Over $20B",
    "Private equity or public sector",
  ],
  timings: ["As soon as possible", "This quarter", "In the next six months", "Just exploring"],
  /** Call slots offered on each working day, in the visitor's local time. */
  slots: ["09:00", "10:30", "13:00", "14:30", "16:00"],
  /** Working days ahead shown in the date picker. */
  days: 10,
  next: [
    { title: "We read it", body: "A partner in your sector reviews your note the same day." },
    {
      title: "We call you",
      body: "Forty-five minutes at the time you chose, with no slides and no sales pitch.",
    },
    {
      title: "You get a view",
      body: "A one-page note on how we would approach it, whether or not you hire us.",
    },
  ],
  faq: [
    {
      question: "Is the first conversation really free?",
      answer:
        "Yes. The first call and the one-page note that follows are on us, with no obligation to go further.",
    },
    {
      question: "Will what I share stay confidential?",
      answer:
        "Always. We will sign your NDA before the call if you prefer, and we never discuss one client's business with another.",
    },
    {
      question: "Who will I speak to?",
      answer:
        "A partner from the practice and sector closest to your question, never a business development team.",
    },
  ],
};
