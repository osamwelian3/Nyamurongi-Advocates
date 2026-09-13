"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Send, CheckCircle2 } from "lucide-react";

const FIELDS = [
  { name: "name", label: "Your Name", type: "text" },
  { name: "email", label: "Your Email", type: "email" },
  { name: "subject", label: "Subject", type: "text" },
];

function Field({ field, value, onChange }) {
  const labelRef = useRef(null);
  const lineRef = useRef(null);

  const focus = () => {
    gsap.to(labelRef.current, {
      y: -22,
      scale: 0.85,
      color: "#7a2436",
      duration: 0.25,
      ease: "power2.out",
    });
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power3.out" });
  };

  const blur = () => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.25, ease: "power2.in" });
    if (!value) {
      gsap.to(labelRef.current, {
        y: 0,
        scale: 1,
        color: "#4a5568",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="relative pt-5">
      <label
        ref={labelRef}
        htmlFor={field.name}
        className="pointer-events-none absolute left-0 top-5 origin-left font-sans text-sm text-slate"
      >
        {field.label}
      </label>
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        onFocus={focus}
        onBlur={blur}
        required
        className="w-full border-0 border-b border-ink/20 bg-transparent py-2 font-sans text-ink outline-none"
      />
      <span
        ref={lineRef}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-maroon"
      />
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const successRef = useRef(null);

  const update = (name, val) => setValues((v) => ({ ...v, [name]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
      requestAnimationFrame(() => {
        gsap.fromTo(
          successRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        className="flex items-start gap-3 rounded-sm border border-brass/30 bg-brass/10 p-6"
      >
        <CheckCircle2 className="mt-0.5 shrink-0 text-brass" size={22} />
        <div>
          <p className="font-serif text-lg text-ink">Message sent</p>
          <p className="mt-1 text-sm text-slate">
            Thank you for reaching out. A member of our team will respond
            shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {FIELDS.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={values[field.name]}
          onChange={update}
        />
      ))}

      <div className="relative pt-5">
        <label className="mb-2 block font-sans text-sm text-slate">
          Your Message
        </label>
        <textarea
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full resize-none border border-ink/20 bg-transparent p-3 font-sans text-ink outline-none transition-colors focus:border-maroon"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-sans text-sm text-parchment transition-colors hover:bg-maroon disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Submit"}
        <Send size={15} />
      </button>

      {status === "error" && (
        <p className="text-sm text-maroon">
          Something went wrong — please try again, or call us directly.
        </p>
      )}
    </form>
  );
}
