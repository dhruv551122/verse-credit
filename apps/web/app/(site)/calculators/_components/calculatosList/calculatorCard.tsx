import { SanityImage } from "@/sanity/sanityImage";
import { CalculatorPageQueryResult } from "@sanity-types/*";
import Link from "next/link";

const CalculatorCard = ({
  calculatorDetail,
}: {
  calculatorDetail: NonNullable<CalculatorPageQueryResult>["calculatorList"][number];
}) => {
  return (
    <Link
      href={`/calculators/${calculatorDetail.slug.current}`}
      className="flex flex-col gap-4 p-4 border border-pale-silver rounded-xl text-tuatara hover:shadow-chathams-blue hover:shadow-xl/30 duration-300"
    >
      <SanityImage
        src={calculatorDetail.icon}
        alt={calculatorDetail.icon.alt}
        width={48}
        height={48}
        className="object-contain"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{calculatorDetail.title}</h3>
        <p className="text-sm font-medium text-metallic-grey">
          {calculatorDetail.description}
        </p>
      </div>
    </Link>
  );
};

export default CalculatorCard;
