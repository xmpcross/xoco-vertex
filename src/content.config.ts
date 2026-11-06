import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { insightTypeKeys } from "@/config/insights";
import { peopleGroups } from "@/config/people";

/** Entries live in a folder each, so the folder name is the id that references use. */
const folderId = ({ entry }: { entry: string }) => entry.replace(/\/index\.mdx?$/, "");
const folders = (base: string) => glob({ base, pattern: "*/index.{md,mdx}", generateId: folderId });

const figure = z.object({ value: z.string(), label: z.string() });
const point = z.object({ title: z.string(), body: z.string() });
const credit = z.object({ name: z.string(), url: z.url() });

/** One folder per service: `index.md` with the overview, beside its cover photo. */
const services = defineCollection({
  loader: folders("./src/content/services"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One line, used on cards and in the menu. */
      summary: z.string().max(110),
      description: z.string().min(40).max(220),
      /** A Lucide icon name from `src/icons/lucide`. */
      icon: z.string(),
      cover: image(),
      coverAlt: z.string(),
      /** Typical results, shown in the hero and the menu. */
      outcomes: z.array(figure).max(3).default([]),
      /** The questions a client brings, one line each. */
      questions: z.array(z.string()).max(6).default([]),
      /** What the practice offers. */
      offerings: z.array(point).default([]),
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
      /** Lower comes first. */
      order: z.number().default(100),
    }),
});

/** One folder per industry: `index.md`, beside its cover photo. */
const industries = defineCollection({
  loader: folders("./src/content/industries"),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(110),
      description: z.string().min(40).max(220),
      icon: z.string(),
      cover: image(),
      coverAlt: z.string(),
      figures: z.array(figure).max(3).default([]),
      /** What is changing in the sector. */
      shifts: z.array(point).default([]),
      /** Services by folder name, in the order they should appear. */
      services: z.array(reference("services")).default([]),
      order: z.number().default(100),
    }),
});

/** One folder per person: `index.md` holding the bio, beside the portrait. */
const people = defineCollection({
  loader: folders("./src/content/people"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      group: z.enum(peopleGroups),
      portrait: image(),
      /** An office id from `src/config/offices.ts`. */
      office: z.string(),
      /** One line on what they work on. */
      focus: z.string().max(120),
      email: z.email().optional(),
      linkedin: z.url().optional(),
      industries: z.array(reference("industries")).default([]),
      services: z.array(reference("services")).default([]),
      /** Lower comes first within a group. */
      order: z.number().default(100),
    }),
});

/** One folder per case study. The body tells the story. */
const work = defineCollection({
  loader: folders("./src/content/work"),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(90),
      /** Clients stay anonymous, described in a few words. */
      client: z.string(),
      description: z.string().min(40).max(220),
      cover: image(),
      coverAlt: z.string(),
      /** The headline result first; it is the one printed on cards. */
      results: z.array(figure).min(1).max(4),
      industry: reference("industries"),
      services: z.array(reference("services")).min(1),
      team: z.array(reference("people")).default([]),
      duration: z.string(),
      year: z.number(),
      quote: z.object({ text: z.string(), role: z.string() }).optional(),
      featured: z.boolean().default(false),
      order: z.number().default(100),
    }),
});

/** Articles, reports and events. One folder per entry, with any cover beside it. */
const insights = defineCollection({
  loader: folders("./src/content/insights"),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().max(110),
        description: z.string().min(40).max(220),
        date: z.coerce.date(),
        updated: z.coerce.date().optional(),
        type: z.enum(insightTypeKeys),
        /** People by folder name. The first is the lead author or host. */
        authors: z.array(reference("people")).min(1),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        coverCredit: credit.optional(),
        industries: z.array(reference("industries")).default([]),
        services: z.array(reference("services")).default([]),
        /** Reports: the headline findings and the file to download. */
        report: z
          .object({
            pages: z.number(),
            file: z.string(),
            findings: z.array(figure).max(3).default([]),
          })
          .optional(),
        /** Events: when and where. `start` is an ISO date-time with its offset. */
        event: z
          .object({
            start: z.coerce.date(),
            end: z.coerce.date().optional(),
            venue: z.string(),
            city: z.string(),
            format: z.enum(["In person", "Online", "Hybrid"]),
            registerUrl: z.url().optional(),
          })
          .optional(),
        /** Pins the entry to the lead slot on the insights index. */
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      })
      .refine((data) => !data.cover || data.coverAlt, {
        message: "Add `coverAlt` to describe the cover",
        path: ["coverAlt"],
      })
      .refine((data) => data.type !== "events" || data.event, {
        message: "Events need an `event` block",
        path: ["event"],
      })
      .refine((data) => data.type !== "reports" || data.report, {
        message: "Reports need a `report` block",
        path: ["report"],
      }),
});

export const collections = { services, industries, people, work, insights };
