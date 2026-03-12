"use client";

import { IPieChart } from "@/lib/interfaces/common/chart.interface";
import ReactECharts from "echarts-for-react";

export default function PieChart({ data }: { data: IPieChart[] }) {
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} hrs ({d}%)",
    },

    legend: {
      bottom: 0,
    },

    series: [
      {
        type: "pie",
        radius: ["40%", "80%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: data.map((d) => ({
          value: d.value,
          name: d.label,
          itemStyle: { color: d.color },
        })),

        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: "bold",
            formatter: "{b}\n{c} hrs",
          },
        },

        label: { show: false },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
