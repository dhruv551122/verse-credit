import { CalculatorPageQueryResult } from "@sanity-types/*";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Herobanner from "./_components/herobanner";
import CalculatorsList from "./_components/calculatosList";
import { sanityFetch } from "@/sanity/lib/live";
import { calculatorPageQuery } from "@/sanity/lib/query";

export async function generateMetadata(): Promise<Metadata> {
  const { data: calculatorsPage } = await sanityFetch<
    NonNullable<CalculatorPageQueryResult>
  >({ query: calculatorPageQuery });

  if (!calculatorsPage) {
    return notFound();
  }

  return {
    title: calculatorsPage.calculatorPageTitle,
    description: calculatorsPage.calculatorPageTagLine,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/calculators`,
    },
  };
}

const CalculatorsPage = async () => {
  const { data: calculatorsPage } = await sanityFetch<
    NonNullable<CalculatorPageQueryResult>
  >({ query: calculatorPageQuery });

  if (!calculatorsPage) {
    return notFound();
  }
  return (
    <div className="pt-16.75 font-inter">
      <Herobanner calculatorsPage={calculatorsPage} />
      <CalculatorsList calculatorsList={calculatorsPage.calculatorList} />
    </div>
  );
};

export default CalculatorsPage;
