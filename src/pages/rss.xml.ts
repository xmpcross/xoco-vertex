import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { joinNames } from "@/lib/format";
import { authorsOf, getInsights, insightHref, typeOne } from "@/lib/insights";
import { getPeople, peopleById } from "@/lib/people";

export const GET: APIRoute = async () => {
  const entries = await getInsights();
  const people = peopleById(await getPeople());
  return rss({
    title: `${siteConfig.name} insights`,
    description: siteConfig.description,
    site: siteConfig.siteUrl,
    items: entries.slice(0, 20).map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: insightHref(entry),
      categories: [typeOne(entry.data.type)],
      author: `${siteConfig.email} (${joinNames(authorsOf(entry, people).map((person) => person.data.name))})`,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
};
