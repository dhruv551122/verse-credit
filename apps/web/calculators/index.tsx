import { ReactNode } from "react";
import EMICalculator from "./emi-calculator";
import SIPCalculator from "./sip-calculator";
import LumpsumCalculator from "./lumpsum-calculator";

export const calculators: { [key: string]: ReactNode } = {
  "emi-calculator": <EMICalculator />,
  "sip-calculator": <SIPCalculator />,
  "lumpsum-calculator": <LumpsumCalculator />,
};
