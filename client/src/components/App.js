import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

import Header from "./Header";
import Homepage from "./Homepage/Homepage";
import Spaces from "./Spaces/Spaces";
import SearchResult from "./Homepage/SearchResult";
import MySpace from "./MySpace/MySpace";
import Footer from "./Footer";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/search/keyword" element={<SearchResult />} />
        <Route path="/myspace/:spaceId" element={<MySpace />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
