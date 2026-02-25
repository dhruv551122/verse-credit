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
    <>
      <div className="-translate-y-20 py-0! max-width-container max-md:px-0! padding-container">
        {calculator && (
          <div className="bg-white shadow-xl md:rounded-2xl text-tuatara">
            <div className="flex flex-col gap-6 padding-container">
              <h1 className="text-2xl font-medium pb-4 border-b border-pale-silver">
                {data.calculatorTitle}
              </h1>
              {calculator}
            </div>
          </div>
        )}
      </div>
      <div className="max-width-container py-0! padding-container">
        <RichText content={data.aboutCalculator} />
      </div>
    </>
  );
};

export default Calculator;
