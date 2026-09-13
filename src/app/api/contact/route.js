import { NextResponse } from "next/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, subject, message } = body || {};

  if (!name?.trim() || !email?.trim() || !subject?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and subject are required." },
      { status: 400 }
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // --- Plug in a real email/notification service here -----------------
  // e.g. Resend, Postmark, or SMTP via Nodemailer, sending to
  // info@nyamurongiadvocates.local. Keeping this as a clearly-marked stub
  // since it requires real credentials you'll want to set as env vars
  // (RESEND_API_KEY, etc.) rather than hardcode.
  console.log("New contact form submission:", { name, email, subject, message });
  // ----------------------------------------------------------------------

  return NextResponse.json({ ok: true });
}
