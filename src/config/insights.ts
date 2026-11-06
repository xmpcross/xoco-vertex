/** The kinds of insight. The key is the URL segment and the `type` in frontmatter. */
export const insightTypes = {
  articles: {
    label: "Articles",
    one: "Article",
    description: "Points of view from our partners on the questions boards are asking.",
  },
  reports: {
    label: "Reports",
    one: "Report",
    description: "Research and benchmarks, free to download.",
  },
  events: {
    label: "Events",
    one: "Event",
    description: "Roundtables, briefings and webinars for senior leaders.",
  },
} as const;

export type InsightType = keyof typeof insightTypes;
export const insightTypeKeys = Object.keys(insightTypes) as [InsightType, ...InsightType[]];

/** Entries per archive page. The first page also holds the lead entry. */
export const pageSize = 9;
