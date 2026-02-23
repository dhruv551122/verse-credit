import { CalculatorPageQueryResult } from "@sanity-types/*";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Herobanner from "./_components/herobanner";
import CalculatorsList from "./_components/calculatosList";

export async function generateMetadata(): Promise<Metadata> {
  let calculatorsPage: NonNullable<CalculatorPageQueryResult>;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calculatorsPage`,
    );

    if (!res.ok) {
      return notFound();
    }

    calculatorsPage = await res.json();
    return {
      title: calculatorsPage.calculatorPageTitle,
      description: calculatorsPage.calculatorPageTagLine,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/calculators`,
      },
    };
  } catch (error: unknown) {
    return notFound();
  }
}

const CalculatorsPage = async () => {
  let calculatorsPage: NonNullable<CalculatorPageQueryResult>;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calculatorsPage`,
    );
    if (!res.ok) return notFound();
    calculatorsPage = await res.json();
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error fetching data.");
  }
  return (
    <div className="pt-16.75 font-inter">
      <Herobanner calculatorsPage={calculatorsPage} />
      <CalculatorsList calculatorsList={calculatorsPage.calculatorList} />
    </div>
  );
};

export default CalculatorsPage;
