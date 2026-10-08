// A short process shown as connected boxes (arrows point along the reading
// direction). No big step numbers.
export function Steps({ steps }: { steps: { title: string; text: string }[] }) {
  const cols = steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ol className={`mt-10 grid gap-4 sm:grid-cols-2 lg:gap-8 ${cols}`}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative rounded-md border border-line bg-surface p-5">
          <h3 className="text-[19px] leading-8 font-bold">{s.title}</h3>
          <p className="mt-1.5 text-[16px] leading-8 text-ink/70">{s.text}</p>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-1/2 -end-7 hidden size-6 -translate-y-1/2 place-items-center text-brand lg:grid"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
