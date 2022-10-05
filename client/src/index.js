import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyles />

    <Auth0Provider
      domain="dev-ebglbe53.us.auth0.com"
      clientId="jZ7iz1uGOMRE3SRE8QBPsSdf7ycDVVJZ"
      redirectUri={window.location.origin}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
