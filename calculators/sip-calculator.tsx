"use client";

import { useState } from "react";
import CalculatoContainer from "@/components/common/calculator-container";
import { cn } from "@/lib/utils";

const DEFAULT_MONTHLY_INVESTMENT = 1000;
const DEFAULT_RETURN_RATE = 3.8;
const DEFAULT_TENURE_YEARS = 3;

const MAX_MONTHLY_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_MONTHLY_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TENURE_YEARS = 1;

// FV = P × ({[(1 + i)^n – 1] / i}) × (1 + i), while for Lumpsum it's FV = P * (1 + r/n)^(nt)

const SIPCalculator = () => {
  const [sipType, setSipType] = useState<"monthly" | "lumpsum">("monthly");
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(
    DEFAULT_MONTHLY_INVESTMENT
  );
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);
  const [monthlyInvestmentInput, setmonthlyInvestmentInput] = useState<number>(
    DEFAULT_MONTHLY_INVESTMENT
  );
  const [returnRateInput, setReturnRateInput] =
    useState<number>(DEFAULT_RETURN_RATE);
  const [tenureInput, setTenureInput] = useState<number>(DEFAULT_TENURE_YEARS);

  const monthlyInterestRate = returnRate / 100 / 12;
  const months = tenure * 12;

  const estimatedReturn =
    sipType === "monthly"
      ? monthlyInvestment *
        (((1 + monthlyInterestRate) ** months - 1) / monthlyInterestRate)
      : monthlyInvestment * (1 + returnRate / 100) ** tenure;

  const chartConfig = {
    principle: {
      name: "Investment",
      color: "#2a2a2a",
    },
    interest: {
      name: "Est. Returns",
      color: "#9a9a9a",
    },
  };

  const fieldValues = [
    {
      inputValue: monthlyInvestmentInput,
      setFieldValue: setMonthlyInvestment,
      setInputValue: setmonthlyInvestmentInput,
      fieldValue: monthlyInvestment,
      step: 1500,
      defaultFieldValue: DEFAULT_MONTHLY_INVESTMENT,
      minFieldValue: MIN_MONTHLY_INVESTMENT,
      maxFieldValue: MAX_MONTHLY_INVESTMENT,
      fieldLable: "Monthly Investment",
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
      value:
        sipType === "monthly" ? monthlyInvestment * months : monthlyInvestment,
    },
    {
      label: "Estimated Return",
      value:
        sipType === "monthly"
          ? Math.round(estimatedReturn - monthlyInvestment * months)
          : Math.round(estimatedReturn - monthlyInvestment),
    },
    {
      label: "Total value",
      value: estimatedReturn,
    },
  ];

  const chartData = [
    {
      label: "Investment",
      value:
        sipType === "monthly" ? monthlyInvestment * months : monthlyInvestment,
      fill: "#2a2a2a",
    },
    {
      label: "Est. Returns",
      value:
        sipType === "monthly"
          ? Math.round(estimatedReturn - monthlyInvestment * months)
          : Math.round(estimatedReturn - monthlyInvestment),
      fill: "#9a9a9a",
    },
  ];

  return (
    <div>
      <div className="max-width-container padding-container flex items-center pb-0!">
        <div
          role="button"
          className={cn(
            "cursor-pointer py-2 px-4 text-white border-b border-black  duration-300",
            sipType === "monthly" ? "bg-[#9a9a9a] " : "bg-[#2a2a2a]"
          )}
          onClick={() => setSipType("monthly")}
        >
          Monthly
        </div>
        <div
          role="button"
          className={cn(
            "cursor-pointer py-2 px-4 text-white border-b border-black duration-300",
            sipType === "lumpsum" ? "bg-[#9a9a9a] " : "bg-[#2a2a2a] "
          )}
          onClick={() => setSipType("lumpsum")}
        >
          Lumpsum
        </div>
      </div>
      <div className="max-width-container padding-container">
        <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-10">
          <CalculatoContainer
            title="SIP Calculator"
            fieldValues={fieldValues}
            outputValues={outputValues}
            outputLable="Estimated Investment Detail"
            chartConfig={chartConfig}
            chartData={chartData}
            canShowYearsDetail={false}
          />
        </div>
      </div>
    </div>
  );
}

export default SIPCalculator