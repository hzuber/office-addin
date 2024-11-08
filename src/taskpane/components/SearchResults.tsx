import { Container } from "@chakra-ui/react";
import { Match, MatchObj } from "../../utils/wordSearch";

interface PropTypes {
  matches: MatchObj;
  resultLimit: number;
}

export const SearchResults = ({ matches, resultLimit }: PropTypes) => {
  const resultList: Match[] = [];
  const matchesArray = matches && Object.values(matches);
  if (matchesArray) {
    let i = 0;

    matchesArray.map((arr) => {
      arr.map((item) => {
        i < resultLimit && resultList.push(item);
        i++;
      });
    });
  }

  const handleLinkClick = async (range: Word.Range) => {
    console.log("nice to have, select on doc", range.text);
  };

  return (
    <Container width="100%" mt="4">
      <h3>Top {resultLimit} search results in order of match precision</h3>
      <ul>
        {resultList.map((match, index) => (
          <li key={index}>
            <button type="button" onClick={() => handleLinkClick(match.item)}>
              {match.fullText}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
