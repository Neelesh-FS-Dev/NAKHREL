import type { ReactNode } from "react";
import { Reveal } from "../motion/Reveal";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

/** Standard header for inner pages: a label, a display title and an optional lede. */
export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <header className="page-intro container">
      <Reveal>
        <p className="label">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="display-l">{title}</h1>
      </Reveal>
      {children && (
        <Reveal delay={0.16}>
          <div className="lede page-intro__lede">{children}</div>
        </Reveal>
      )}
    </header>
  );
}
