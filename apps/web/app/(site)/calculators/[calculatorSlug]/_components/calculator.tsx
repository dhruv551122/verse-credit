import { calculators } from "@/calculators";
import RichText from "@/components/ui/rich-text";
import { CalculatorBySlugQueryResult } from "@sanity-types/*";
import { redirect } from "next/navigation";

const Calculator = ({
  data,
  calculatorSlug,
}: {
  data: NonNullable<CalculatorBySlugQueryResult>;
  calculatorSlug: string;
}) => {
  const calculator = calculators[calculatorSlug];
  if (!calculator) {
    redirect("/calculators");
  }
  return (
    <>
      <div className="-translate-y-20 py-0! max-width-container max-md:px-0! padding-container">
        <div className="bg-white shadow-2xl md:rounded-2xl text-tuatara">
          <div className="flex flex-col gap-10 padding-container">
            <h1 className="text-2xl font-medium">{data.calculatorTitle}</h1>
            {calculator}
          </div>
        </div>
      </div>
      <div className="max-width-container py-0! padding-container">
        <RichText content={data.aboutCalculator} />
      </div>
    </>
  );
};

export default Calculator;
