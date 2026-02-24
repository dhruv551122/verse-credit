"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";

const DEFAULT_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 5;
const DEFAULT_TIME_PERIOD = 10;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 25;
const MAX_TIME_PERIOD = 25;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TIME_PERIOD = 1;

const CompoundInterestCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);

  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);

  const [interestFrequency, setInterestFrequency] = useState<number>(1);

  const [timePeriod, setTimePeriod] = useState<number>(DEFAULT_TIME_PERIOD);
  console.log(interestFrequency);
  const interestRate = returnRate / 100;
  const compoundInterest = investment * ((1 + interestRate) ** timePeriod - 1);

  const fieldValues = [
    {
      setFieldValue: setInvestment,
      fieldValue: investment,
      step: 1500,
      defaultFieldValue: DEFAULT_INVESTMENT,
      minFieldValue: MIN_INVESTMENT,
      maxFieldValue: MAX_INVESTMENT,
      fieldLable: "Principal Amount",
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
      fieldLable: "Expected Return Rate (p.a)",
      fieldunit: "%",
      unitRightSide: true,
    },
    {
      setFieldValue: setTimePeriod,
      fieldValue: timePeriod,
      step: 0.5,
      defaultFieldValue: DEFAULT_TIME_PERIOD,
      minFieldValue: MIN_TIME_PERIOD,
      maxFieldValue: MAX_TIME_PERIOD,
      fieldLable: "Time Period",
      fieldunit: "Yr",
      unitRightSide: true,
    },
  ];

  const outputValues = [
    {
      label: "Total Investment",
      value: investment,
      unit: "₹",
    },
    {
      label: "Returns",
      value: compoundInterest,
      unit: "₹",
    },
  ];

  const chartData = [
    {
      label: "Total Investment",
      value: investment,
      fill: "#1b5183",
    },
    {
      label: "Returns",
      value: compoundInterest,
      fill: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: Math.round(compoundInterest + investment),
  };

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
        <h1 className="text-2xl font-medium">
          Calculate your estimated returns:
        </h1>
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

export default CompoundInterestCalculator;
