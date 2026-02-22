"use client";

import { ChartConfig } from "@/components/ui/chart";
import { SetStateAction, useState } from "react";
import CalculatorField from "./calculatorField";
import CalculatorChart from "./calculatorChart";

type CalculatorContainerProps = {
  title: string;
  fieldValues: {
    inputValue: number;
    setFieldValue: React.Dispatch<SetStateAction<number>>;
    setInputValue: React.Dispatch<SetStateAction<number>>;
    fieldValue: number;
    step: number;
    defaultFieldValue: number;
    minFieldValue: number;
    maxFieldValue: number;
    fieldLable: string;
    fieldunit: string;
    unitRightSide?: boolean;
  }[];
  maturity: Record<string, string | number>;
  // outputLable: string;
  outputValues: Record<string, string | number>[];
  chartConfig: ChartConfig;
  chartData: { label: string; value: number; fill: string }[];
  canShowYearsDetail: boolean;
};

const CalculatorContainer = ({
  title,
  fieldValues,
  outputValues,
  // outputLable,
  chartConfig,
  chartData,
  maturity,
  // canShowYearsDetail,
}: CalculatorContainerProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start ">
        <div className="w-full ">
          <div className="flex flex-col gap-10">
            {fieldValues.map((fieldValue) => (
              <CalculatorField
                key={fieldValue.fieldLable}
                // inputValue={fieldValue.inputValue}
                setFieldValue={fieldValue.setFieldValue}
                // setInputValue={fieldValue.setInputValue}
                fieldValue={fieldValue.fieldValue}
                // setError={setErrors}
                defaultFieldValue={fieldValue.defaultFieldValue}
                step={fieldValue.step}
                minFiledValue={fieldValue.minFieldValue}
                maxFieldValue={fieldValue.maxFieldValue}
                fieldLable={fieldValue.fieldLable}
                filedUnit={fieldValue.fieldunit}
                unitRightSide={fieldValue.unitRightSide}
              />
            ))}
          </div>
        </div>
        <div className="self-stretch w-full h-px lg:w-px lg:min-h-full bg-pale-silver" />
        <div className="flex flex-col items-center w-full gap-10">
          <div className="flex flex-wrap justify-center w-full gap-10 p-4 text-base border-b rounded-lg border-pale-silver">
            {outputValues.map((outputValue) => (
              <div
                key={outputValue.label}
                className="flex flex-col items-center shrink-0 "
              >
                <span className="text-sm text-teal-grey">
                  {outputValue.label}
                </span>
                <span className="text-xl font-medium">
                  ₹{Math.round(Number(outputValue.value) ?? 0)}
                </span>
              </div>
            ))}
          </div>
          <CalculatorChart
            maturity={maturity}
            chartConfig={chartConfig}
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorContainer;
