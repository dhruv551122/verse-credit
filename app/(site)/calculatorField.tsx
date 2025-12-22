import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
const CalculatorField = ({
  inputValue,
  setFieldValue,
  setInputValue,
  fieldValue,
  step,
  minFiledValue,
  maxFieldValue,
  defaultFieldValue,
  fieldLable,
  filedUnit,
  unitRightSide,
}: {
  inputValue: number;
  setFieldValue: React.Dispatch<React.SetStateAction<number>>;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h4 className="text-xl font-semibold">{fieldLable}</h4>
        <div className="relative">
          <span
            className={cn(
              "absolute text-xl top-1/2 -translate-y-1/2",
              unitRightSide ? "right-2" : "left-2"
            )}
          >
            {filedUnit}
          </span>
          <Input
            className={cn(
              "text-xl! text-right",
              unitRightSide ? "pr-6" : "pl-5"
            )}
            value={inputValue}
            onChange={(e) => {
              const input = Number(e.target.value);

              if (Number.isNaN(input)) return;

              if (input > maxFieldValue) {
                setFieldValue(maxFieldValue);
                setInputValue(maxFieldValue);
                return;
              }
              setInputValue(input);
              if (input >= minFiledValue) {
                setFieldValue(Number(e.target.value));
              }
            }}
          />
        </div>
      </div>
      <Slider
        defaultValue={[defaultFieldValue]}
        value={[fieldValue]}
        step={step}
        min={minFiledValue}
        max={maxFieldValue}
        onValueChange={(e) => {
          setFieldValue(e[0]);
          setInputValue(e[0]);
        }}
      />
    </div>
  );
};

export default CalculatorField;
