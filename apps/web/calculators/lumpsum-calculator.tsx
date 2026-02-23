"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { Switch } from "@/components/ui/switch";

const DEFAULT_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 5;
const DEFAULT_INFLATION_RATE = 5;
const DEFAULT_TENURE_YEARS = 3;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_INFLATION_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_INFLATION_RATE = 1;
const MIN_TENURE_YEARS = 1;

// FV = P × ({[(1 + i)^n – 1] / i}) × (1 + i), while for Lumpsum it's FV = P * (1 + r/n)^(nt)

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);

  const [withInflation, setWithInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] =
    useState<number>(DEFAULT_RETURN_RATE);

  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);

  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);

  const interestRate = returnRate / 100;
  let estimatedReturn;
  if (interestRate === 0) {
    estimatedReturn = investment;
  } else if (withInflation) {
    estimatedReturn =
      investment * ((1 + interestRate) / (1 + inflationRate / 100)) ** tenure;
  } else {
    estimatedReturn = investment * (1 + interestRate) ** tenure;
  }

  let fieldValues = [
    {
      setFieldValue: setInvestment,
      fieldValue: investment,
      step: 1500,
      defaultFieldValue: DEFAULT_INVESTMENT,
      minFieldValue: MIN_INVESTMENT,
      maxFieldValue: MAX_INVESTMENT,
      fieldLable: "Investment",
      fieldunit: "₹",
      unitRightSide: false,
    },
    {
      setFieldValue: setReturnRate,
      fieldValue: returnRate,
      step: 0.01,
      defaultFieldValue: DEFAULT_RETURN_RATE,
      minFieldValue: MIN_RETURN_RATE,
      maxFieldValue: MAX_RETURN_RATE,
      fieldLable: "Return Rate (p. a.)",
      fieldunit: "%",
      unitRightSide: true,
    },
    {
      setFieldValue: setTenure,
      fieldValue: tenure,
      step: 0.5,
      defaultFieldValue: DEFAULT_TENURE_YEARS,
      minFieldValue: MIN_TENURE_YEARS,
      maxFieldValue: MAX_TENURE_YEARS,
      fieldLable: "Time Period",
      fieldunit: "Yr",
      unitRightSide: true,
    },
  ];
  if (withInflation) {
    fieldValues = [
      ...fieldValues,
      {
        setFieldValue: setInflationRate,
        fieldValue: inflationRate,
        step: 0.01,
        defaultFieldValue: DEFAULT_INFLATION_RATE,
        minFieldValue: MIN_INFLATION_RATE,
        maxFieldValue: MAX_INFLATION_RATE,
        fieldLable: "Inflation Rate (p. a.)",
        fieldunit: "%",
        unitRightSide: true,
      },
    ];
  }
  console.log(withInflation);

  const outputValues = [
    {
      label: "Invested Amount",
      value: investment,
    },

    {
      label: "Total value",
      value: estimatedReturn - investment,
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: Math.round(estimatedReturn),
  };

  const chartData = [
    {
      label: "Investment",
      value: investment,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: Math.round(estimatedReturn - investment),
      fill: "#5ca81d",
    },
  ];

  const chartConfig = {
    principle: {
      name: "Investment",
      color: "#1b5183",
    },
    interest: {
      name: "Est. Returns",
      color: "#5ca81d",
    },
  };

  return (
    <div className="max-width-container padding-container">
      <div className="flex flex-col gap-10">
        <div className="flex gap-4 items-end">
          <h1 className="text-2xl font-medium">Calculate Lumpsum returns:</h1>
          <div className="flex gap-2 items-center">
            <p>With Inflation</p>
            <Switch
              onClick={() => setWithInflation((prev) => !prev)}
              className="data-[state=checked]:bg-strong-amber"
            />
          </div>
        </div>
        <CalculatorContainer
          fieldValues={fieldValues}
          outputValues={outputValues}
          chartConfig={chartConfig}
          chartData={chartData}
          maturity={maturity}
        />
      </div>
    </div>
  );
};

export default LumpsumCalculator;
