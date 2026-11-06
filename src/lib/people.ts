import { getCollection, type CollectionEntry } from "astro:content";
import { peopleGroups } from "@/config/people";

export type Person = CollectionEntry<"people">;

/** Everyone, in group order, then by `order` and name. */
export async function getPeople() {
  const people = await getCollection("people");
  return people.sort(
    (a, b) =>
      peopleGroups.indexOf(a.data.group) - peopleGroups.indexOf(b.data.group) ||
      a.data.order - b.data.order ||
      a.data.name.localeCompare(b.data.name),
  );
}

export const peopleById = (people: Person[]) =>
  new Map(people.map((person) => [person.id, person]));

export const personHref = (person: Person | string) =>
  `/people/${typeof person === "string" ? person : person.id}/`;

export const peopleFor = (people: Person[], key: "industries" | "services", id: string) =>
  people.filter((person) => person.data[key].some((ref) => ref.id === id));
