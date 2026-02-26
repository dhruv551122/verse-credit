import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn, formatINR } from "@/lib/utils";
import { NumericFormat } from "react-number-format";
const CalculatorField = ({
  setFieldValue,
  fieldValue,
  step,
  minFiledValue,
  maxFieldValue,
  defaultFieldValue,
  fieldLable,
  filedUnit,
  unitRightSide,
}: {
  setFieldValue: React.Dispatch<React.SetStateAction<number>>;
  fieldValue: number;
  defaultFieldValue: number;
  step: number;
  minFiledValue: number;
  maxFieldValue: number;
  fieldLable: string;
  filedUnit?: string;
  unitRightSide?: boolean;
}) => {
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
            {filedUnit}
          </span>
          <NumericFormat
            value={fieldValue}
            thousandSeparator=","
            decimalScale={2}
            thousandsGroupStyle="lakh"
            allowNegative={false}
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
          {/* <Input
            className={cn(
              "text-right! text-base! font-source-sans-3",
              unitRightSide ? "pr-6" : "pl-5",
            )}
            value={formatINR(fieldValue)}
            onChange={(e) => {
              const input = Number(e.target.value.replace(/,/g, ""));
              if (Number.isNaN(input)) return;
              if (input > maxFieldValue) {
                setFieldValue(maxFieldValue);
                return;
              }
              setFieldValue(input);
            }}
          /> */}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Slider
          defaultValue={[defaultFieldValue]}
          value={[fieldValue]}
          step={step}
          min={minFiledValue}
          max={maxFieldValue}
          onValueChange={(e) => {
            setFieldValue(e[0]);
          }}
        />
        <div className="flex items-center justify-between text-sm text-metallic-grey font-source-sans-3">
          <span>
            {unitRightSide
              ? `${formatINR(minFiledValue)}${filedUnit}`
              : `${filedUnit} ${formatINR(minFiledValue)}`}
          </span>
          <span>
            {unitRightSide
              ? `${formatINR(maxFieldValue)}${filedUnit}`
              : `${filedUnit} ${formatINR(maxFieldValue)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorField;
