import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Pie, PieChart } from "recharts";

const CalculatorChart = ({
  chartConfig,
  data,
}: {
  chartConfig: ChartConfig;
  data: any[];
}) => {
  return (
    <Card className="border-none shadow-none max-w-70 sm:max-w-100 p-0">
      <CardHeader className="p-0">
        <CardTitle className="flex items-center justify-center gap-10">
          {data.map((data) => (
            <div key={data.label} className="flex items-center gap-4">
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
            innerRadius={80}
            isAnimationActive={true}
          />
        </PieChart>
      </ChartContainer>
    </Card>
  );
};

export default CalculatorChart;
