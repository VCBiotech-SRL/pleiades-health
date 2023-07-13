"use client";

import { formatNumber, random } from "@/lib/utils";
import { AreaChart, BadgeDelta, Card, Flex, Metric, Text } from "@tremor/react";
import { useMemo } from "react";

type OverviewStatsProps = {
  metric: string;
  total: number;
};

export default function OverviewStats({ metric, total }: OverviewStatsProps) {
  const data = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return [
      ...months.map((month) => ({
        Month: `${month} 23`,
        "Total Visitors": random(20000, 170418),
      })),
      {
        Month: "Jul 23",
        "Total Visitors": 170418,
      },
    ];
  }, []);

  return (
    <Card className="dark:!bg-secondary !rounded p-0 shadow-md hover:shadow-xl transition-all duration-300">
      <Text className="px-6 pt-6">{metric}</Text>
      <Flex
        className="space-x-3 truncate px-6"
        justifyContent="start"
        alignItems="baseline"
      >
        <Metric className="font-cal">{formatNumber(total)}</Metric>
        <BadgeDelta
          deltaType="moderateIncrease"
          className="dark:bg-green-900 dark:bg-opacity-50 dark:text-green-400"
        >
          34.3%
        </BadgeDelta>
      </Flex>
      <AreaChart
        className="mt-3 h-32 px-2"
        data={data}
        index="Month"
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}`
        }
        categories={["Total Visitors"]}
        colors={["stone"]}
        showXAxis={true}
        showGridLines={false}
        startEndOnly={true}
        showYAxis={false}
        showLegend={false}
      />
    </Card>
  );
}
