"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-container";
import Amortization from "@/components/common/amortization";

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
    DEFAULT_INTEREST_RATE
  );
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);
  const [loanAmountInput, setLoanAmountInput] =
    useState<number>(DEFAULT_AMOUNT_VALUE);
  const [interestRateInput, setInterestRateInput] = useState<number>(
    DEFAULT_INTEREST_RATE
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
    let currentDate = new Date(startDate);

    for (let i = 1; i <= months; i++) {
      const interestForMonth = balance * monthlyInterestRate;
      const principalPaid = EMI - interestForMonth;
      balance -= principalPaid;

      allMonthsEMIDetail.push({
        year: currentDate.getFullYear(),
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

  function groupByKey(array: any[], key: string) {
    return array.reduce((accumulator: any[], currentItem: any) => {
      const groupValue = currentItem[key];

      if (!accumulator[groupValue]) {
        accumulator[groupValue] = [];
      }

      accumulator[groupValue].push(currentItem);

      return accumulator;
    }, {});
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
      label: "Monthly EMI",
      value: EMI,
    },
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

  const chartConfig = {
    principle: {
      name: "Principle",
      color: "#2a2a2a",
    },
    interest: {
      name: "Interest",
      color: "#9a9a9a",
    },
  };

  const chartData = [
    {
      label: "Loan Amount",
      value: loanAmount,
      fill: "#2a2a2a",
    },
    {
      label: "Interest",
      value: Math.round(EMI * months - loanAmount),
      fill: "#9a9a9a",
    },
  ];

  return (
    <div className="max-width-container padding-container">
      <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-10">
        <CalculatorContainer
          title="EMI Calculator"
          fieldValues={fieldValues}
          outputValues={outputValues}
          outputLable="Your Amortization Details (Yearly/Monthl)"
          chartConfig={chartConfig}
          chartData={chartData}
          canShowYearsDetail={true}
        />
        <Amortization
          groupedYearsDetail={groupedYearsDetail}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      </div>
    </div>
  );
}

export default EMICalculator
