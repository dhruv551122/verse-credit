import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

const CalculatorChart = ({
  chartConfig,
  data,
  maturity,
}: {
  chartConfig: ChartConfig;
  data: {
    label: string;
    value: number;
    fill: string;
  }[];
  maturity: Record<string, string | number> | false;
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
      <ChartContainer config={chartConfig} className="h-70 sm:h-100 text-gray">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            dataKey="value"
            nameKey="label"
            data={data}
            innerRadius={isSmallScreen ? 85 : 120}
            isAnimationActive={true}
          >
            {maturity && (
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-xl font-medium md:text-2xl fill-foreground"
                        >
                          {maturity.value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {maturity.label}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            )}
          </Pie>
        </PieChart>
      </ChartContainer>
      <CardFooter className="p-0">
        <CardTitle className="flex items-center justify-center w-full gap-6 sm:gap-10">
          {data.map((data) => (
            <div key={data.label} className="flex items-center gap-2">
              <div
                className="rounded-sm size-4"
                style={{ backgroundColor: data.fill }}
              />{" "}
              <span>{capitalizeFirstLetter(data.label)}</span>
            </div>
          ))}
        </CardTitle>
      </CardFooter>
    </Card>
  );
};

export default CalculatorChart;
