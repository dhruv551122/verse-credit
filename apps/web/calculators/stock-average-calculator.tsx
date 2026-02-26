"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR, getOrdinal } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

const DEFAULT_NUMBER_OF_PURCHASES = 2;

const MAX_FIELD_VALUE = 999999999;

const StockAverageCalculator = () => {
  const [fieldValues, setFieldValues] = useState<
    { buyPrice: number; quantity: number }[]
  >(
    Array.from({ length: DEFAULT_NUMBER_OF_PURCHASES }, () => ({
      buyPrice: 0,
      quantity: 0,
    })),
  );

  const deletePurchase = (i: number) => {
    setFieldValues((prev) => prev.filter((_, index) => index !== i));
  };

  const handleReset = () => {
    const newFields = Array.from(
      { length: DEFAULT_NUMBER_OF_PURCHASES },
      () => ({
        buyPrice: 0,
        quantity: 0,
      }),
    );

    setFieldValues(newFields);
  };

  const { totalValue, totalQuantity } = fieldValues.reduce(
    (acc, curr) => {
      const value = curr.buyPrice * curr.quantity;

      acc.totalValue += value;

      if (curr.buyPrice > 0 && curr.quantity > 0) {
        acc.totalQuantity += curr.quantity;
      }

      return acc;
    },
    { totalValue: 0, totalQuantity: 0 },
  );
  let averageBuyPrice = 0;

  if (totalQuantity > 0) {
    averageBuyPrice = totalValue / totalQuantity;
  }

  const outputValues = [
    {
      label: "Total Quantity",
      value: formatINR(totalQuantity),
      color: "",
    },

    {
      label: "Average Price",
      value: "₹ " + formatINR(Number(averageBuyPrice.toFixed(2))),
      color: "",
    },
    {
      label: "Total Value",
      value: "₹ " + formatINR(Number(totalValue.toFixed(2))),
      color: "#5ca81d",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        {fieldValues.map((value, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 text-base lg:flex-row lg:items-center lg:justify-between py-4 border-b border-pale-silver relative"
          >
            <p className="font-medium">{`${getOrdinal(i + 1)} Purchase`}</p>

            <div className="flex items-center gap-4 md:gap-10">
              <div className="flex lg:flex-row flex-col w-full gap-2 lg:items-center">
                <p className="text-gray-500 capitalize shrink-0">Buy Price</p>
                <NumericFormat
                  value={fieldValues[i].buyPrice}
                  thousandSeparator=","
                  decimalScale={2}
                  thousandsGroupStyle="lakh"
                  allowNegative={false}
                  customInput={Input}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue == null || floatValue <= MAX_FIELD_VALUE;
                  }}
                  className="text-base! font-source-sans-3 w-full font-semibold"
                  onValueChange={(values) => {
                    const raw = values.floatValue ?? 0;

                    setFieldValues((prev) =>
                      prev.map((item, index) =>
                        index === i ? { ...item, buyPrice: raw } : item,
                      ),
                    );
                  }}
                />
              </div>
              <div className="flex lg:flex-row w-full flex-col gap-2 lg:items-center">
                <p className="text-gray-500 capitalize shrink-0">Quntity</p>
                <NumericFormat
                  value={fieldValues[i].quantity}
                  thousandSeparator=","
                  decimalScale={2}
                  thousandsGroupStyle="lakh"
                  allowNegative={false}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue == null || floatValue <= MAX_FIELD_VALUE;
                  }}
                  customInput={Input}
                  className="text-base! font-source-sans-3 w-full font-semibold"
                  onValueChange={(values) => {
                    const raw = values.floatValue ?? 0;

                    const safeValue = Math.min(raw, MAX_FIELD_VALUE);
                    setFieldValues((prev) =>
                      prev.map((item, index) =>
                        index === i ? { ...item, quantity: safeValue } : item,
                      ),
                    );
                  }}
                />
              </div>
              {i > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => deletePurchase(i)}
                  className="cursor-pointer duration-300 hover:border-strong-amber self-end max-lg:absolute relative max:right-0 max-lg:top-4"
                >
                  <Trash2 />
                </Button>
              ) : (
                <div className="min-w-10.5" />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() =>
            setFieldValues((prev) => [...prev, { buyPrice: 0, quantity: 0 }])
          }
          variant="primary"
          className="w-fit cursor-pointer"
        >
          + Add Purchase
        </Button>
        <Button
          className="w-fit py-6 px-6 cursor-pointer"
          variant="outline"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-10 py-4 border-t border-pale-silver text-base font-source-sans-3 rounded-lg">
        {outputValues.map((outputValue) => (
          <div
            key={outputValue.label}
            className="flex flex-col items-center shrink-0 "
          >
            <span className="text-sm text-teal-grey">{outputValue.label}</span>
            <span
              className="flex items-center gap-1 text-xl font-medium"
              style={{ color: `${outputValue.color}` }}
            >
              {outputValue.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAverageCalculator;
