"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";

const DEFAULT_INVESTMENT = 10000;
const DEFAULT_RISK_BOUNDARY = 5;
const DEFAULT_BUY_PRICE = 100;
const DEFAULT_STOPLOSS = 80;

const MAX_INVESTMENT = 1000000;
const MAX_RISK_BOUNDARY = 35;
const MAX_BUY_PRICE = 100000;
const MAX_STOPLOSS = 100000;

const MIN_INVESTMENT = 100;
const MIN_RISK_BOUNDARY = 1;
const MIN_BUY_PRICE = 1;
const MIN_STOPLOSS = 1;

const PositionSizeCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);

  const [riskBoundary, setRiskBoundry] = useState<number>(
    DEFAULT_RISK_BOUNDARY,
  );

  const [buyPrice, setBuyPrice] = useState<number>(DEFAULT_BUY_PRICE);

  const [stoploss, setStoploss] = useState<number>(DEFAULT_STOPLOSS);

  const interestRate = riskBoundary / 100;
  const shares = (investment * interestRate) / (buyPrice - stoploss);

  const fieldValues = [
    {
      setFieldValue: setInvestment,
      fieldValue: investment,
      step: 1500,
      defaultFieldValue: DEFAULT_INVESTMENT,
      minFieldValue: MIN_INVESTMENT,
      maxFieldValue: MAX_INVESTMENT,
      fieldLable: "Available Balance",
      fieldunit: "₹",
      unitRightSide: false,
    },
    {
      setFieldValue: setRiskBoundry,
      fieldValue: riskBoundary,
      step: 0.01,
      defaultFieldValue: DEFAULT_RISK_BOUNDARY,
      minFieldValue: MIN_RISK_BOUNDARY,
      maxFieldValue: MAX_RISK_BOUNDARY,
      fieldLable: "Risk Boundary (%)",
      fieldunit: "%",
      unitRightSide: true,
    },
    {
      setFieldValue: setBuyPrice,
      fieldValue: buyPrice,
      step: 1000,
      defaultFieldValue: DEFAULT_BUY_PRICE,
      minFieldValue: MIN_BUY_PRICE,
      maxFieldValue: MAX_BUY_PRICE,
      fieldLable: "Buy Price",
      fieldunit: "₹",
      unitRightSide: false,
    },
    {
      setFieldValue: setStoploss,
      fieldValue: stoploss,
      step: 1000,
      defaultFieldValue: DEFAULT_STOPLOSS,
      minFieldValue: MIN_STOPLOSS,
      maxFieldValue: MAX_STOPLOSS,
      fieldLable: "Stoploss",
      fieldunit: "₹",
      unitRightSide: false,
    },
  ];

  const outputValues = [
    {
      label: "Investment Amount",
      value: shares * buyPrice,
      unit: "₹",
    },
    {
      label: "Potential Risk",
      value: (buyPrice - stoploss) * shares,
      unit: "₹",
    },
    {
      label: "Shares to Buy",
      value: shares,
      unit: "",
    },
  ];

  const chartData = [
    {
      label: "Investment Amount",
      value: shares * buyPrice,
      fill: "#1b5183",
    },
    {
      label: "Potential Risk",
      value: (buyPrice - stoploss) * shares,
      fill: "#FE6A2A",
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
      <CalculatorContainer
        fieldValues={fieldValues}
        outputValues={outputValues}
        chartConfig={chartConfig}
        chartData={chartData}
      />
    </>
  );
};

export default PositionSizeCalculator;
