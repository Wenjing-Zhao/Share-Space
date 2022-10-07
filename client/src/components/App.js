import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import SearchResult from "./Homepage/SearchResult";
import Spaces from "./Spaces/Spaces";
import Space from "./Spaces/Space";
import Account from "./Account/Account";
import Footer from "./Footer";
import { UserContext } from "./UserContext";

const App = () => {
  const { userActionToggler } = useContext(UserContext);

  const [spaces, setSpaces] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSpacesData = async () => {
      try {
        const response = await fetch("/api/get-spaces");
        const json = await response.json();

        setSpaces(json.data);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchSpacesData();
  }, [userActionToggler]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage spaces={spaces} />} />
        <Route path="/search" element={<SearchResult />} />
        <Route
          path="/spaces"
          element={<Spaces spaces={spaces} isError={isError} />}
        />
        <Route path="/spaces/:spaceId" element={<Space spaces={spaces} />} />
        <Route path="/account/:userId" element={<Account spaces={spaces} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
