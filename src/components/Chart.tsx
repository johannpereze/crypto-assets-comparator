import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ethereumPrices, solanaPrices } from "@/utils/prices";
import { format } from "date-fns";
import { useState } from "react";

export const description = "An interactive bar chart";

export type PriceData = [number, number];
type MergedPriceData = {
  date: string;
  ethereum?: number;
  solana?: number;
};

// const chartConfig = {
//   views: {
//     label: "Page Views",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

const chartConfig = {
  last_week: {
    label: "Last Week",
    color: "hsl(var(--chart-1))",
  },
  last_month: {
    label: "Last Month",
    color: "hsl(var(--chart-2))",
  },
  last_year: {
    label: "Last Year",
    color: "hsl(var(--chart-2))",
  },
  ethereum: {
    label: "Ethereum",
    color: "hsl(var(--chart-2))",
  },
  solana: {
    label: "Solana",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("last_week");

  // const total = useMemo(
  //   () => ({
  //     last_week: chartData.reduce((acc, curr) => acc + curr.last_week, 0),
  //     last_month: chartData.reduce((acc, curr) => acc + curr.last_month, 0),
  //     last_year: chartData.reduce((acc, curr) => acc + curr.last_month, 0),
  //   }),
  //   []
  // );

  const total = {
    last_week: 0,
    last_month: 0,
    last_year: 0,
  };

  // const [timeRange] = useState("90d");
  // const filteredData = chartData.filter((item) => {
  //   const date = new Date(item.date);
  //   const referenceDate = new Date("2024-06-30");
  //   let daysToSubtract = 90;
  //   if (timeRange === "30d") {
  //     daysToSubtract = 30;
  //   } else if (timeRange === "7d") {
  //     daysToSubtract = 7;
  //   }
  //   const startDate = new Date(referenceDate);
  //   startDate.setDate(startDate.getDate() - daysToSubtract);
  //   return date >= startDate;
  // });

  const mergePrices = (
    ethPrices: PriceData[],
    solPrices: PriceData[]
  ): MergedPriceData[] => {
    const merged: { [key: string]: MergedPriceData } = {};

    ethPrices.forEach(([timestamp, price]) => {
      const date = format(new Date(timestamp), "yyyy-MM-dd");
      if (!merged[date]) {
        merged[date] = { date };
      }
      merged[date].ethereum = price;
    });

    solPrices.forEach(([timestamp, price]) => {
      const date = format(new Date(timestamp), "yyyy-MM-dd");
      if (!merged[date]) {
        merged[date] = { date };
      }
      merged[date].solana = price;
    });

    return Object.values(merged);
  };

  const mergedPrices = mergePrices(ethereumPrices, solanaPrices);

  return (
    <div className="flex justify-center w-full p-4">
      <div className="min-w-[16rem] max-w-xl w-full">
        <Card>
          <CardHeader className="flex flex-column items-stretch space-y-0 border-b p-0">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
              <CardTitle>Comparison Chart</CardTitle>
              <CardDescription>
                Select up to 2 assets to compare
              </CardDescription>
            </div>
            <div className="flex">
              {["last_week", "last_month", "last_year"].map((key) => {
                const chart = key as keyof typeof chartConfig;
                return (
                  <button
                    key={chart}
                    data-active={activeChart === chart}
                    className="relative z-30 flex flex-1 flex-col justify-center items-center gap-1 border-t px-3 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:px-8 sm:py-6"
                    onClick={() => setActiveChart(chart)}
                  >
                    <span className="text-xs text-muted-foreground">
                      {chartConfig[chart].label}
                    </span>
                    <span className="text-lg font-bold leading-none sm:text-3xl">
                      {total[key as keyof typeof total].toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={mergedPrices}>
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-mobile)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                      indicator="dot"
                    />
                  }
                />
                <Area
                  dataKey="ethereum"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-last_week)"
                  stackId="a"
                />
                <Area
                  dataKey="solana"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-last_month)"
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
