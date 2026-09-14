import Link from "next/link";
import { firm } from "@/lib/data/firm";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-parchment py-24 text-ink">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-maroon">
          Instruction
        </p>
        <h2 className="mt-4 font-display text-4xl sm:text-6xl">
          Bring the papers you have.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/75">
          A consultation is a conversation. A brief is a file. Write,
          telephone, or attend at {firm.address.line1} on a working day.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex h-12 items-center bg-ink px-7 font-sans text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-elevated"
        >
          Instruct Chambers
        </Link>

        <div className="mx-auto mt-10 flex max-w-md flex-wrap justify-center gap-8 border-t border-ink/10 pt-6 text-sm text-ink/70">
          <a href={firm.phone.href} className="hover:text-ink">
            <span className="block text-xs text-ink/45">{firm.phone.label}</span>
            {firm.phone.value}
          </a>
          <a href={`mailto:${firm.email}`} className="hover:text-ink">
            <span className="block text-xs text-ink/45">Email</span>
            {firm.email}
          </a>
        </div>
      </div>
    </section>
  );
}
