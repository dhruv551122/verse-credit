import { CalculatorPageQueryResult } from "@sanity-types/*";
import CalculatorCard from "./calculatorCard";

const CalculatorsList = ({
  calculatorsList,
}: {
  calculatorsList: NonNullable<CalculatorPageQueryResult>["calculatorList"];
}) => {
  return (
    <div className="max-width-container padding-container">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {calculatorsList.map((calculator) => (
          <CalculatorCard key={calculator._id} calculatorDetail={calculator} />
        ))}
      </div>
    </div>
  );
};

export default CalculatorsList;
