export async function getCurrentFormat() {
  const styles = { bold: false, highlight: null, color: "black" };
  await Word.run(async (context) => {
    const body = context.document.body;
    body.load("font");
    await context.sync();

    //find what the original formatting is, so we don't set the whole documents styling with the search results
    styles.bold = body.font.bold;
    styles.highlight = body.font.highlightColor;
    styles.color = body.font.color;
    // console.log("current styles", body.font.bold, body.font.highlightColor, body.font.color);
    await context.sync();
  });
  return styles;
}
