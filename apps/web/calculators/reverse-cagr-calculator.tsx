"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { formatINR } from "@/lib/utils";

const DEFAULT_INITIAL_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 7;
const DEFAULT_TENURE_YEARS = 3;

const MAX_INITIAL_INVESTMENT = 10000000;
const MAX_RETURN_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_INITIAL_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TENURE_YEARS = 1;

const ReverseCAGRCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(
    DEFAULT_INITIAL_INVESTMENT,
  );
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);

  const interestRate = returnRate / 100;
  const totalValue = Math.round(
    initialInvestment * (1 + interestRate) ** tenure,
  );

  const fieldValues = [
    {
      setFieldValue: setInitialInvestment,
      fieldValue: initialInvestment,
      step: 1500,
      defaultFieldValue: DEFAULT_INITIAL_INVESTMENT,
      minFieldValue: MIN_INITIAL_INVESTMENT,
      maxFieldValue: MAX_INITIAL_INVESTMENT,
      fieldLable: "Total Investment",
      fieldunit: "₹",
    },
    {
      setFieldValue: setReturnRate,
      fieldValue: returnRate,
      step: 1500,
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

  const outputValues = [
    {
      label: "Invested Amount",
      value: "₹ " + formatINR(Math.round(initialInvestment)),
      color: "",
    },

    {
      label: "Total Returns",
      value: "₹ " + formatINR(totalValue - initialInvestment),
      color: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: "₹ " + formatINR(Math.round(totalValue)),
  };

  const chartData = [
    {
      label: "Investment",
      value: initialInvestment,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: totalValue - initialInvestment,
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
    <CalculatorContainer
      fieldValues={fieldValues}
      outputValues={outputValues}
      chartConfig={chartConfig}
      chartData={chartData}
      maturity={maturity}
    />
  );
};

export default ReverseCAGRCalculator;
