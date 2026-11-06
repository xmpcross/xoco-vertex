export const siteConfig = {
  name: "Vertex",
  /** The firm's full name, used in the footer and the legal pages. */
  legalName: "Vertex Advisory Partners LLP",
  tagline: "Strategy and management consulting",
  title: "Vertex - An Astro theme for consulting and advisory firms",
  description:
    "Vertex is an independent strategy and management consultancy. We work with leadership teams on the decisions that set the course of a business, and stay until the results show.",
  siteUrl: "https://vertex.xocoweb.workers.dev",
  language: "en",
  locale: "en_US",
  dateLocale: "en-US",
  socialImage: "/og-image.png",
  email: "hello@example.com",
  phone: "+1 212 000 0140",
  /** The calls to action in the header, the mobile menu and the closing panels. */
  actions: {
    primary: { label: "Book a consultation", href: "/consultation/" },
    secondary: { label: "See our work", href: "/work/" },
  },
  /** The bar above the header. It shows the next upcoming event, if there is one. */
  announcement: {
    enabled: true,
    cta: "Request a seat",
  },
  /** The consultation request form. It stays disabled until `enabled` is true and `action` is set. */
  consultation: {
    enabled: false,
    action: "",
    method: "post",
  },
  /** The contact page form. It stays disabled until `enabled` is true and `action` is set. */
  contact: {
    enabled: false,
    action: "",
    method: "post",
  },
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    title: "The Vertex Brief",
    description: "One idea worth a board's time, from our partners, twice a month.",
  },
  /** The small print at the foot of every page. Leave empty to remove it. */
  legal:
    "Vertex Advisory Partners LLP is a fictional firm used to demonstrate this theme. Its people, clients, engagements and figures are invented.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
  ],
};

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

/**
 * The main navigation. `menu` opens a panel: `services` and `industries` list their
 * collection, `insights` shows the types and the latest entries, and `firm` shows
 * `firmMenu`.
 */
export type NavItem = NavLink & { menu?: "services" | "industries" | "insights" | "firm" };

export const navigation: NavItem[] = [
  { label: "Services", href: "/services/", menu: "services" },
  { label: "Industries", href: "/industries/", menu: "industries" },
  { label: "Our work", href: "/work/" },
  { label: "Insights", href: "/insights/", menu: "insights" },
  { label: "Firm", href: "/about/", menu: "firm" },
];

export const firmMenu: NavLink[] = [
  { label: "About Vertex", href: "/about/", description: "How we work and what we believe" },
  { label: "People", href: "/people/", description: "Partners and senior advisors" },
  { label: "Careers", href: "/careers/", description: "Open roles in four offices" },
  { label: "Contact", href: "/contact/", description: "Offices, press and general inquiries" },
];

export const footerNavigation: NavColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Strategy & Growth", href: "/services/strategy-growth/" },
      { label: "Operations & Performance", href: "/services/operations-performance/" },
      { label: "Digital & AI", href: "/services/digital-ai/" },
      { label: "Transformation & Change", href: "/services/transformation/" },
      { label: "Mergers & Acquisitions", href: "/services/mergers-acquisitions/" },
      { label: "People & Organization", href: "/services/people-organization/" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Financial services", href: "/industries/financial-services/" },
      { label: "Healthcare & life sciences", href: "/industries/healthcare-life-sciences/" },
      { label: "Energy & utilities", href: "/industries/energy-utilities/" },
      { label: "Industrials", href: "/industries/industrials/" },
      { label: "Consumer & retail", href: "/industries/consumer-retail/" },
      { label: "Technology & media", href: "/industries/technology-media/" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "All insights", href: "/insights/" },
      { label: "Articles", href: "/insights/type/articles/" },
      { label: "Reports", href: "/insights/type/reports/" },
      { label: "Events", href: "/insights/type/events/" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "About", href: "/about/" },
      { label: "Our work", href: "/work/" },
      { label: "People", href: "/people/" },
      { label: "Careers", href: "/careers/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

/** The small links under the footer. */
export const legalNavigation: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy/" },
  { label: "Terms of use", href: "/legal/terms/" },
];
