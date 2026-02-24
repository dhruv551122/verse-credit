import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 text-base md:flex-row md:items-center md:justify-between">
        <h4 className="font-semibold uppercase text-gray-500">{fieldLable}</h4>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon />
            </TooltipTrigger>
            <TooltipContent>
              <p>Minimum value allowed is {minFiledValue}</p>
            </TooltipContent>
          </Tooltip>
          <div className={cn("relative font-semibold")}>
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2",
                unitRightSide ? "right-2" : "left-2",
              )}
            >
              {filedUnit}
            </span>
            <Input
              className={cn(
                "text-right! text-base!",
                unitRightSide ? "pr-6" : "pl-5",
              )}
              value={fieldValue}
              onChange={(e) => {
                const input = Number(e.target.value);
                if (Number.isNaN(input)) return;
                if (input > maxFieldValue) {
                  setFieldValue(maxFieldValue);
                  return;
                }
                setFieldValue(input);
              }}
            />
          </div>
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
          // color="#ef9309"
          // className="bg-strong-amber [data-slot=slider-range]:bg-strong-amber"
        />
        <div className="flex justify-between items-center text-sm text-metallic-grey">
          <span>
            {unitRightSide
              ? `${minFiledValue}${filedUnit}`
              : `${filedUnit}${minFiledValue}`}
          </span>
          <span>
            {unitRightSide
              ? `${maxFieldValue}${filedUnit}`
              : `${filedUnit}${maxFieldValue}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculatorField;
