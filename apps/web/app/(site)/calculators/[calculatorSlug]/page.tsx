import {
  CalculatorBySlugQueryResult,
  CalculatorPageQueryResult,
  CalculatorsQueryResult,
} from "@sanity-types/*";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Herobanner from "./_components/herobanner";
import Calculator from "./_components/calculator";
import { sanityFetch } from "@/sanity/lib/live";
import { calculatorBySlugQuery } from "@/sanity/lib/query";
import { client } from "@/sanity/lib/client";
import { calculatorsQuery } from "@/sanity/lib/query";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ calculatorSlug: string }>;
}): Promise<Metadata> {
  const { calculatorSlug } = await params;
  const { data } = await sanityFetch<NonNullable<CalculatorBySlugQueryResult>>({
    query: calculatorBySlugQuery,
    params: { calculatorSlug },
  });

  if (!data) {
    return notFound();
  }

  return {
    title: data.title,
    description: data.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/calculators/${calculatorSlug}`,
    },
  };
}

const CalculatorPage = async ({
  params,
}: {
  params: Promise<{ calculatorSlug: string }>;
}) => {
  const { calculatorSlug } = await params;
  const { data } = await sanityFetch<NonNullable<CalculatorBySlugQueryResult>>({
    query: calculatorBySlugQuery,
    params: { calculatorSlug },
  });

  if (!data) {
    return notFound();
  }

  return (
    <div className="pt-16.75">
      <Herobanner data={data} />
      <Calculator data={data} calculatorSlug={calculatorSlug} />
    </div>
  );
};

export default CalculatorPage;

export async function generateStaticParams() {
  const data =
    await client.fetch<NonNullable<CalculatorsQueryResult>>(calculatorsQuery);

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map((calculator) => ({
    calculatorSlug: calculator.slug.current,
  }));
}
