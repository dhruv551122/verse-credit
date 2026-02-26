import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn, formatINR } from "@/lib/utils";
import { CalculatorFieldType } from "@/types";
import { NumericFormat } from "react-number-format";
const CalculatorField = ({
  fieldValues,
}: {
  fieldValues: CalculatorFieldType;
}) => {
  const {
    setFieldValue,
    fieldValue,
    step,
    defaultFieldValue,
    minFieldValue,
    maxFieldValue,
    fieldLable,
    fieldunit,
    unitRightSide,
    disabled,
  } = fieldValues;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 text-base md:flex-row md:items-center md:justify-between">
        <h4 className="font-medium text-gray-500 Capitalize">{fieldLable}</h4>

        <div className={cn("relative font-semibold")}>
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2",
              unitRightSide ? "right-2" : "left-2",
            )}
          >
            {fieldunit}
          </span>
          <NumericFormat
            value={fieldValue}
            thousandSeparator=","
            decimalScale={2}
            thousandsGroupStyle="lakh"
            allowNegative={false}
            disabled={disabled}
            customInput={Input}
            className={cn(
              "text-right! text-base! font-source-sans-3",
              unitRightSide ? "pr-6" : "pl-5",
            )}
            isAllowed={(values) => {
              const { floatValue } = values;
              return floatValue == null || floatValue <= maxFieldValue;
            }}
            onValueChange={(values) => {
              setFieldValue(values.floatValue || 0);
            }}
          />
        </div>
      </div>
      {!disabled && (
        <div className="flex flex-col gap-3">
          <Slider
            defaultValue={[defaultFieldValue]}
            value={[fieldValue]}
            step={step}
            min={minFieldValue}
            max={maxFieldValue}
            onValueChange={(e) => {
              setFieldValue(e[0]);
            }}
          />
          <div className="flex items-center justify-between text-sm text-metallic-grey font-source-sans-3">
            <span>
              {unitRightSide
                ? `${formatINR(minFieldValue)}${fieldunit}`
                : `${fieldunit} ${formatINR(minFieldValue)}`}
            </span>
            <span>
              {unitRightSide
                ? `${formatINR(maxFieldValue)}${fieldunit}`
                : `${fieldunit} ${formatINR(maxFieldValue)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorField;
