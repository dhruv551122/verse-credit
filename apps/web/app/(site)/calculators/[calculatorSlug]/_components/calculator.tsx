import { calculators } from "@/calculators";
import RichText from "@/components/ui/rich-text";
import { CalculatorBySlugQueryResult } from "@sanity-types/*";
import { ReactNode } from "react";

const Calculator = ({
  data,
  calculatorSlug,
}: {
  data: NonNullable<CalculatorBySlugQueryResult>;
  calculatorSlug: string;
}) => {
  const calculator: ReactNode | null | undefined = calculators[calculatorSlug];

  return (
    <div className="relative">
      {calculator && (
        <div className="bg-linear-to-t from-casual-navy -from-45% -to-10% to-casual-navy h-30 w-full absolute -z-1 -top-px" />
      )}
      <div className=" py-0! max-width-container max-md:px-0! padding-container">
        {calculator && (
          <div className="bg-white shadow-xl md:rounded-2xl text-tuatara">
            <div className="flex flex-col gap-6 padding-container">
              <h1 className="pb-4 text-xl font-medium border-b border-pale-silver">
                {data.calculatorTitle}
              </h1>
              {calculator}
            </div>
          </div>
        )}
      </div>
      <div className="max-width-container padding-container ">
        <RichText
          content={data.aboutCalculator}
          className="prose-p:text-metallic-grey prose-li:text-metallic-grey prose-p:font-medium prose-li:font-medium prose-h3:text-tuatara prose-h4:text-tuatara prose-strong:text-tuatara"
        />
      </div>
    </div>
  );
};

export default Calculator;
