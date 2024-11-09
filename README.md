## ✨ Features

- **Search bar**: Press `Enter` or click the button to search for a term in your document.
- **Clear button**: Clears your current search and any highlighted words in your document.
- **Limit search results**: You can choose how many matching words you want to see.

## 🚀 Installation

1. Install the dependencies:

   `npm ci`

2. Run the development server:

   `npm run dev-server`

3. Sideload the manifest.xml file into Word (Desktop)
   `npm run start:desktop`

4. Or Sideload the manifest.xml file into Word (Web)
`npm run start:web`

5. Stop the Word Side Loading
   `npm run stop`

## 📚 Running in Word

1. Open Word.
2. In the Home taskbar, find the Add-In titled Show Taskpane with the cute little monster icon and click on it.

## 📜 Design and Structure

#### Design
This app has barely any design, only what I thought would work best regarding UX. The search bar is at the top of the add-in, with a clear button to the left and the search trigger button to the right. Below that is a number input box to decide how many search results you would like to see, and the list of matching words appears below it. 

#### Structure
A lot of this app came with the template I was using, and has to do with the functionality of creating a Word add-in, so I will not speak on that. 

The folders I added are:
````
src
   -components
      --ui
   -hooks
   -taskpane
      --components
   -utils
````

The components/ui folder is one added by [Chakra](https://www.chakra-ui.com/docs), a component design library.

## 🧩 Challenges and Concerns
1. **Managing contexts for `Range` objects**: Word’s JavaScript API requires each `Range` to be handled within its originating `Word.run` context. Attempting to use `Range` objects across contexts led to issues, especially when trying to implement navigation for each search result. To resolve this, we pass identifiers (like text snippets) instead of `Range` objects, allowing each function to recreate and use ranges reliably.

2. **Searching the document**: The Word API has an inbuilt search function, where you can decide whether you would like to case match the term (as well as several other options which I did not use in this add-in). This was determined by whether the user has checked off the case match option in the search bar, and this way Word won't even return any matches that don't share the same capitalization.

3. **Returning full words instead of just the search term**: Word's Javascript search API returns a `Range` object, whose text is just the search term itself. And while there is a function that can trace the term to the end of the word, there is no way to find the beginning of the word. Which meant a larger sample of text encompassing the word had to be selected. Since there is an in-built select `item.paragraphs.getFirst()` function, I chose to use that, limiting the chosen paragraphs to those that returned a search result.

4. **Highlighting multiple matches in the same paragraph**: The initial approach to highlight each match individually within a paragraph was challenging due to limitations in the API’s search method, which may return multiple occurrences within the same paragraph, and therefore will iterate over that paragraph multiple times, each time returning all search results. To rectify this, I created a function that keeps track of the paragraphs processed, using the entire text since Word is not able to tell if two `Range` objects are the same.

5. **Efficient syncing and batch updates for styling**: Formatting each match (e.g., setting `highlightColor` and `bold`) individually resulted in performance issues. To optimize, I collect formatting operations in an array and apply them in batches, followed by a single `context.sync()` call to commit changes. This approach significantly improved performance, especially in documents with numerous matches.

6. **Not changing the entire styling of the document**: When Word finds a term, it is selected, and since it was then highlighted and made bold, the document settings also became highlighting and bold. So I found the last term and artificially selected the character after it, returning the document settings to what it was before.

7. **Clearing the search terms**: When someone clears a search, they expect all references to the previous search to be reverted. This includes the search list, the text input and the document styling changes (highlighting). The search list and input are just handled by the useSearchState() hook, but for formatting we have to make sure it goes back to their formatting, not just the most basic formatting. So there is a function called `getCurrentFormat` which is run when the document loads and keeps track of what the styling should be.

8. **Displaying the search terms in order of precision**: In order to determine the best results of search terms, I created a type of `MatchObject` which stores three arrays of best, good and all matches.
     The matches are assigned rankings like so:
      * **Best** The full word is an exact match to the search term.
      * **Good** The full word is an exact match disregarding capitalization (irrelevant if the case match option is checked), or the full word contains the search term in the specified capitalization.
      * **All** The full word contains the search term disregarding capitalization (irrelevant if the case match option is checked).
   These search terms are then passed on to the search results component, which maps through them in order and displays the text.

## 🥳 And that's about it!
Given more time to figure it out I would like to make it so that if the user clicks on the search result, it will focus on it in the document. The challenge with that is the `Range` object is only stored in the context in which it's created. So when it's passed on to another component, Word no longer knows where on the document it was found. 
I hope you enjoyed this little demo. Feel free to check out the rest of my [GitHub](https://github.com/hzuber) or my [LinkedIn](https://www.linkedin.com/in/hzuber-dev/)
