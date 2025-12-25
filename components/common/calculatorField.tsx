import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { SetStateAction } from "react";
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
  setError,
  errors,
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
  setError: React.Dispatch<SetStateAction<string[]>>;
  unitRightSide?: boolean;
  errors: string[];
}) => {
  const isError = errors.includes(fieldLable);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-base">
        <h4 className=" font-semibold">{fieldLable}</h4>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Minimum value allowed is {minFiledValue}</p>
            </TooltipContent>
          </Tooltip>
          <div
            className={cn("relative font-semibold", isError && "text-red-600")}
          >
            <span
              className={cn(
                "absolute  top-1/2 -translate-y-1/2",
                unitRightSide ? "right-2" : "left-2"
              )}
            >
              {filedUnit}
            </span>
            <Input
              className={cn(
                "! text-right",
                unitRightSide ? "pr-6" : "pl-5",
                isError && "border-red-600! bg-red-300/50 ring-red-300! "
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
                if (input < minFiledValue) {
                  setError((prev) => [...prev, fieldLable]);
                  setFieldValue(minFiledValue);
                }
                if (input >= minFiledValue) {
                  setFieldValue(Number(e.target.value));
                  setError((prev) =>
                    prev.filter((item) => item !== fieldLable)
                  );
                }
              }}
            />
          </div>
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
          if (e[0] >= minFiledValue) {
            setError((prev) => prev.filter((item) => item !== fieldLable));
          }
        }}
      />
    </div>
  );
};

export default CalculatorField;
