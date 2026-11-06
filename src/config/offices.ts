export interface Office {
  /** Referenced by people as `office`. */
  id: string;
  city: string;
  country: string;
  address: string[];
  phone: string;
  email: string;
  /** IANA time zone, for the local time on the contact page and in the footer. */
  timeZone: string;
  hq?: boolean;
}

export const offices: Office[] = [
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    address: ["400 Park Avenue South, 18th floor", "New York, NY 10016"],
    phone: "+1 212 000 0140",
    email: "newyork@example.com",
    timeZone: "America/New_York",
    hq: true,
  },
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    address: ["22 Bishopsgate, Level 31", "London EC2N 4BQ"],
    phone: "+44 20 0000 0140",
    email: "london@example.com",
    timeZone: "Europe/London",
  },
  {
    id: "zurich",
    city: "Zurich",
    country: "Switzerland",
    address: ["Bahnhofstrasse 64", "8001 Zürich"],
    phone: "+41 44 000 01 40",
    email: "zurich@example.com",
    timeZone: "Europe/Zurich",
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    address: ["8 Marina View, #29-01", "Singapore 018960"],
    phone: "+65 6000 0140",
    email: "singapore@example.com",
    timeZone: "Asia/Singapore",
  },
];

export const officeById = (id: string) => offices.find((office) => office.id === id);
