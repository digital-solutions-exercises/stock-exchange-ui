export const chartConfig = {
  "1D": { resolution: "1h", days: 1, weeks: 0, months: 0, years: 0 },
  "1W": { resolution: "1d", days: 0, weeks: 1, months: 0, years: 0 },
  "3M": { resolution: "1wk", days: 0, weeks: 0, months: 3, years: 0 },
  "1Y": { resolution: "1wk", days: 0, weeks: 0, months: 0, years: 1 },
  "5Y": { resolution: "1mo", days: 0, weeks: 0, months: 0, years: 5 },
};

export type ResolutionType = "1h" | "1d" | "1wk" | "1mo";

export type FilterType = keyof typeof chartConfig;
