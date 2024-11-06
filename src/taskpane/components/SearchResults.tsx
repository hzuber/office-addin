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
    // for (var i = 0; i < matchesArray.length; i++) {
    //   resultList.push(...matchesArray[i]);
    //   console.log(i);
    //   if (i === 2) break;
    // }
    let i = 0;

    matchesArray.map((arr) => {
      arr.map((item) => {
        i < resultLimit && resultList.push(item);
        i++;
      });
    });
  }

  const handleClick = async (range: Word.Range) => {
    console.log("nice to have, select on doc", range.text);
    // await Word.run(async (context) => {
    //   range.load();
    //   await context.sync();
    //   range.select(Word.SelectionMode.start);
    // });
  };

  return (
    <Container width="100%" mt="4">
      <h3>Top {resultLimit} search results in order of match precision</h3>
      <ul>
        {resultList.map((match, index) => (
          <li key={index}>
            <button type="button" onClick={() => handleClick(match.item)}>
              {match.fullText}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
