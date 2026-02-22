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
    <div className="-translate-y-20 py-0! max-width-container max-md:px-0! padding-container">
      <div className="flex flex-col gap-10">
        <div className="bg-white shadow-2xl md:rounded-2xl text-tuatara">
          {calculator}
        </div>
        <RichText content={data.aboutCalculator} />
      </div>
    </div>
  );
};

export default Calculator;
