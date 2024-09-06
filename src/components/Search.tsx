import React, { useContext, useState } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
import { getYahooSearchQuotes } from "../api/yahooData";
import { YahooSearchQuote } from "../types/yahooData.types";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState<YahooSearchQuote[]>([]);

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await getYahooSearchQuotes(input);
        setBestMatches(searchResults);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const { darkTheme } = useContext(ThemeContext)!;

  return (
    <div
      data-testid="search-component-id"
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-full sm:w-96 ${darkTheme ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"}`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounder-md ${darkTheme ? "bg-gray-900" : null}`}
        placeholder="Search stock"
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />

      {input && (
        <button onClick={clear} className="m-1" aria-label="Clear input">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
        aria-label="Search input"
      >
        <MagnifyingGlassIcon className="h-4 w-4 fill-gray-100" />
      </button>

      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} setBestMatches={setBestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
