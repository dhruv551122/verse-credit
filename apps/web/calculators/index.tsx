import { ReactNode } from "react";
import EMICalculator from "./emi-calculator";
import SIPCalculator from "./sip-calculator";

export const calculators: { [key: string]: ReactNode } = {
  "emi-calculator": <EMICalculator />,
  "sip-calculator": <SIPCalculator />,
  "sip-calculator-xdcd": <SIPCalculator />,
};
