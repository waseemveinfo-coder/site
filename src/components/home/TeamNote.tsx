import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

// A short, plain note from the team: the human reason behind the product.
export function TeamNote() {
  return (
    <section aria-labelledby="note-title" className="border-b border-line py-14 sm:py-20">
      <Container>
        <figure className="mx-auto max-w-[760px]">
          <p id="note-title" className="text-sm font-semibold text-brand-ink">
            كلمة من فريق ديرلي
          </p>
          <blockquote className="mt-4 space-y-4 font-display text-xl leading-[1.9] font-semibold sm:text-2xl sm:leading-[1.85]">
            <p>
              بنينا ديرلي لأننا سمعنا نفس القصة من أصحاب شركات كتير: موظف ترك الشغل، وأخد عملاءه معه.
            </p>
            <p className="text-muted">
              ما بدنا نعامل الموظفين كأنهم متهمين. بدنا الثقة تكون سهلة: الموظف بيشتغل براحته، والشركة بتطمّن إن عملاءها إلها.
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
            <span aria-hidden className="grid size-11 place-items-center rounded-full bg-brand font-display text-lg font-extrabold text-on-brand">
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
