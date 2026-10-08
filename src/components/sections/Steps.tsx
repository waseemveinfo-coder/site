// Numbered steps in one hairline row (4 across on desktop, stacked on phones).
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  const cols = steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={`mt-10 grid border-t border-line sm:grid-cols-2 ${cols}`}>
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="border-b border-line py-6 sm:pe-6 lg:border-b-0 lg:border-e lg:px-6 lg:first:ps-0 lg:last:border-e-0"
        >
          <span className="font-mono text-sm text-muted" dir="ltr">
            0{i + 1}
          </span>
          <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-7 text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
