"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { formatINR } from "@/lib/utils";

const DEFAULT_INITIAL_INVESTMENT = 1000;
const DEFAULT_MATURITY_RATE = 2500;
const DEFAULT_TENURE_YEARS = 3;

const MAX_INITIAL_INVESTMENT = 10000000;
const MAX_MATURITY_RATE = 10000000;
const MAX_TENURE_YEARS = 50;

const MIN_INITIAL_INVESTMENT = 100;
const MIN_MATURITY_RATE = 100;
const MIN_TENURE_YEARS = 1;

const CAGRCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(
    DEFAULT_INITIAL_INVESTMENT,
  );
  const [maturityValue, setMaturityValue] = useState<number>(
    DEFAULT_MATURITY_RATE,
  );
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);

  const estimatedReturnRate =
    ((maturityValue / initialInvestment) ** (1 / tenure) - 1) * 100;

  const fieldValues = [
    {
      setFieldValue: setInitialInvestment,
      fieldValue: initialInvestment,
      step: 1500,
      defaultFieldValue: DEFAULT_INITIAL_INVESTMENT,
      minFieldValue: MIN_INITIAL_INVESTMENT,
      maxFieldValue: MAX_INITIAL_INVESTMENT,
      fieldLable: "Monthly Investment",
      fieldunit: "₹",
    },
    {
      setFieldValue: setMaturityValue,
      fieldValue: maturityValue,
      step: 1500,
      defaultFieldValue: DEFAULT_MATURITY_RATE,
      minFieldValue: MIN_MATURITY_RATE,
      maxFieldValue: MAX_MATURITY_RATE,
      fieldLable: "Return Rate (p. a.)",
      fieldunit: "₹",
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
      value: "₹ " + formatINR(Math.round(maturityValue - initialInvestment)),
      color: maturityValue - initialInvestment < 0 ? "#dd6565" : "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: estimatedReturnRate.toFixed(2) + " %",
  };

  const chartData = [
    {
      label: "Investment",
      value: initialInvestment,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: Math.abs(maturityValue - initialInvestment),
      fill: maturityValue - initialInvestment < 0 ? "#dd6565" : "#5ca81d",
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

export default CAGRCalculator;
