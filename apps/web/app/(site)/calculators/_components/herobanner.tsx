import { CalculatorPageQueryResult } from "@sanity-types/*";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Herobanner = ({
  calculatorsPage,
}: {
  calculatorsPage: NonNullable<CalculatorPageQueryResult>;
}) => {
  return (
    <div className="bg-linear-to-t from-casual-navy -from-45% to-80% to-bright-royal-blue">
      <div className="text-white max-width-container padding-container">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-2 text-teal-grey">
            <Link href="/" className="duration-300 hover:text-gray-500">
              Home
            </Link>
            <ChevronRight size={24} className="min-w-6" />
            <div className="truncate text-teal-grey/60">Calculators</div>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <h2 className="text-2xl md:text-4xl font-semibold">
              {calculatorsPage.calculatorPageTitle}
            </h2>
            <p className="text-[18px] text-teal-grey font-normal">
              {calculatorsPage.calculatorPageTagLine}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanner;
