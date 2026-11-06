import type { APIRoute } from "astro";
import { getInsights, searchItems } from "@/lib/insights";
import { getPeople, peopleById } from "@/lib/people";

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(searchItems(await getInsights(), peopleById(await getPeople()))), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
