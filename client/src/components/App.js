import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import SearchResult from "./Homepage/SearchResult";
import Spaces from "./Spaces/Spaces";
import Space from "./Spaces/Space";
import Account from "./Account/Account";
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/:spaceId" element={<Space />} />
        <Route path="/account/:userId" element={<Account />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
