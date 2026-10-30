/**
 * Floating-label inputs, in pure CSS (Tailwind `peer` + `:placeholder-shown`).
 * The old contact form animated colours with GSAP using hard-coded hex
 * values, which ignored the theme switcher; this version reads the theme
 * tokens (text-ink / text-maroon), so it follows whichever palette is active.
 *
 * The input must stay BEFORE the label and underline in the markup: `peer`
 * only styles later siblings.
 */
const labelCls =
  "pointer-events-none absolute left-0 top-7 origin-left text-sm text-ink/55 transition-all duration-200 " +
  "peer-focus:-translate-y-6 peer-focus:scale-[0.85] peer-focus:text-maroon " +
  "peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-[0.85]";

const lineCls =
  "pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-maroon " +
  "transition-transform duration-300 peer-focus:scale-x-100";

const inputCls =
  "peer w-full border-0 border-b border-ink/25 bg-transparent pb-2 pt-1 text-base text-ink outline-none";

export function TextField({ id, name = id, label, required, type = "text", ...rest }) {
  return (
    <div className="relative pt-6">
      <input id={id} name={name} type={type} placeholder=" " required={required} className={inputCls} {...rest} />
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <span className={lineCls} />
    </div>
  );
}

export function TextAreaField({ id, name = id, label, required, rows = 5, ...rest }) {
  return (
    <div className="relative pt-6">
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder=" "
        required={required}
        className={`${inputCls} resize-none`}
        {...rest}
      />
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <span className={lineCls} />
    </div>
  );
}

/** Off-screen decoy field. Humans never see or reach it; form-filling bots do fill it. */
export function Honeypot({ name, value, onChange }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={name} tabIndex={-1} autoComplete="off" value={value} onChange={onChange} />
      </label>
    </div>
  );
}
