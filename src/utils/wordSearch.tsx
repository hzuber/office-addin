 export async function wordSearch(query:string, matchCase:boolean = false){ await Word.run(async (context) => {
    console.log("search ran", query, matchCase)
    // Queue a command to search the document with a wildcard
    // for any string of characters that starts with 'to' and ends with 'n'.
    const searchResults = context.document.body.search(query, {matchWildcards: true});

    // Queue a command to load the search results and get the font property values.
    searchResults.load('font');
    
    // Synchronize the document state by executing the queued commands, 
    // and return a promise to indicate task completion.
    await context.sync();
    console.log('Found count: ' + searchResults.items.length);

    // Queue a set of commands to change the font for each found item.
    for (let i = 0; i < searchResults.items.length; i++) {
        searchResults.items[i].font.highlightColor = 'yellow';
        searchResults.items[i].font.bold = true;
    }
    console.log(searchResults)
    
    // Synchronize the document state by executing the queued commands, 
    // and return a promise to indicate task completion.
    await context.sync();
})}
