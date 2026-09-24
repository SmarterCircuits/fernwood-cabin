import type { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  title,
  id,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  /** id of the heading, used for aria-labelledby on the section. */
  id: string;
  children?: ReactNode;
}) {
  return (
    <header className="section-head">
      <p className="eyebrow">
        <span className="mono">{index}</span> {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {children && <div className="lede">{children}</div>}
    </header>
  );
}
