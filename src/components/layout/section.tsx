import { ReactNode } from "react";

type SectionProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="card flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description ? (
          <p className="text-sm text-slate-300">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

