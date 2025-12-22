"use client";

import { useState } from "react";
import CalculatorField from "./calculatorField";
import CalculatorChart from "./calculatorChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CalculatorTable from "./claculatorTable";

const DEFAULT_AMOUNT_VALUE = 100000;
const DEFAULT_INTEREST_RATE = 3.8;
const DEFAULT_TENURE_YEARS = 1;

const MAX_AMOUNT_VALUE = 100000000;
const MAX_INTEREST_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_AMOUNT_VALUE = 10000;
const MIN_INTEREST_RATE = 1;
const MIN_TENURE_YEARS = 1;

export default function Home() {
  const [principle, setPrinciple] = useState<number>(DEFAULT_AMOUNT_VALUE);
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

  const monthlyInterestRate = interestRate / 100 / 12;
  const months = tenure * 12;

  const EMI =
    (principle *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, months)) /
    (Math.pow(1 + monthlyInterestRate, months) - 1);
  // const fixedEMI = (principle + principle * 0.07 * 20) / months;

  const totalPayableAmount = EMI * months;
  const totalPayableInterest = totalPayableAmount - principle;
  // const fixedEMI = totalPayableAmount / months;

  const indivisulaMothsInterest = () => {
    let balance = principle;
    const allMonthsEMIDetail = [];
    for (let month = 1; month <= months; month++) {
      const interestForMonth = balance * monthlyInterestRate;
      balance -= EMI - interestForMonth;
      // console.log(`Month ${month}: Interest = ${interestForMonth.toFixed(2)}, Remaining Balance = ${balance.toFixed(2)}`);
      const date = new Date();
      date.setMonth(date.getMonth() + month);
      allMonthsEMIDetail.push({
        year: date.getFullYear(),
        month: date.toLocaleString("default", { month: "short" }),
        interestForMonth: Math.round(interestForMonth),
        balance: Math.round(balance),
        principlePaid: Math.round(EMI - interestForMonth),
      });
      // console.log(`Payment Date: ${date.toLocaleString('default', {month: 'short'})}`);
    }
    return allMonthsEMIDetail;
  };
  const allMonthEMIDetail = indivisulaMothsInterest();
  // console.log(allMonthEMIDetail);

  function groupByKey(array: any[], key: string) {
    return array.reduce((accumulator: any[], currentItem: any) => {
      const groupValue = currentItem[key];

      // If the group doesn't exist yet, create it as an empty array
      if (!accumulator[groupValue]) {
        accumulator[groupValue] = [];
      }

      // Push the current item into the appropriate group's array
      accumulator[groupValue].push(currentItem);

      return accumulator;
    }, {}); // Start with an empty object {}
  }

  const groupedYearsDetail = groupByKey(allMonthEMIDetail, "year");
  console.log(groupedYearsDetail);
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

  return (
    <div className="max-w-360 m-auto p-8">
      <h1 className="mb-4 text-3xl font-bold">EMI Calculator</h1>
      <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-10">
        <div className="flex lg:flex-row items-center lg:items-start flex-col gap-10  ">
          <div className="w-full ">
            <div className="flex flex-col gap-10">
              <CalculatorField
                inputValue={loanAmountInput}
                setFieldValue={setPrinciple}
                setInputValue={setLoanAmountInput}
                fieldValue={principle}
                defaultFieldValue={DEFAULT_AMOUNT_VALUE}
                step={1000}
                minFiledValue={MIN_AMOUNT_VALUE}
                maxFieldValue={MAX_AMOUNT_VALUE}
                fieldLable="Loan Amount"
                filedUnit="₹"
              />
              <CalculatorField
                inputValue={interestRateInput}
                setFieldValue={setInterestRate}
                setInputValue={setInterestRateInput}
                fieldValue={interestRate}
                defaultFieldValue={DEFAULT_INTEREST_RATE}
                step={0.01}
                minFiledValue={MIN_INTEREST_RATE}
                maxFieldValue={MAX_INTEREST_RATE}
                fieldLable="Interest Rate (Annual)"
                filedUnit="%"
                unitRightSide={true}
              />
              <CalculatorField
                inputValue={tenureInput}
                setFieldValue={setTenure}
                setInputValue={setTenureInput}
                fieldValue={tenure}
                defaultFieldValue={DEFAULT_TENURE_YEARS}
                step={1}
                minFiledValue={MIN_TENURE_YEARS}
                maxFieldValue={MAX_TENURE_YEARS}
                fieldLable="Tenure (Years)"
                unitRightSide={true}
                filedUnit="Yr"
              />
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">EMI Details</h2>
              <div className="w-full flex items-center justify-between text-lg">
                <span>Monthly EMI</span>
                <span className="font-bold">₹{Math.round(EMI)}</span>
              </div>
              <div className="w-full flex items-center justify-between text-lg">
                <span>Total Interest</span>
                <span className="font-bold">
                  ₹{Math.round(totalPayableInterest)}
                </span>
              </div>
              <div className="w-full flex items-center justify-between text-lg">
                <span>Principle</span>
                <span className="font-bold">₹{Math.round(principle)}</span>
              </div>
              <div className="w-full flex items-center justify-between text-lg">
                <span>Total Payment</span>
                <span className="font-bold">
                  ₹{Math.round(totalPayableAmount)}
                </span>
              </div>
            </div>
          </div>
          <CalculatorChart
            chartConfig={chartConfig}
            data={[
              {
                label: "principle",
                value: principle,
                fill: "#2a2a2a",
              },
              {
                label: "interest",
                value: totalPayableInterest,
                fill: "#9a9a9a",
              },
            ]}
          />
        </div>
        <Accordion type="multiple" className="w-full">
          {Object.keys(groupedYearsDetail).map((detail) => (
            <AccordionItem key={detail} value={detail}>
              <AccordionTrigger>{detail}</AccordionTrigger>
              <AccordionContent>
                <CalculatorTable data={groupedYearsDetail[detail]} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
