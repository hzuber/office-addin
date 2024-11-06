export type Match = {
  fullText: string;
  item: Word.Range;
};

export type MatchObj = {
  best: Match[];
  good: Match[];
  all: Match[];
};
export async function wordSearch(query: string, matchCase: boolean = false) {
  const matches: MatchObj = {
    best: [],
    good: [],
    all: [],
  };
  await Word.run(async (context) => {
    const searchResults = context.document.body.search(query, { matchCase: matchCase });
    searchResults.load(["font", "contentRange", "text", "items"]);
    await context.sync();

    //so each paragraph is only counted once
    const processedParagraphs = new Set();
    const processedItems = [];

    for (const item of searchResults.items) {
      const paragraph = item.paragraphs.getFirst();
      paragraph.load(["text", "font"]);
      item.load("font");
      await context.sync();

      item.font.highlightColor = "yellow";
      item.font.bold = true;
      await context.sync();

      const paragraphText = paragraph.text;
      if (processedParagraphs.has(paragraphText)) continue;
      processedParagraphs.add(paragraphText);

      const regex = new RegExp(`\\b\\w*${query}\\w*\\b`, "gi");
      let match: RegExpExecArray | null;
      while ((match = regex.exec(paragraphText)) !== null) {
        const fullWord = match[0];
        await context.sync();
        if (fullWord === query) {
          matches.best.push({ fullText: fullWord, item });
          processedItems.push({ range: item, color: "yellow" });
        } else if (fullWord.toLowerCase() === query.toLowerCase() && !matchCase) {
          matches.good.push({ fullText: fullWord, item });
          processedItems.push({ range: item, color: "gray" });
        } else if (fullWord.includes(query)) {
          console.log("include");
          matches.good.push({ fullText: fullWord, item });
          processedItems.push({ range: item, color: "gray" });
        } else if (!matchCase) {
          matches.all.push({ fullText: fullWord, item });
          processedItems.push({ range: item, color: "lightgray" });
        }
      }
    }

    const lastItem = searchResults.items[searchResults.items.length - 1];

    // Move the selection to right after the last search result so the app's settings don't change
    lastItem.select(Word.SelectionMode.end);
    context.sync();
  });
  return matches;
}
