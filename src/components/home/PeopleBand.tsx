import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";

// The human side of the story: the people Derlly is built for.
const lines = [
  "الموظف بيشتغل براحته، وما حدا بيحمّله مسؤولية أرقام مش معه.",
  "المدير بيطمّن إن كل عميل بإيد أمينة، وإنه رح يضل للشركة.",
  "والعميل بيحكي مع شركتك بثقة، على نفس الواتساب اللي بيعرفه.",
];

export function PeopleBand() {
  return (
    <section aria-labelledby="people-title" className="border-b border-line bg-surface py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Photo name="homeTeam" />
        <div>
          <SectionHeader
            id="people-title"
            kicker="مبنية لفريقك"
            title="ثقة بين الشركة وفريقها، وبين الفريق وعملائه."
            lead="ديرلي مش بس أداة رقابة. هي طريقة شغل بتريّح الكل:"
          />
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {lines.map((l) => (
              <li key={l} className="flex gap-3 py-3.5 text-[16px] leading-7">
                <span aria-hidden className="mt-[11px] size-1.5 shrink-0 rounded-full bg-brand" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
