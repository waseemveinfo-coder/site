import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { CheckList } from "@/components/ui/Check";

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
        <Photo name="managerReports" />
        <div>
          <SectionHeader
            id="people-title"
            title="المدير شايف كل شي، والفريق شغّال براحته"
            align="start"
            lead="ديرلي مش أداة رقابة، هي طريقة شغل بتريّح الكل."
          />
          <CheckList className="mt-6" items={lines} />
        </div>
      </Container>
    </section>
  );
}
