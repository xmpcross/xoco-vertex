import { getCollection, type CollectionEntry } from "astro:content";

export type Service = CollectionEntry<"services">;
export type Industry = CollectionEntry<"industries">;
export type Case = CollectionEntry<"work">;

const byOrder = <T extends { data: { order: number; title: string } }>(a: T, b: T) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export const getServices = async () => (await getCollection("services")).sort(byOrder);
export const getIndustries = async () => (await getCollection("industries")).sort(byOrder);

/** Featured first, then by `order`, then newest. */
export const getWork = async () =>
  (await getCollection("work")).sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.order - b.data.order ||
      b.data.year - a.data.year,
  );

export const serviceHref = (service: Service | string) =>
  `/services/${typeof service === "string" ? service : service.id}/`;
export const industryHref = (industry: Industry | string) =>
  `/industries/${typeof industry === "string" ? industry : industry.id}/`;
export const caseHref = (item: Case | string) =>
  `/work/${typeof item === "string" ? item : item.id}/`;

export const casesForService = (cases: Case[], id: string) =>
  cases.filter((item) => item.data.services.some((ref) => ref.id === id));
export const casesForIndustry = (cases: Case[], id: string) =>
  cases.filter((item) => item.data.industry.id === id);
