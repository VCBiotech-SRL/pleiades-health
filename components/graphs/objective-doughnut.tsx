import { DonutChart } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 12,
  },
  {
    name: "London",
    sales: 24,
  },
];

export function ObjetivesChart() {
  return (
    <DonutChart
      className="h-20 text-base"
      data={cities}
      category="sales"
      index="name"
      colors={["slate", "sky", "indigo", "rose", "cyan", "amber"]}
    />
  );
}
