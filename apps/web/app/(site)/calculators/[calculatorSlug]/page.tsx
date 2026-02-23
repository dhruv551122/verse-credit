import {
  CalculatorBySlugQueryResult,
  CalculatorPageQueryResult,
} from "@sanity-types/*";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Herobanner from "./_components/herobanner";
import Calculator from "./_components/calculator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculatorSlug: string }>;
}): Promise<Metadata> {
  const calculatorParams = await params;
  const searchParams = new URLSearchParams(calculatorParams);
  let data: NonNullable<CalculatorBySlugQueryResult>;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calculator?${searchParams}`,
    );

    data = await res.json();

    return {
      title: data.title,
      description: data.description,
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/calculators/${calculatorParams.calculatorSlug}`,
      },
    };
  } catch (error: unknown) {
    return notFound();
  }
}

const CalculatorPage = async ({
  params,
}: {
  params: Promise<{ calculatorSlug: string }>;
}) => {
  const calculatorParams = await params;
  const searchParams = new URLSearchParams(calculatorParams).toString();
  let data: NonNullable<CalculatorBySlugQueryResult>;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calculator?${searchParams}`,
    );

    if (!res.ok) return notFound();
    data = await res.json();
  } catch (error: unknown) {
    console.error(error);
    throw new Error("Error fetching data.");
  }

  return (
    <div className="pt-16.75">
      <Herobanner data={data} />
      <Calculator
        data={data}
        calculatorSlug={calculatorParams.calculatorSlug}
      />
    </div>
  );
};

export default CalculatorPage;

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/calculatorsPage`,
    {
      cache: "force-cache",
    },
  );

  if (!res.ok) return [];
  const calculatorsPage: NonNullable<CalculatorPageQueryResult> =
    await res.json();

  if (
    !calculatorsPage.calculatorList ||
    !Array.isArray(calculatorsPage.calculatorList)
  ) {
    return [];
  }

  return calculatorsPage.calculatorList.map((calculator) => ({
    calculatorSlug: calculator.slug.current,
  }));
}

export const revalidate = 60;
