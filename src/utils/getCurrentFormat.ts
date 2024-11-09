export async function getCurrentFormat() {
  const styles = { bold: false, highlight: null, color: "black" };
  console.log("bold: false, highlight: null, color: ", styles);
  await Word.run(async (context) => {
    const body = context.document.body;
    body.load("font");
    await context.sync();
    styles.bold = body.font.bold;
    styles.highlight = body.font.highlightColor;
    styles.color = body.font.color;

    await context.sync();
  });
  return styles;
}
