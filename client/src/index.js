import React from "react";
import ReactDOM from "react-dom/client";

import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";
// import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
