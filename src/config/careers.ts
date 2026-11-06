export const careers = {
  title: ["Do the best work", "of your career"],
  lead: "We hire curious people who like hard problems and care whether the answer works once we leave. You will learn fast, work close to partners, and see your recommendations land.",
  paths: [
    {
      icon: "compass",
      title: "Consulting",
      body: "Associates, consultants and engagement managers who run the work day to day, from first analysis to the board meeting.",
      entry: "Graduates, MBAs and experienced hires",
    },
    {
      icon: "sparkles",
      title: "Experts",
      body: "Data scientists, operators and sector specialists who bring depth the generalist team cannot, and lead the parts of a project that need it.",
      entry: "Five or more years in industry or analytics",
    },
    {
      icon: "building-2",
      title: "Firm services",
      body: "Research, design, finance, recruiting and IT. The people who keep a partnership of 380 running and give our consultants their edge.",
      entry: "All levels",
    },
  ],
  benefits: [
    { value: "40", label: "Training days a year, from your first month" },
    { value: "1:4", label: "Partners to consultants on every team" },
    { value: "6 wks", label: "Paid sabbatical after four years" },
    { value: "2 days", label: "Home days a week, whatever your level" },
  ],
  process: [
    {
      title: "Apply",
      body: "A CV and two short questions. No cover letter, and a person reads every application.",
    },
    {
      title: "First conversation",
      body: "Thirty minutes with a consultant about your experience and what you want next.",
    },
    {
      title: "Case interviews",
      body: "Two interviews on real problems from our work. We care how you think, not whether you reach our answer.",
    },
    {
      title: "Partner meeting",
      body: "A conversation with the partner you would work with, and an offer within a week.",
    },
  ],
};

export interface Role {
  title: string;
  team: "Consulting" | "Experts" | "Firm services";
  /** An office id from `src/config/offices.ts`. */
  office: string;
  type: "Full time" | "Internship";
  /** Where the apply button goes. Replace the demo links with your own. */
  applyUrl: string;
}

export const roles: Role[] = [
  {
    title: "Associate, Strategy & Growth",
    team: "Consulting",
    office: "new-york",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Engagement Manager, Operations",
    team: "Consulting",
    office: "london",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Consultant, Financial Services",
    team: "Consulting",
    office: "zurich",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Summer Associate, 2027",
    team: "Consulting",
    office: "new-york",
    type: "Internship",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Senior Data Scientist",
    team: "Experts",
    office: "london",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Expert, Energy Transition",
    team: "Experts",
    office: "singapore",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Expert, Pricing & Revenue",
    team: "Experts",
    office: "new-york",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Research Analyst",
    team: "Firm services",
    office: "singapore",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
  {
    title: "Visual Designer, Client Materials",
    team: "Firm services",
    office: "london",
    type: "Full time",
    applyUrl: "https://example.com/apply",
  },
];
