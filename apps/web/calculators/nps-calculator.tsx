"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { formatINR } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DROP_DOWN_ITEMS = ["Monthly", "Yearly"];

const DEFAULT_INVESTMENT_TYPE = "Monthly";

const DEFAULT_MONTHLY_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 12;
const DEFAULT_ANNUNITY_RETURN_RATE = 7;
const DEFAULT_AGE = 20;

const MAX_MONTHLY_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_ANNUNITY_RETURN_RATE = 25;
const MAX_AGE = 60;

const MIN_MONTHLY_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_ANNUNITY_RETURN_RATE = 1;
const MIN_AGE = 18;

const RETIRENMENT_AGE = 60;

const NPSCalculator = () => {
  const [investmentType, setInvestmentType] = useState<string>(
    DEFAULT_INVESTMENT_TYPE,
  );
  const isYearly = investmentType === "Yearly";
  const [periodicInvestment, setPeriodicInvestment] = useState<number>(
    DEFAULT_MONTHLY_INVESTMENT,
  );
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [annunityReturnRate, setAnnunityReturnRate] = useState<number>(
    DEFAULT_ANNUNITY_RETURN_RATE,
  );
  const [age, setAge] = useState<number>(DEFAULT_AGE);

  const interestRate = isYearly ? returnRate / 100 : returnRate / 100 / 12;
  const investmentDuration = isYearly
    ? RETIRENMENT_AGE - age
    : (RETIRENMENT_AGE - age) * 12;

  let estimatedReturn;
  if (interestRate === 0) {
    estimatedReturn = periodicInvestment * investmentDuration;
  } else {
    estimatedReturn = Math.round(
      periodicInvestment *
        (((1 + interestRate) ** investmentDuration - 1) / interestRate),
    );
  }

  const lumpsum = Math.round(estimatedReturn * 0.6);
  const annunity = estimatedReturn - lumpsum;
  const monthlyPension = (annunity * annunityReturnRate) / (100 * 12);

  const fieldValues = [
    {
      setFieldValue: setPeriodicInvestment,
      fieldValue: periodicInvestment,
      step: 1500,
      defaultFieldValue: DEFAULT_MONTHLY_INVESTMENT,
      minFieldValue: MIN_MONTHLY_INVESTMENT,
      maxFieldValue: MAX_MONTHLY_INVESTMENT,
      fieldLable: isYearly ? "Yearly Investment" : "Monthly Investment",
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
      setFieldValue: setAnnunityReturnRate,
      fieldValue: annunityReturnRate,
      step: 0.01,
      defaultFieldValue: DEFAULT_ANNUNITY_RETURN_RATE,
      minFieldValue: MIN_ANNUNITY_RETURN_RATE,
      maxFieldValue: MAX_ANNUNITY_RETURN_RATE,
      fieldLable: "Annunity Return Rate (p. a.)",
      fieldunit: "%",
      unitRightSide: true,
    },
    {
      setFieldValue: setAge,
      fieldValue: age,
      step: 0.5,
      defaultFieldValue: DEFAULT_AGE,
      minFieldValue: MIN_AGE,
      maxFieldValue: MAX_AGE,
      fieldLable: "Your Age",
      fieldunit: "Yr",
      unitRightSide: true,
    },
  ];

  const outputValues = [
    {
      label: "Invested Amount",
      value:
        "₹ " + formatINR(Math.round(periodicInvestment * investmentDuration)),
      color: "",
    },
    {
      label: "Lump Sum Withdrawal (60%)",
      value: "₹ " + formatINR(lumpsum),
      color: "",
    },
    {
      label: "Amount Used for Annuity (40%)",
      value: "₹ " + formatINR(annunity),
      color: "",
    },
    {
      label: "Estimated Monthly Pension",
      value: "₹ " + formatINR(Math.round(monthlyPension)),
      color: "",
    },
    {
      label: "Returns",
      value:
        "₹ " +
        formatINR(
          Math.round(estimatedReturn - periodicInvestment * investmentDuration),
        ),
      color: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: "₹ " + formatINR(estimatedReturn),
  };

  const chartData = [
    {
      label: "Investment",
      value: periodicInvestment * investmentDuration,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: Math.round(
        estimatedReturn - periodicInvestment * investmentDuration,
      ),
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
      <div className="flex flex-col gap-2">
        <p className="font-medium">Select type of investment:</p>
        <Select
          value={investmentType}
          onValueChange={(value) => setInvestmentType(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="z-111">
            <SelectGroup>
              {DROP_DOWN_ITEMS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
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

export default NPSCalculator;
