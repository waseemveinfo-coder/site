import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-sm text-muted" dir="ltr">404</p>
      <h1 className="mt-2 text-3xl font-extrabold">الصفحة هاي لسّا مش موجودة</h1>
      <p className="mt-3 text-muted">يمكن الرابط تغيّر، أو الصفحة قيد البناء.</p>
      <ButtonLink href="/" className="mt-8">
        الرجوع للرئيسية
      </ButtonLink>
    </Container>
  );
}
