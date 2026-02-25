"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, Label, XAxis } from "recharts";
import { capitalizeFirstLetter } from "@/lib/utils";

const DEFAULT_YEARLY_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 12;
const DEFAULT_TENURE_YEARS = 5;

const MAX_YEARLY_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_YEARLY_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TENURE_YEARS = 1;

const YearlySIPCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(
    DEFAULT_YEARLY_INVESTMENT,
  );
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);

  const yearlyInterestRate = returnRate / 100;
  let estimatedReturn;
  if (yearlyInterestRate === 0) {
    estimatedReturn = yearlyInvestment * tenure;
  } else {
    estimatedReturn =
      yearlyInvestment *
      (((1 + yearlyInterestRate) ** tenure - 1) / yearlyInterestRate) *
      (1 + yearlyInterestRate);
  }

  function yearlySIPBreakdown(P: number, r: number, n: number) {
    let amount = 0;
    let totalInvested = 0;
    const result = [];

    for (let year = 1; year <= n; year++) {
      totalInvested += P;

      const beforeReturn = amount + P;
      amount = Math.round(beforeReturn * (1 + r));

      const yearlyReturn = amount - totalInvested;

      result.push({
        year,
        investedThisYear: P,
        totalInvested,
        yearEndValue: amount,
        totalReturn: yearlyReturn,
      });
    }

    return result;
  }

  const yearlyInvestmentValues = yearlySIPBreakdown(
    yearlyInvestment,
    yearlyInterestRate,
    tenure,
  );

  const barChartData = yearlyInvestmentValues.map(
    ({ year, totalInvested, totalReturn }) => ({
      year,
      totalInvested,
      totalReturn,
    }),
  );

  const fieldValues = [
    {
      setFieldValue: setYearlyInvestment,
      fieldValue: yearlyInvestment,
      step: 1500,
      defaultFieldValue: DEFAULT_YEARLY_INVESTMENT,
      minFieldValue: MIN_YEARLY_INVESTMENT,
      maxFieldValue: MAX_YEARLY_INVESTMENT,
      fieldLable: "Yearly Investment",
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
      value: yearlyInvestment * tenure,
      unit: "₹",
    },

    {
      label: "Total value",
      value: estimatedReturn - yearlyInvestment * tenure,
      unit: "₹",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: Math.round(estimatedReturn),
  };

  const chartData = [
    {
      label: "Investment",
      value: yearlyInvestment * tenure,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: Math.round(estimatedReturn - yearlyInvestment * tenure),
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
    <div className="flex flex-col gap-10">
      <CalculatorContainer
        fieldValues={fieldValues}
        outputValues={outputValues}
        chartConfig={chartConfig}
        chartData={chartData}
        maturity={maturity}
      />
      <div className="h-px w-full bg-pale-silver" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <Card className="gap-0 order-2 lg:order-1 lg:col-span-3 w-full p-0 shadow-none h-full max-h-100 border border-pale-silver rounded-md">
          <ChartContainer
            config={chartConfig}
            className="max-h-90 text-gray shrink"
          >
            <BarChart data={barChartData}>
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    label={"Total Invested"}
                    labelClassName="gap-10"
                    labelFormatter={(label) => capitalizeFirstLetter(label)}
                  />
                }
              />
              <Bar
                dataKey="totalInvested"
                label="Total Invested"
                fill="#1b5183"
                radius={4}
              />
              <Bar
                dataKey="totalReturn"
                label="Total Return"
                fill="#5ca81d"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
          <CardFooter>
            <CardTitle className="flex items-center justify-center w-full text-sm text-gray-500 gap-6 sm:gap-10">
              <div className="flex items-center gap-2">
                <div
                  className="rounded-[4px] size-3"
                  style={{ backgroundColor: "#1b5183" }}
                />{" "}
                <span className="capitalize">Total Invested</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="rounded-[4px] size-3"
                  style={{ backgroundColor: "#5ca81d" }}
                />{" "}
                <span className="capitalize">Total Return</span>
              </div>
            </CardTitle>
          </CardFooter>
        </Card>
        <div className="rounded-xl order-1 lg:order-2 lg:col-span-2 overflow-hidden w-full">
          <div className="custom-scrollbar rounded-xl border border-pale-silver max-h-100 overflow-auto w-full">
            <table className="w-full">
              <thead className="sticky top-0 left-0 z-1">
                <tr className="[&>th]:px-4 [&>th]:py-2 bg-isabelline text-dark-aquamarine-green [&>th]:whitespace-nowrap">
                  <th className="sticky left-0 top-0 bg-isabelline ">Year</th>
                  <th>Total Investment</th>
                  <th>Retruns</th>
                  <th>Maturity Value</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {yearlyInvestmentValues.map((values, index) => (
                  <tr
                    key={index}
                    className="[&>td]:px-4 [&>td]:py-2 border-b border-pale-silver [&>td]:text-right [&>td]:whitespace-nowrap"
                  >
                    <td className="text-left!  sticky left-0 bg-white ">
                      {values.year}
                    </td>
                    <td>₹ {values.totalInvested}</td>
                    <td>₹ {values.totalReturn}</td>
                    <td>₹ {values.yearEndValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlySIPCalculator;
