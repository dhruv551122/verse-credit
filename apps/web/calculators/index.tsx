import { ReactNode } from "react";
import EMICalculator from "./emi-calculator";
import SIPCalculator from "./sip-calculator";
import LumpsumCalculator from "./lumpsum-calculator";
import PositionSizeCalculator from "./position-size-calculator";
import FDCalculator from "./fd-calculator";
import CompoundInterestCalculator from "./compound-interest-calculator";

export const calculators: { [key: string]: ReactNode } = {
  "emi-calculator": <EMICalculator />,
  "sip-calculator": <SIPCalculator />,
  "lumpsum-calculator": <LumpsumCalculator />,
  "position-size-calculator": <PositionSizeCalculator />,
  "fd-calculator": <FDCalculator />,
  "compound-interest-calculator": <CompoundInterestCalculator />,
};
