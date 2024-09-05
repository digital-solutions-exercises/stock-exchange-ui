import { createContext, Dispatch, SetStateAction } from "react";

type StockContextType = {
  stockSymbol: string;
  setStockSymbol: Dispatch<SetStateAction<string>>;
};

const StockContext = createContext<StockContextType | undefined>(undefined);

export default StockContext;
