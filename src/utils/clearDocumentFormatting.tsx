export async function clearDocumentFormatting(bold: boolean, highlight: string | null, color: string | null) {
  await Word.run(async (context) => {
    // Get the entire body of the document
    const body = context.document.body;
    body.load("font");
    await context.sync();
    console.log("clear", bold, highlight, color);
    // Clear all formatting for the entire document
    // body.font.bold = bold;
    // body.font.highlightColor = highlight;
    // body.font.color = color;

    body.font.bold = false;
    body.font.highlightColor = null;
    body.font.color = color;

    // console.log("clear2", body.font.bold, body.font.highlightColor, body.font.color);

    await context.sync();
  });
}
