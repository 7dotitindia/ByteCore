import { Check, X } from "lucide-react";

export function ProsConsList({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">Pros</h3>
        <ul className="flex flex-col gap-2">
          {pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2 text-sm text-text">
              <Check size={14} className="mt-1 shrink-0 text-accent" aria-hidden />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">Cons</h3>
        <ul className="flex flex-col gap-2">
          {cons.map((con) => (
            <li key={con} className="flex items-start gap-2 text-sm text-text">
              <X size={14} className="mt-1 shrink-0 text-text-secondary" aria-hidden />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
