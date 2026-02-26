import { SetStateAction } from "react";

export type CalculatorFieldType = {
  setFieldValue: React.Dispatch<SetStateAction<number>>;
  fieldValue: number;
  step: number;
  defaultFieldValue: number;
  minFieldValue: number;
  maxFieldValue: number;
  fieldLable: string;
  fieldunit: string;
  unitRightSide?: boolean;
  disabled?: boolean;
};
