export async function clearDocumentFormatting(bold: boolean, highlight: string | null, color: string | null) {
  await Word.run(async (context) => {
    const body = context.document.body;
    body.load("font");
    await context.sync();

    body.font.bold = bold;
    body.font.highlightColor = highlight;
    body.font.color = color;

    await context.sync();
  });
}
