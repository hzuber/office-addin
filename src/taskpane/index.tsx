import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

/* global document, Office, HTMLElement */

const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(<App onSearch={(query) => console.log("Searching for:", query)}/>);
});
