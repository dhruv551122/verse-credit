import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SetStateAction, useState } from "react";
import { cn, formatDateToMonth } from "@/lib/utils";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const MonthPicker = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDateToMonth(date) : <span>Pick a month and year</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
      className="w-fit"
        align="start"
      >
        <Calendar
          endMonth={new Date(new Date().getFullYear() + 20, 0)}
          className="p-0 h-fit"
          month={date}
          classNames={{
            button_next: "hidden",
            button_previous: "hidden",
            weekday: "hidden",
            months: "flex",
            month: "gap-0",
            // Add a class name to hide the day grid elements
            day: "hidden", // This hides individual days, but the grid structure remains
            head_row: "hidden ", // Hides the day headers (Sun, Mon, etc.)
            row: "hidden", // Hides the rows of days
            week: "mt-0",
          }}
          captionLayout="dropdown"
          onMonthChange={(month) => setDate(month)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthPicker;
