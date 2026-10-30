import { NextResponse } from "next/server";
import { processContact } from "@/lib/form-handlers";
import { clientIp, readJsonBody } from "@/lib/forms";
import { createEntry } from "@/lib/strapi-server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const parsed = await readJsonBody(request);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: parsed.status });

  const result = await processContact({
    body: parsed.body,
    ip: clientIp(request.headers),
    create: (data) => createEntry("contact-messages", data),
  });
  return NextResponse.json(result.body, { status: result.status, headers: result.headers });
}
