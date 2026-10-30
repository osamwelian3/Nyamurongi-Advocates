import { NextResponse } from "next/server";
import { processTestimonial } from "@/lib/form-handlers";
import { clientIp, readJsonBody } from "@/lib/forms";
import { createEntry } from "@/lib/strapi-server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.status });

  const result = await processTestimonial({
    body: parsed.body,
    ip: clientIp(request.headers),
    // Arrives in Strapi as `pending`: the model's beforeCreate hook forces it,
    // and nothing is shown publicly until an admin approves it.
    create: (data) => createEntry("testimonials", data),
  });
  return NextResponse.json(result.body, { status: result.status, headers: result.headers });
}
