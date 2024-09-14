import { FC, useContext, useEffect, useMemo, useState } from "react";
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
import { GET_YAHOO_HISTORY_DATA } from "../graphql/yahooData";
import { chartConfig, FilterType, ResolutionType } from "../config/chart";
import ChartFilter from "./ChartFilter";
import ThemeContext from "../context/ThemeContext";
import { convertDateToUnixTimestamp } from "../utils/handleDates.util";
import StockContext from "../context/StockContext";
import { YahooHistoryDataRow } from "../types/yahooData.types";
import { useLazyQuery } from "@apollo/client";

const Chart: FC = () => {
  const [data, setData] = useState<{ value: string; date: string }[]>([]);
  const [filter, setFilter] = useState<FilterType>("1Y");

  const { darkTheme } = useContext(ThemeContext)!;
  const { stockSymbol } = useContext(StockContext)!;

  const formatData = (
    data: YahooHistoryDataRow[],
  ): { value: string; date: string }[] => {
    return data
      .filter(({ close }) => close !== null)
      .map(({ close, date }) => {
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

    const yMin = (min - margin).toFixed(2);
    const yMax = (max + margin).toFixed(2);

    return [Number(yMin), Number(yMax)];
  };

  const persistData = (
    filter: FilterType,
    data: { value: string; date: string }[],
  ) => {
    localStorage.setItem(
      `chartData_${filter}_${stockSymbol}`,
      JSON.stringify(data),
    );
  };

  const loadPersistedData = (filter: FilterType) => {
    const storedData = localStorage.getItem(
      `chartData_${filter}_${stockSymbol}`,
    );
    return storedData ? JSON.parse(storedData) : null;
  };

  const getDateRange = () => {
    const { days, weeks, months, years } = chartConfig[filter];

    const endDate = new Date();
    const startDate = createDate(endDate, -days, -weeks, -months, -years);

    const startTimestampUnix = convertDateToUnixTimestamp(startDate);
    const endTimestampUnix = convertDateToUnixTimestamp(endDate);

    return { startTimestampUnix, endTimestampUnix };
  };

  const [fetchYahooHistoryData, { loading, error, data: historicalData }] =
    useLazyQuery(GET_YAHOO_HISTORY_DATA);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    const persistedData = loadPersistedData(filter);

    if (persistedData) {
      setData(persistedData);
      return;
    }

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution as ResolutionType;

        await fetchYahooHistoryData({
          variables: {
            stockSymbol,
            resolution,
            startDate: startTimestampUnix,
            endDate: endTimestampUnix,
          },
        });
      } catch (err) {
        setData([]);
        console.log(err);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  useEffect(() => {
    if (historicalData) {
      const formattedData = formatData(historicalData.getHistoricalData);
      setData(formattedData);
      persistData(filter, formattedData);
    }
  }, [historicalData]);

  const yAxisDomain = useMemo(() => calculateDomain(data), [data]);

  return (
    <Card>
      <ul className="flex absolute top-2 right-2 z-30">
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
