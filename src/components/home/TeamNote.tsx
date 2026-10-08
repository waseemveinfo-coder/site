import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

// A short, plain note from the team: the human reason behind the product.
export function TeamNote() {
  return (
    <section aria-labelledby="note-title" className="border-b border-line py-14 sm:py-20">
      <Container>
        <figure className="mx-auto max-w-[760px]">
          <h2 id="note-title" className="text-[1.75rem] leading-[1.45] font-bold sm:text-[2.25rem]">
            كلمة من فريق ديرلي
          </h2>
          <blockquote className="mt-6 space-y-4 text-[19px] leading-[1.95] sm:text-[21px]">
            <p>
              بنينا ديرلي لأننا سمعنا نفس القصة من أصحاب شركات كتير: موظف ترك الشغل، وأخد عملاءه معه.
            </p>
            <p className="text-muted">
              ما بدنا نعامل الموظفين كأنهم متهمين. بدنا الثقة تكون سهلة: الموظف بيشتغل براحته، والشركة بتطمّن إن عملاءها إلها.
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-brand font-display text-lg font-bold text-on-brand">
              د
            </span>
            <span className="leading-tight">
              <span className="block font-display font-bold">فريق ديرلي</span>
              <span className="text-[14px] text-muted">عندك سؤال؟ في حدا حقيقي رح يرد عليك، بأي ساعة.</span>
            </span>
            {site.whatsappHref && (
              <a href={site.whatsappHref} target="_blank" rel="noopener" className="ms-auto inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2 text-[15px] font-semibold hover:border-brand">
                <span aria-hidden className="size-2 rounded-full bg-brand" />
                احكينا على واتساب
              </a>
            )}
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
