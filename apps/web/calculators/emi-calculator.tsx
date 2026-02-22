"use client";

import { useState } from "react";
import Amortization from "@/components/common/calculator-common/amortization";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";

const DEFAULT_AMOUNT_VALUE = 100000;
const DEFAULT_INTEREST_RATE = 3.8;
const DEFAULT_TENURE_YEARS = 3;

const MAX_AMOUNT_VALUE = 100000000;
const MAX_INTEREST_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_AMOUNT_VALUE = 10000;
const MIN_INTEREST_RATE = 1;
const MIN_TENURE_YEARS = 1;

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(DEFAULT_AMOUNT_VALUE);
  const [interestRate, setInterestRate] = useState<number>(
    DEFAULT_INTEREST_RATE,
  );
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);
  const [loanAmountInput, setLoanAmountInput] =
    useState<number>(DEFAULT_AMOUNT_VALUE);
  const [interestRateInput, setInterestRateInput] = useState<number>(
    DEFAULT_INTEREST_RATE,
  );
  const [tenureInput, setTenureInput] = useState<number>(DEFAULT_TENURE_YEARS);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const monthlyInterestRate = interestRate / 100 / 12;
  const months = tenure * 12;

  const EMI =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);

  const individualMonthsInterest = () => {
    let balance = loanAmount;
    const allMonthsEMIDetail = [];

    // clone startDate so state is untouched
    const currentDate = new Date(startDate);

    for (let i = 1; i <= months; i++) {
      const interestForMonth = balance * monthlyInterestRate;
      const principalPaid = EMI - interestForMonth;
      balance -= principalPaid;

      allMonthsEMIDetail.push({
        year: currentDate.getFullYear().toString(),
        month: currentDate.toLocaleString("default", { month: "short" }),
        interestForMonth: Math.round(interestForMonth),
        balance: Math.round(balance),
        principlePaid: Math.round(principalPaid),
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return allMonthsEMIDetail;
  };
  const allMonthEMIDetail = individualMonthsInterest();

  function groupByKey<
    T extends Record<string, string | number>,
    K extends keyof T,
  >(array: T[], key: K): Record<T[K] & (string | number), T[]> {
    return array.reduce(
      (acc, item) => {
        const groupValue = item[key] as T[K] & (string | number);

        if (!acc[groupValue]) {
          acc[groupValue] = [];
        }

        acc[groupValue].push(item);

        return acc;
      },
      {} as Record<T[K] & (string | number), T[]>,
    );
  }

  const groupedYearsDetail = groupByKey(allMonthEMIDetail, "year");

  const fieldValues = [
    {
      inputValue: loanAmountInput,
      setFieldValue: setLoanAmount,
      setInputValue: setLoanAmountInput,
      fieldValue: loanAmount,
      step: 1000,
      defaultFieldValue: DEFAULT_AMOUNT_VALUE,
      minFieldValue: MIN_AMOUNT_VALUE,
      maxFieldValue: MAX_AMOUNT_VALUE,
      fieldLable: "Loan Amount",
      fieldunit: "₹",
      unitRightSide: false,
    },
    {
      inputValue: interestRateInput,
      setFieldValue: setInterestRate,
      setInputValue: setInterestRateInput,
      fieldValue: interestRate,
      step: 0.01,
      defaultFieldValue: DEFAULT_INTEREST_RATE,
      minFieldValue: MIN_INTEREST_RATE,
      maxFieldValue: MAX_INTEREST_RATE,
      fieldLable: "Interest Rate (p. a.)",
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
      fieldLable: "Years",
      fieldunit: "Yr",
      unitRightSide: true,
    },
  ];

  const outputValues = [
    {
      label: "Principle Amount",
      value: loanAmount,
    },
    {
      label: "Total Interest",
      value: EMI * months - loanAmount,
    },
    {
      label: "Total Amount",
      value: EMI * months,
    },
  ];

  const maturity = {
    label: "Monthly EMI",
    value: Math.round(EMI),
  };

  const chartConfig = {
    principle: {
      name: "Principle",
      color: "#1b5183",
    },
    interest: {
      name: "Interest",
      color: "#5ca81d",
    },
  };

  const chartData = [
    {
      label: "Loan Amount",
      value: loanAmount,
      fill: "#1b5183",
    },
    {
      label: "Interest",
      value: Math.round(EMI * months - loanAmount),
      fill: "#5ca81d",
    },
  ];

  return (
    <div className="max-width-container padding-container">
      <div className="flex flex-col gap-10 ">
        <CalculatorContainer
          title="EMI Calculator"
          fieldValues={fieldValues}
          outputValues={outputValues}
          chartConfig={chartConfig}
          chartData={chartData}
          canShowYearsDetail={true}
          maturity={maturity}
        />
        <Amortization
          groupedYearsDetail={groupedYearsDetail}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>
    </div>
  );
};

export default EMICalculator;
