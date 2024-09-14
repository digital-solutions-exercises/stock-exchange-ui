import { gql } from "@apollo/client";

export const GET_YAHOO_HISTORY_DATA = gql`
  query GetHistoricalData(
    $stockSymbol: String!
    $resolution: String!
    $startDate: Float!
    $endDate: Float!
  ) {
    getHistoricalData(
      stockSymbol: $stockSymbol
      resolution: $resolution
      startDate: $startDate
      endDate: $endDate
    ) {
      date
      close
    }
  }
`;
