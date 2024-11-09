// useSearchState.ts

import { useState } from "react";

export const useSearchState = (
  initialLimit: number,
  setResultLimit: (limit: number) => void,
  clearFormatting: () => void
) => {
  const defaultPlaceholder = "Search document";
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [caseMatch, setCaseMatch] = useState(false);
  const [limit, setLimit] = useState(initialLimit);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value.length === 0) clearFormatting();
  };

  const toggleCaseMatch = () => setCaseMatch((prev) => !prev);

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setResultLimit(newLimit);
  };

  const reset = (onSearch: (query: string, matchCase: boolean) => Promise<void>, matchCase: boolean) => {
    setQuery("");
    setPlaceholder(defaultPlaceholder);
    clearFormatting();
    onSearch("", matchCase);
  };

  return {
    query,
    caseMatch,
    limit,
    handleQueryChange,
    handleLimitChange,
    toggleCaseMatch,
    reset,
  };
};
