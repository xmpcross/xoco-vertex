import { getCollection, type CollectionEntry } from "astro:content";
import { insightTypes, type InsightType } from "@/config/insights";
import { formatDate, joinNames } from "@/lib/format";
import type { Person } from "@/lib/people";
import type { SearchItem } from "@/lib/search";

export type Insight = CollectionEntry<"insights">;

export const insightHref = (entry: Insight | string) =>
  `/insights/${typeof entry === "string" ? entry : entry.id}/`;
export const typeHref = (type: InsightType) => `/insights/type/${type}/`;
export const typeLabel = (type: InsightType) => insightTypes[type].label;
export const typeOne = (type: InsightType) => insightTypes[type].one;

const byNewest = (a: Insight, b: Insight) => b.data.date.getTime() - a.data.date.getTime();

/** Published entries, newest first. Drafts never leave the dev server. */
export async function getInsights() {
  const entries = await getCollection("insights", ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort(byNewest);
}

/** Events that have not started yet at build time, soonest first. */
export const upcomingEvents = (entries: Insight[], now = new Date()) =>
  entries
    .filter((entry) => entry.data.event && entry.data.event.start > now)
    .sort((a, b) => a.data.event!.start.getTime() - b.data.event!.start.getTime());

/** The featured entry if one is flagged, the newest otherwise. */
export const leadEntry = (entries: Insight[]) =>
  entries.find((entry) => entry.data.featured) ?? entries[0];

export const authorsOf = (entry: Insight, people: Map<string, Person>) =>
  entry.data.authors
    .map((ref) => people.get(ref.id))
    .filter((person): person is Person => person !== undefined);

export const insightsFor = (entries: Insight[], key: "industries" | "services", id: string) =>
  entries.filter((entry) => entry.data[key].some((ref) => ref.id === id));

export const insightsBy = (entries: Insight[], personId: string) =>
  entries.filter((entry) => entry.data.authors.some((ref) => ref.id === personId));

/** Same type first, then the newest of the rest. */
export const relatedEntries = (entry: Insight, entries: Insight[], count = 3) => {
  const others = entries.filter((other) => other.id !== entry.id);
  const same = others.filter((other) => other.data.type === entry.data.type);
  const rest = others.filter((other) => other.data.type !== entry.data.type);
  return [...same, ...rest].slice(0, count);
};

/** Roughly 230 words a minute. */
export const readingTime = (body = "") =>
  Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 230));

export const searchItems = (entries: Insight[], people: Map<string, Person>): SearchItem[] =>
  entries.map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    href: insightHref(entry),
    category: typeOne(entry.data.type),
    author: joinNames(authorsOf(entry, people).map((person) => person.data.name)),
    date: formatDate(entry.data.date),
    tags: [
      ...entry.data.industries.map((ref) => ref.id),
      ...entry.data.services.map((ref) => ref.id),
    ],
  }));
