// SearchInput.tsx

import React from "react";
import { Input, IconButton, Flex } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, onChange, onSearch }) => (
  <Flex width="100%" maxWidth="400px">
    <Input variant="flushed" placeholder="Search document" value={query} onChange={onChange} />
    <IconButton variant="outline" size={"sm"} aria-label="Launch search" onClick={onSearch}>
      <LuSearch />
    </IconButton>
  </Flex>
);

export default SearchInput;
