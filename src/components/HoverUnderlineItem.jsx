export default function HoverUnderlineItem({ children, index = 0 }) {
  return (
    <li className="group relative overflow-hidden py-3 text-sm">
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-maroon/60 transition-transform duration-300 group-hover:scale-x-100"
        style={{ transitionDelay: `${index * 20}ms` }}
      />
    </li>
  );
}
