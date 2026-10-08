import type { Metadata } from "next";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Sectors } from "@/components/home/Sectors";

export const metadata: Metadata = {
  title: "الحلول حسب القطاع",
  description:
    "ديرلي لكل شركة عندها فريق بيحكي مع عملاء على واتساب: مكاتب عقارية، مقاولات، مبيعات، عيادات، متاجر، وشركات خدمات.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsIndex() {
  return (
    <>
      <Breadcrumb items={[{ label: "الحلول" }]} />
      <Sectors as="h1" />
    </>
  );
}
