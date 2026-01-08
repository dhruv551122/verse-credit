import { CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import MonthPicker from "./month-picker";
import CalculatorTable from "./claculatorTable";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Amortization = ({
  groupedYearsDetail,
  startDate,
  setStartDate,
}: {
  groupedYearsDetail?: any[];

  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date>>;
}) => {
      const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false);
  const [yearsDetailPageCount, setYearsDetailPageCount] = useState<number>(0);
    
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-bold text-center">
          Detailed Amortization Schedule (Monthly and Yearly)
        </p>
        <CirclePlus
          role="button"
          onClick={() => {
            setIsAccordianOpen((prev) => !prev);
            if (yearsDetailPageCount > 0) {
              setYearsDetailPageCount(0);
            }
            if (yearsDetailPageCount === 0) {
              setYearsDetailPageCount(1);
            }
          }}
          className={cn(
            "transition-all duration-300 self-center w-full size-8",
            isAccordianOpen && "rotate-45"
          )}
        />
      </div>

      {groupedYearsDetail && isAccordianOpen  && (
        <div>
          <MonthPicker setDate={setStartDate} date={startDate} />
          <Accordion type="multiple" className="w-full">
            {Object.keys(groupedYearsDetail)
              .slice(0, yearsDetailPageCount * 5)
              .map((detail, index) => (
                <AccordionItem key={index} value={detail}>
                  <AccordionTrigger>{detail}</AccordionTrigger>
                  <AccordionContent>
                    <CalculatorTable data={groupedYearsDetail[detail as any]} />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      )}
      {groupedYearsDetail &&
        isAccordianOpen &&
        Object.keys(groupedYearsDetail).length > yearsDetailPageCount * 5 && (
          <div className="w-full flex items-center justify-center">
            <button
              className="py-2 px-4 bg-black text-white w-fit align-center rounded-md"
              onClick={() => setYearsDetailPageCount((prev) => prev + 1)}
            >
              Load More
            </button>
          </div>
        )}
    </div>
  );
};

export default Amortization