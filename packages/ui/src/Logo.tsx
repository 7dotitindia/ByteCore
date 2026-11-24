export function Logo({ siteName = "ByteScope" }: { siteName?: string }) {
  return (
    <span className="font-sans text-lg font-semibold tracking-tight text-text">
      {siteName.split(/(Scope|scope)/).map((part, i) =>
        /scope/i.test(part) ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
