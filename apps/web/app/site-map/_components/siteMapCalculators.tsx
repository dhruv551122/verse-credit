import { SanityImage } from "@/sanity/sanityImage";
import { CalculatorsQueryResult } from "@sanity-types/*";
import Link from "next/link";

const SitemapCalculators = ({
  calculators,
}: {
  calculators: NonNullable<CalculatorsQueryResult>;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-tuatara">
      {calculators.map((calculator) => (
        <Link
          key={calculator._id}
          href={`/calculators/${calculator.slug.current}`}
          className="flex flex-col gap-4 p-4 duration-300 border border-pale-silver rounded-xl text-tuatara hover:shadow-chathams-blue hover:shadow-xl/30"
        >
          <SanityImage
            src={calculator.icon}
            alt={calculator.icon.alt}
            width={48}
            height={48}
            className="object-contain"
          />
          <p className="text-[18px] md:text-xl font-semibold">
            {calculator.calculatorName}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SitemapCalculators;
