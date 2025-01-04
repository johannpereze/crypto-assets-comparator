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
import { SelectedAssets } from "@/interfaces/comparator";
import { MarketLocalStorageData } from "@/services/useGetMarketChartRange";
import { toCapitalCase } from "@/utils";
import { format } from "date-fns";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const description = "An interactive bar chart";

export type PriceData = [number, number];
type MergedPriceData = {
  date: string;
  [key: string]: string | number | undefined;
};

type ChartType = "last_week" | "last_month" | "last_year";

export function Chart({ selectedAssets }: { selectedAssets: SelectedAssets }) {
  const chartConfig = {
    a: {
      label: selectedAssets.a,
      color: "hsl(var(--chart-1))",
    },
    b: {
      label: selectedAssets.b,
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  const [activeChart, setActiveChart] = useState<ChartType>("last_year");
  const [value] = useLocalStorage<MarketLocalStorageData>("marketData", {});

  const mergePrices = (
    aPrices: PriceData[],
    bPrices: PriceData[]
  ): MergedPriceData[] => {
    const merged: { [key: string]: MergedPriceData } = {};

    if (aPrices) {
      aPrices.forEach(([timestamp, price]) => {
        const date = format(new Date(timestamp), "yyyy-MM-dd");
        if (!merged[date]) {
          merged[date] = { date };
        }
        merged[date].a = price;
      });
    }

    if (bPrices) {
      bPrices.forEach(([timestamp, price]) => {
        const date = format(new Date(timestamp), "yyyy-MM-dd");
        if (!merged[date]) {
          merged[date] = { date };
        }
        merged[date].b = price;
      });
    }

    return Object.values(merged);
  };

  const mergedPrices = mergePrices(
    value[selectedAssets.a || ""]?.prices,
    value[selectedAssets.b || ""]?.prices
  );

  const [timeRange, setTimeRange] = useState("last_year");
  const filteredData = mergedPrices.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 365;
    if (timeRange === "last_month") {
      daysToSubtract = 30;
    } else if (timeRange === "last_week") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

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
              {(["last_week", "last_month", "last_year"] as ChartType[]).map(
                (key) => {
                  const chart: ChartType = key;
                  return (
                    <button
                      key={chart}
                      data-active={activeChart === chart}
                      className="relative z-30 flex flex-1 flex-col justify-center items-center gap-1 border-t px-3 py-2 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:px-8 sm:py-6"
                      onClick={() => {
                        setTimeRange(chart);
                        setActiveChart(chart);
                      }}
                    >
                      <span className="text-lg">
                        {toCapitalCase(chart.replace("_", " "))}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[250px] w-full"
            >
              <AreaChart data={filteredData}>
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
                  dataKey="a"
                  type="natural"
                  fill="url(#fillMobile)"
                  stroke="var(--color-a)"
                  stackId="a"
                />
                <Area
                  dataKey="b"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-b)"
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
