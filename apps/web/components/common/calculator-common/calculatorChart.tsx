import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

const CalculatorChart = ({
  chartConfig,
  data,
}: {
  chartConfig: ChartConfig;
  data: {
    label: string;
    value: number;
    fill: string;
  }[];
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card className="gap-0 p-0 border-none shadow-none max-w-70 sm:max-w-100">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-center gap-6 sm:gap-10">
          {data.map((data) => (
            <div key={data.label} className="flex items-center gap-2">
              <div className="size-4" style={{ backgroundColor: data.fill }} />{" "}
              <span>{capitalizeFirstLetter(data.label)}</span>
            </div>
          ))}
        </CardTitle>
      </CardHeader>
      <ChartContainer config={chartConfig} className="h-60 sm:h-100 text-gray">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            dataKey="value"
            nameKey="label"
            data={data}
            innerRadius={isSmallScreen ? 60 : 100}
            isAnimationActive={true}
          />
        </PieChart>
      </ChartContainer>
    </Card>
  );
};

export default CalculatorChart;
