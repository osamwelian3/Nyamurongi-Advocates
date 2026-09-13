import { ImageIcon } from "lucide-react";

export default function PhotoPlaceholder({ label, className = "", aspect = "aspect-[4/5]" }) {
  return (
    <div
      className={`${aspect} ${className} flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink via-panel to-sage-deep/50 text-fg/40`}
    >
      <ImageIcon size={28} strokeWidth={1.25} />
      {label && (
        <span className="max-w-[70%] text-center font-sans text-xs">
          {label}
        </span>
      )}
    </div>
  );
}
