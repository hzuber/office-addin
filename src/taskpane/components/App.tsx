import React, { useEffect, useState } from "react";
import { Provider } from "../../components/ui/provider";
import SearchBar from "./SearchBar";
import { MatchObj, wordSearch } from "../../utils/wordSearch";
import { getCurrentFormat } from "../../utils/getCurrentFormat";
import { clearDocumentFormatting } from "../../utils/clearDocumentFormatting";
import { SearchResults } from "./SearchResults";
import { Container } from "@chakra-ui/react";

// export type MatchObj = {
//   best: Word.Range[];
//   good: Word.Range[];
//   all: Word.Range[];
// };

const App = () => {
  const [styles, setStyles] = useState({ bold: false, highlight: null, color: "auto" });
  const [matches, setMatches] = useState<MatchObj>();
  const [resultLimit, setResultLimit] = useState(3);

  async function search(query: string, matchCase: boolean) {
    const items = await wordSearch(query, matchCase);
    console.log("matches", items);
    setMatches(items);
  }

  useEffect(() => {
    const fetchCurrent = async () => {
      const result = await getCurrentFormat().then((res) => {
        setStyles(res);
      });
      return result;
    };

    fetchCurrent();
  }, []);

  useEffect(() => {
    console.log("current", styles);
  }, [styles]);

  async function reformat() {
    await clearDocumentFormatting(styles.bold, styles.highlight, styles.color);
  }

  return (
    <Provider>
      {/* <Component {...pageProps} /> */}
      <Container width="100%">
        <SearchBar
          onSearch={search}
          clearFormatting={reformat}
          resultLimit={resultLimit}
          setResultLimit={setResultLimit}
        />
        <SearchResults matches={matches} resultLimit={resultLimit} />
      </Container>
    </Provider>
  );
};
export default App;
