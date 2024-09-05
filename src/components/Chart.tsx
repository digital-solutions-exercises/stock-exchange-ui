import { useContext, useEffect, useMemo, useState } from "react";
import { createDate } from "../utils/handleDates.util";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  chartConfig,
  FilterType,
  ResolutionType,
} from "../constants/chartConfig";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import { convertDateToUnixTimestamp } from "../utils/handleDates.util";
import { getYahooHistoryData } from "../api/yahooData";
import StockContext from "../context/StockContext";
import { YahooHistoryDataRow } from "../types/yahooData.types";

const Chart = () => {
  const [data, setData] = useState<{ value: string; date: string }[]>([]);
  const [filter, setFilter] = useState<FilterType>("1Y");

  const { darkTheme } = useContext(ThemeContext)!;
  const { stockSymbol } = useContext(StockContext)!;

  const formatData = (
    data: YahooHistoryDataRow[],
  ): { value: string; date: string }[] => {
    return data.map(({ close, date }) => {
      return {
        value: close.toFixed(2),
        date: new Date(date).toLocaleDateString(),
      };
    });
  };

  const calculateDomain = (
    data: { value: string; date: string }[],
  ): number[] | string[] => {
    if (data.length === 0) return ["auto", "auto"];

    const values = data.map((item) => parseFloat(item.value));
    const min = Math.min(...values);
    const max = Math.max(...values);

    const margin = (max - min) * 0.1;

    return [min - margin, max + margin];
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];

      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);

      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);

      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution as ResolutionType;

        const result = await getYahooHistoryData(
          stockSymbol,
          resolution,
          startTimestampUnix,
          endTimestampUnix,
        );
        setData(formatData(result));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  const yAxisDomain = useMemo(() => calculateDomain(data), [data]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-40">
        {(Object.keys(chartConfig) as FilterType[]).map((item: FilterType) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item);
                }}
              />
            </li>
          );
        })}
      </ul>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={darkTheme ? "#321e81" : "rgb(199 210 254)"}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={darkTheme ? "#321e81" : "rgb(199 210 254)"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#321e81"
            fillOpacity={1}
            strokeWidth={0.5}
            fill="url(#chartColor)"
          />
          <Tooltip
            contentStyle={
              darkTheme ? { backgroundColor: "#111827" } : undefined
            }
            itemStyle={darkTheme ? { color: "#818cf8" } : undefined}
          />
          <XAxis dataKey={"date"} />
          <YAxis domain={yAxisDomain} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
