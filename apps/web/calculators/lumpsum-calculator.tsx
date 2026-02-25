"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { Switch } from "@/components/ui/switch";
import { formatINR } from "@/lib/utils";

const DEFAULT_INVESTMENT = 50000;
const DEFAULT_RETURN_RATE = 12;
const DEFAULT_INFLATION_RATE = 5;
const DEFAULT_TENURE_YEARS = 3;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_INFLATION_RATE = 15;
const MAX_TENURE_YEARS = 35;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_INFLATION_RATE = 1;
const MIN_TENURE_YEARS = 1;

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);

  const [withInflation, setWithInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(
    DEFAULT_INFLATION_RATE,
  );

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

  const outputValues = [
    {
      label: "Invested Amount",
      value: "₹ " + formatINR(Math.round(investment)),
      color: "",
    },

    {
      label: "Returns",
      value: "₹ " + formatINR(Math.round(estimatedReturn - investment)),
      color: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: "₹ " + formatINR(Math.round(estimatedReturn)),
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
    <>
      <div className="flex items-center gap-2">
        <p>With Inflation</p>
        <Switch
          onClick={() => setWithInflation((prev) => !prev)}
          className="data-[state=checked]:bg-strong-amber"
        />
      </div>
      <CalculatorContainer
        fieldValues={fieldValues}
        outputValues={outputValues}
        chartConfig={chartConfig}
        chartData={chartData}
        maturity={maturity}
      />
    </>
  );
};

export default LumpsumCalculator;
