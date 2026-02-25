"use client";

import { ChartConfig } from "@/components/ui/chart";
import { SetStateAction } from "react";
import CalculatorField from "./calculatorField";
import CalculatorChart from "./calculatorChart";

type CalculatorContainerProps = {
  fieldValues: {
    setFieldValue: React.Dispatch<SetStateAction<number>>;
    fieldValue: number;
    step: number;
    defaultFieldValue: number;
    minFieldValue: number;
    maxFieldValue: number;
    fieldLable: string;
    fieldunit: string;
    unitRightSide?: boolean;
  }[];
  maturity?: Record<string, string | number>;
  outputValues: Record<string, string | number>[];
  chartConfig: ChartConfig;
  chartData: { label: string; value: number; fill: string }[];
};

const CalculatorContainer = ({
  fieldValues,
  outputValues,
  chartConfig,
  chartData,
  maturity,
}: CalculatorContainerProps) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start ">
        <div className="w-full ">
          <div className="flex flex-col gap-6 md:gap-10">
            {fieldValues.map((fieldValue) => (
              <CalculatorField
                key={fieldValue.fieldLable}
                setFieldValue={fieldValue.setFieldValue}
                fieldValue={fieldValue.fieldValue}
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
        <div className="self-stretch w-full h-px lg:w-px lg:h-auto bg-pale-silver" />
        <div className="flex flex-col items-center w-full gap-4 font-source-sans-3">
          <div className="flex flex-wrap justify-center w-full gap-10 pb-4 text-base border-b rounded-lg border-pale-silver">
            {outputValues.map((outputValue) => (
              <div
                key={outputValue.label}
                className="flex flex-col items-center shrink-0 "
              >
                <span className="text-sm text-teal-grey">
                  {outputValue.label}
                </span>
                <span
                  className="flex items-center gap-1 text-xl font-medium"
                  style={{ color: `${outputValue.color}` }}
                >
                  {outputValue.value}
                </span>
              </div>
            ))}
          </div>
          <CalculatorChart
            maturity={maturity ?? false}
            chartConfig={chartConfig}
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculatorContainer;
