import React from "react";
import { Provider } from "../../components/ui/provider";
import SearchBar from "./searchBar";
import { wordSearch } from "../../utils/wordSearch";

const  App=() =>{
  async function search(query:string, matchCase:boolean){
    await wordSearch(query, matchCase)
  }

  return (
    <Provider>
      {/* <Component {...pageProps} /> */}
      <SearchBar onSearch={search}/>
    </Provider>
  );
}
export default App