import axios from "axios";
import { normalizeBaseUrl } from "@/lib/url";

/**
 * SERVER-ONLY. Creates entries in Strapi using STRAPI_FORMS_TOKEN, which is
 * deliberately NOT a NEXT_PUBLIC_ variable: it is never sent to a browser.
 * Only the route handlers under src/app/api import this file.
 *
 * The token should be a *Custom* Strapi API token that can only `create`
 * Contact Message and Testimonial entries — nothing else (see
 * FORMS-SETUP.md). Even if it leaked, it could not read or change content.
 */
export async function createEntry(pluralName, data) {
  const token = process.env.STRAPI_FORMS_TOKEN;
  if (!token) throw new Error("STRAPI_FORMS_TOKEN is not set on the server");

  const client = axios.create({
    baseURL: `${normalizeBaseUrl(process.env.NEXT_PUBLIC_STRAPI_URL)}/api`,
    headers: { Authorization: `Bearer ${token}` },
    timeout: 10000,
  });

  try {
    const res = await client.post(`/${pluralName}`, { data });
    return res.data;
  } catch (err) {
    const detail = err.response?.data?.error?.message;
    const status = err.response?.status;
    throw new Error(`${status ?? err.code ?? "network error"}${detail ? `: ${detail}` : ""}`);
  }
}
