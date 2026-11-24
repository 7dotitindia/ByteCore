export function AdminList<T extends { id: string }>({
  items,
  columns,
  emptyLabel = "Nothing here yet.",
}: {
  items: T[];
  columns: { header: string; render: (item: T) => React.ReactNode }[];
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return <p className="mt-8 text-sm text-text-secondary">{emptyLabel}</p>;
  }

  return (
    <table className="mt-8 w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
          {columns.map((c) => (
            <th key={c.header} className="py-2 font-medium">
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-border last:border-none">
            {columns.map((c) => (
              <td key={c.header} className="py-3 text-text">
                {c.render(item)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
