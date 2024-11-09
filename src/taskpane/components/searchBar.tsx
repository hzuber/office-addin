// SearchBar.tsx

import React from "react";
import { Flex, Input } from "@chakra-ui/react";
import { useSearchState } from "../../hooks/useSearchState";
import SearchInput from "./SearchInput";
import ClearButton from "./ClearButton";
import CaseCheckbox from "./CaseCheckbox";

interface Props {
  onSearch: (query: string, matchCase: boolean) => Promise<void>;
  clearFormatting: () => void;
  resultLimit: number;
  setResultLimit: (limit: number) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, clearFormatting, resultLimit, setResultLimit }) => {
  const { query, caseMatch, limit, handleQueryChange, handleLimitChange, toggleCaseMatch, reset } = useSearchState(
    resultLimit,
    setResultLimit,
    clearFormatting
  );

  const handleSearch = () => {
    clearFormatting();
    onSearch(query, caseMatch);
  };

  return (
    <Flex width="100%" direction="column" alignItems="flex-end">
      <Flex width="100%" my="4" justify="flex-start" gap="2" alignItems="flex-end">
        <ClearButton onClear={() => reset(onSearch, caseMatch)} />
        <SearchInput query={query} onChange={handleQueryChange} onSearch={handleSearch} />
      </Flex>
      <Flex width="100%" direction="column" alignItems="flex-end">
        <CaseCheckbox isChecked={caseMatch} onChange={toggleCaseMatch} />
        <Flex alignItems="center" mt="3">
          <Input type="number" width="70px" mx="2" value={limit} onChange={handleLimitChange} />
          <p>Limit search results</p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchBar;
