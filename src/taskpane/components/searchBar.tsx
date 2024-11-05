import React, { ChangeEvent, useState } from 'react';
import {
  Input,
  IconButton,
  Box,
  Kbd,
  Container,
  Flex,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { IoIosClose } from "react-icons/io";
import { InputGroup } from '../../components/ui/input-group';
import { Checkbox } from '../../components/ui/checkbox';

interface Props{
   onSearch: (query: string, matchCase:boolean) => Promise<void>;
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder]= useState("Search document")
  const [caseMatch, setCaseMatch] = useState(false)

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setPlaceholder("Search document")
    onSearch('', caseMatch); // Clear search results if `onSearch` is provided
  };

  const handleSearch = () => {
    setQuery("")
    onSearch(query, caseMatch);
    setPlaceholder(query)
  };

  return (
    <Container width="100%">
      <Flex width="100%" my="4" justify={"flex-start"} gap="2" alignItems={"center"}>
        <IconButton variant={"surface"} size={"sm"} aria-label="Cancel search" onClick={()=> handleClear()}>
          <IoIosClose/>
        </IconButton>
        <InputGroup maxWidth={"400px"} width={"100%"}>
          <Input variant="flushed"  placeholder={placeholder} onChange={(e)=>handleInputChange(e)}/>
        </InputGroup>
        <IconButton variant="outline" size={"sm"}  marginStart={"auto"} aria-label="Launch search" onClick={()=> handleSearch()}>
          <LuSearch />
        </IconButton>
      </Flex>
      <Checkbox variant={"subtle"} checked={caseMatch}
      onCheckedChange={(e) => setCaseMatch(!!e.checked)}>Case-sensitive search</Checkbox>
    </Container>
  );
};

export default SearchBar;
