import React, { ChangeEvent, useState } from "react";
import { Input, IconButton, Container, Flex } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { IoIosClose } from "react-icons/io";
import { InputGroup } from "../../components/ui/input-group";
import { Checkbox } from "../../components/ui/checkbox";

interface Props {
  onSearch: (query: string, matchCase: boolean) => Promise<void>;
  clearFormatting: () => void;
  resultLimit: number;
  setResultLimit: (limit: number) => void;
}

const SearchBar: React.FC<Props> = ({ onSearch, clearFormatting, resultLimit, setResultLimit }) => {
  const defaultPlaceholder = "Search document";
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);
  const [caseMatch, setCaseMatch] = useState(false);
  const [limit, setLimit] = useState(resultLimit);

  async function reset() {
    setQuery("");
    setPlaceholder(defaultPlaceholder);
    clearFormatting();
  }

  const changeLimit = (e) => {
    setLimit(Number(e.target.value));
    setResultLimit(Number(e.target.value));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value.length, query.length);
    e.target.value.length === 0 && clearFormatting();
    setQuery(e.target.value);
  };

  const handleClear = () => {
    reset();
    onSearch("", caseMatch);
  };

  const handleSearch = () => {
    clearFormatting();
    onSearch(query, caseMatch);
  };

  return (
    <Flex width="100%" direction="column" alignItems="flex-end">
      <Flex width="100%" my="4" justify={"flex-start"} gap="2" alignItems={"flex-end"}>
        <IconButton variant={"surface"} size={"xs"} aria-label="Cancel search" onClick={() => handleClear()}>
          <IoIosClose />
        </IconButton>
        <InputGroup marginStart={"auto"} maxWidth={"400px"} width={"100%"}>
          <Input variant="flushed" placeholder={placeholder} value={query} onChange={(e) => handleInputChange(e)} />
        </InputGroup>
        <IconButton variant="outline" size={"sm"} aria-label="Launch search" onClick={() => handleSearch()}>
          <LuSearch />
        </IconButton>
      </Flex>
      <Flex width="100%" direction="column" alignItems="flex-end">
        <Checkbox variant={"subtle"} checked={caseMatch} onCheckedChange={(e) => setCaseMatch(!!e.checked)}>
          Case-sensitive search
        </Checkbox>
        <Flex alignItems={"center"} mt="3">
          <Input type="number" width="50px" mx="2" value={limit} onChange={(e) => changeLimit(e)}></Input>
          <p>Limit search results</p>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchBar;
