"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";

const DEFAULT_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 5;
const DEFAULT_TENURE_YEARS = 3;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TENURE_YEARS = 1;

// FV = P × ({[(1 + i)^n – 1] / i}) × (1 + i), while for Lumpsum it's FV = P * (1 + r/n)^(nt)

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);
  const [investmentInput, setInvestmentInput] =
    useState<number>(DEFAULT_INVESTMENT);
  const [returnRateInput, setReturnRateInput] =
    useState<number>(DEFAULT_RETURN_RATE);
  const [tenureInput, setTenureInput] = useState<number>(DEFAULT_TENURE_YEARS);

  const interestRate = returnRate / 100;
  let estimatedReturn;
  if (interestRate === 0) {
    estimatedReturn = investment;
  } else {
    estimatedReturn = investment * (1 + interestRate) ** tenure;
  }

  const fieldValues = [
    {
      inputValue: investmentInput,
      setFieldValue: setInvestment,
      setInputValue: setInvestmentInput,
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
      inputValue: returnRateInput,
      setFieldValue: setReturnRate,
      setInputValue: setReturnRateInput,
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
      inputValue: tenureInput,
      setFieldValue: setTenure,
      setInputValue: setTenureInput,
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
      <CalculatorContainer
        title="Lumpsum Calculator"
        fieldValues={fieldValues}
        outputValues={outputValues}
        chartConfig={chartConfig}
        chartData={chartData}
        canShowYearsDetail={false}
        maturity={maturity}
      />
    </div>
  );
};

export default LumpsumCalculator;
