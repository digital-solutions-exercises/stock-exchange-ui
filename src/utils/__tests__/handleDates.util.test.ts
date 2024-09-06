import {
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
  createDate,
} from "../handleDates.util";

describe("handleDates.util.ts", () => {
  describe("convertDateToUnixTimestamp", () => {
    test("should convert a Date object to a Unix timestamp", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const expectedTimestamp = Math.floor(date.getTime());

      const result = convertDateToUnixTimestamp(date);

      expect(result).toBe(expectedTimestamp);
    });
  });

  describe("convertUnixTimestampToDate", () => {
    test("should convert a Unix timestamp to a formatted date string", () => {
      const unixTimestamp = 1704067200;
      const expectedDateString = "1. 1. 2024";

      const result = convertUnixTimestampToDate(unixTimestamp);

      expect(result).toBe(expectedDateString);
    });

    test("should handle timestamp with time part", () => {
      const unixTimestamp = 1704103200;
      const expectedDateString = "1. 1. 2024";

      const result = convertUnixTimestampToDate(unixTimestamp);

      expect(result).toBe(expectedDateString);
    });
  });

  describe("createDate", () => {
    test("should create a new date by adding days", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const days = 5;
      const expectedDate = new Date("2024-01-06T00:00:00Z");

      const result = createDate(date, days);

      expect(result).toEqual(expectedDate);
    });

    test("should create a new date by adding weeks", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const weeks = 2;
      const expectedDate = new Date("2024-01-15T00:00:00Z");

      const result = createDate(date, 0, weeks);

      expect(result).toEqual(expectedDate);
    });

    test("should create a new date by adding months", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const months = 1;
      const expectedDate = new Date("2024-02-01T00:00:00Z");

      const result = createDate(date, 0, 0, months);

      expect(result).toEqual(expectedDate);
    });

    test("should create a new date by adding years", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const years = 1;
      const expectedDate = new Date("2025-01-01T00:00:00Z");

      const result = createDate(date, 0, 0, 0, years);

      expect(result).toEqual(expectedDate);
    });

    test("should create a new date by combining days, weeks, months, and years", () => {
      const date = new Date("2024-01-01T00:00:00Z");
      const days = 1;
      const weeks = 1;
      const months = 1;
      const years = 1;
      const expectedDate = new Date("2025-02-09T00:00:00Z");

      const result = createDate(date, days, weeks, months, years);

      expect(result).toEqual(expectedDate);
    });

    test("should create a new date if only date is defined", () => {
      const date = "2024-01-01T00:00:00Z";
      const expectedDate = new Date("2024-01-01T00:00:00Z");

      const result = createDate(date);

      expect(result).toEqual(expectedDate);
    });

    test("should handle string input date", () => {
      const date = "2024-01-01T00:00:00Z";
      const days = 10;
      const expectedDate = new Date("2024-01-11T00:00:00Z");

      const result = createDate(date, days);

      expect(result).toEqual(expectedDate);
    });
  });
});
