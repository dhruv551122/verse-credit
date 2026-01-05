"use client";

import CalculatorChart from "@/components/common/calculatorChart";
import CalculatorField from "@/components/common/calculatorField";
import { SetStateAction, useState } from "react";
import { ChartConfig } from "../ui/chart";

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
  outputLable: string;
  outputValues: {
    label: string;
    value: number;
  }[];
  chartConfig: ChartConfig;
  chartData: { label: string; value: number; fill: string }[];
  canShowYearsDetail: boolean;
};

const CalculatorContainer = ({
  title,
  fieldValues,
  outputValues,
  outputLable,
  chartConfig,
  chartData,
  canShowYearsDetail,
}: CalculatorContainerProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="flex lg:flex-row items-center lg:items-start flex-col gap-10  ">
        <div className="w-full ">
          <div className="flex flex-col gap-10">
            {fieldValues.map((fieldValue) => (
              <CalculatorField
                key={fieldValue.fieldLable}
                inputValue={fieldValue.inputValue}
                setFieldValue={fieldValue.setFieldValue}
                setInputValue={fieldValue.setInputValue}
                fieldValue={fieldValue.fieldValue}
                setError={setErrors}
                errors={errors}
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

          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex flex-col gap-4 text-base">
            <h2 className="text-2xl font-semibold mb-2">{outputLable}</h2>
            {outputValues.map((outputValue) => (
              <div
                key={outputValue.label}
                className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{outputValue.label}</span>
                <span className="font-bold">
                  ₹{Math.round(outputValue.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <CalculatorChart chartConfig={chartConfig} data={chartData} />
      </div>
    </div>
  );
};

export default CalculatorContainer;
