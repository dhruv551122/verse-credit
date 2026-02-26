"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { formatINR } from "@/lib/utils";

const DEFAULT_INVESTMENT = 100000;
const DEFAULT_INTEREST_RATE = 7.1;
const DEFAULT_TIME_PERIOD = 10;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 25;
const MAX_TIME_PERIOD = 45;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TIME_PERIOD = 1;

const PPFCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);

  const [returnRate, setReturnRate] = useState<number>(DEFAULT_INTEREST_RATE);

  const [timePeriod, setTimePeriod] = useState<number>(DEFAULT_TIME_PERIOD);
  const interestRate = returnRate / 100;
  console.log(interestRate);
  const maturityValue =
    investment *
    (((1 + interestRate) ** timePeriod - 1) / interestRate) *
    (1 + interestRate);

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
    {
      setFieldValue: setReturnRate,
      fieldValue: returnRate,
      step: 0.01,
      defaultFieldValue: DEFAULT_INTEREST_RATE,
      minFieldValue: MIN_RETURN_RATE,
      maxFieldValue: MAX_RETURN_RATE,
      fieldLable: "Expected Return Rate (p.a)",
      fieldunit: "%",
      unitRightSide: true,
      disabled: true,
    },
  ];

  const outputValues = [
    {
      label: "Total Investment",
      value: "₹ " + formatINR(Math.round(investment * timePeriod)),
      color: "",
    },
    {
      label: "Returns",
      value:
        "₹ " + formatINR(Math.round(maturityValue - investment * timePeriod)),
      color: "#5ca81d",
    },
  ];

  const chartData = [
    {
      label: "Total Investment",
      value: investment * timePeriod,
      fill: "#1b5183",
    },
    {
      label: "Returns",
      value: maturityValue - investment * timePeriod,
      fill: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: "₹ " + formatINR(Math.round(maturityValue)),
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
    <>
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

export default PPFCalculator;
