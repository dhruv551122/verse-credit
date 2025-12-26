"use client";

import CalculatorChart from "@/components/common/calculatorChart";
import CalculatorField from "@/components/common/calculatorField";
import { CirclePlus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import CalculatorTable from "./claculatorTable";
import { SetStateAction, useState } from "react";
import { ChartConfig } from "../ui/chart";
import { cn } from "@/lib/utils";

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
  groupedYearsDetail?: any[];
  canShowYearsDetail: boolean;
};

const CalculatoContainer = ({
  title,
  fieldValues,
  outputValues,
  outputLable,
  chartConfig,
  chartData,
  groupedYearsDetail,
  canShowYearsDetail,
}: CalculatorContainerProps) => {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [yearsDetailPageCount, setYearsDetailPageCount] = useState<number>(0);

  return (
    <div className="max-width-container padding-container">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div className="border border-gray-300 rounded-lg p-6 shadow-md flex flex-col gap-10">
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
        {canShowYearsDetail && (
          <div
            className={cn(
              "flex flex-col gap-6 max-h-16 transition-all duration-300 overflow-hidden",
              isAccordianOpen && "max-h-1000"
            )}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="font-bold">
                Detailed Amortization Schedule (Monthly and Yearly)
              </p>

              <CirclePlus
                role="button"
                onClick={() => {
                  setIsAccordianOpen((prev) => !prev);
                  if (yearsDetailPageCount > 0) {
                    setYearsDetailPageCount(0);
                  }
                  if (yearsDetailPageCount === 0) {
                    setYearsDetailPageCount(1);
                  }
                }}
                className={cn(
                  "transition-all duration-300 self-center w-full size-8",
                  isAccordianOpen && "rotate-45"
                )}
              />
            </div>

            {groupedYearsDetail && isAccordianOpen && errors.length === 0 && (
              <Accordion type="multiple" className="w-full">
                {Object.keys(groupedYearsDetail)
                  .slice(0, yearsDetailPageCount * 5)
                  .map((detail) => (
                    <AccordionItem key={detail} value={detail}>
                      <AccordionTrigger>{detail}</AccordionTrigger>
                      <AccordionContent>
                        <CalculatorTable data={groupedYearsDetail[detail as any]} />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            )}
            {groupedYearsDetail &&
              isAccordianOpen &&
              Object.keys(groupedYearsDetail).length >
                yearsDetailPageCount * 5 && (
                <div className="w-full flex items-center justify-center">
                  <button
                    className="py-2 px-4 bg-black text-white w-fit align-center rounded-md"
                    onClick={() => setYearsDetailPageCount((prev) => prev + 1)}
                  >
                    Load More
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatoContainer;
