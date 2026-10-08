import { LegalPage, legalMetadata } from "@/components/sections/LegalPage";

export const metadata = legalMetadata("delivery");

export default function DeliveryPage() {
  return <LegalPage page="delivery" />;
}
