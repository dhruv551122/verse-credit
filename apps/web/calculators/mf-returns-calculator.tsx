"use client";

import { useState } from "react";
import CalculatorContainer from "@/components/common/calculator-common/calculator-container";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { capitalizeFirstLetter, formatINR } from "@/lib/utils";

const DEFAULT_INVESTMENT = 10000;
const DEFAULT_RETURN_RATE = 12;
const DEFAULT_TENURE_YEARS = 5;

const MAX_INVESTMENT = 1000000;
const MAX_RETURN_RATE = 35;
const MAX_TENURE_YEARS = 35;

const MIN_INVESTMENT = 100;
const MIN_RETURN_RATE = 1;
const MIN_TENURE_YEARS = 1;

const MFReturnsCalculator = () => {
  const [investment, setInvestment] = useState<number>(DEFAULT_INVESTMENT);
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RETURN_RATE);
  const [tenure, setTenure] = useState<number>(DEFAULT_TENURE_YEARS);

  const interestRate = returnRate / 100;
  let estimatedReturn;
  if (interestRate === 0) {
    estimatedReturn = investment;
  } else {
    estimatedReturn = investment * (1 + interestRate) ** tenure;
  }

  function MFBreakdown(P: number, r: number, n: number) {
    let amount = P; // Initial investment
    const result = [];

    for (let year = 1; year <= n; year++) {
      amount = Math.round(amount * (1 + r));

      const totalReturn = amount - P;

      result.push({
        year,
        investedAmount: P, // remains constant (lumpsum)
        yearEndValue: amount,
        totalReturn,
      });
    }

    return result;
  }

  const investmentValues = MFBreakdown(investment, interestRate, tenure);

  const barChartData = investmentValues.map(
    ({ year, investedAmount, totalReturn }) => ({
      year,
      investedAmount,
      totalReturn,
    }),
  );

  const fieldValues = [
    {
      setFieldValue: setInvestment,
      fieldValue: investment,
      step: 1500,
      defaultFieldValue: DEFAULT_INVESTMENT,
      minFieldValue: MIN_INVESTMENT,
      maxFieldValue: MAX_INVESTMENT,
      fieldLable: "Investment",
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
      value: `₹ ${formatINR(Math.round(Number(investment)))}`,
      color: "",
    },

    {
      label: "Returns",
      value: `₹ ${formatINR(Math.round(Number(estimatedReturn - investment)))}`,
      color: "#5ca81d",
    },
  ];

  const maturity = {
    label: "Maturity Value",
    value: "₹ " + formatINR(Math.round(estimatedReturn)),
  };

  const chartData = [
    {
      label: "Investment",
      value: investment,
      fill: "#1b5183",
    },
    {
      label: "Est. Returns",
      value: Math.round(estimatedReturn - investment),
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
      <div className="w-full h-px bg-pale-silver" />
      <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-5 font-source-sans-3">
        <Card className="order-2 w-full h-full gap-0 p-0 border rounded-md shadow-none lg:order-1 lg:col-span-3 max-h-100 border-pale-silver">
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
                dataKey="investedAmount"
                label="Total Invested"
                fill="#1b5183"
                radius={4}
                maxBarSize={30}
              />
              <Bar
                dataKey="totalReturn"
                label="Total Return"
                fill="#5ca81d"
                radius={4}
                maxBarSize={30}
              />
            </BarChart>
          </ChartContainer>
          <CardFooter>
            <CardTitle className="flex items-center justify-center w-full gap-6 text-sm text-gray-500 sm:gap-10">
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
        <div className="order-1 w-full overflow-hidden rounded-xl lg:order-2 lg:col-span-2">
          <div className="w-full overflow-auto border custom-scrollbar rounded-xl border-pale-silver max-h-100">
            <table className="w-full">
              <thead className="sticky top-0 left-0 z-1">
                <tr className="[&>th]:px-4 [&>th]:py-2 bg-isabelline text-dark-aquamarine-green [&>th]:whitespace-nowrap">
                  <th className="sticky top-0 left-0 bg-isabelline ">Year</th>
                  <th>Total Investment</th>
                  <th>Retruns</th>
                  <th>Maturity Value</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {investmentValues.map((values, index) => (
                  <tr
                    key={index}
                    className="[&>td]:px-4 [&>td]:py-2 border-b border-pale-silver [&>td]:text-right [&>td]:whitespace-nowrap"
                  >
                    <td className="text-left!  sticky left-0 bg-white ">
                      {values.year}
                    </td>
                    <td>₹ {formatINR(values.investedAmount)}</td>
                    <td>₹ {formatINR(values.totalReturn)}</td>
                    <td>₹ {formatINR(values.yearEndValue)}</td>
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

export default MFReturnsCalculator;
