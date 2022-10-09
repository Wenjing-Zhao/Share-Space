import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "antd/dist/antd.min.css";

import Header from "./Header/Header";
import Homepage from "./Homepage/Homepage";
import Spaces from "./Spaces/Spaces";
import Space from "./Spaces/Space";
import Account from "./Account/Account";
import Messages from "./Header/Messages";
import Footer from "./Footer";
import { UserContext } from "./UserContext";

// this function is for site app
const App = () => {
  const { userActionToggler } = useContext(UserContext);

  const [spaces, setSpaces] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // this function fetchs spaces data from database
    const fetchSpacesData = async () => {
      try {
        const response = await fetch("/api/get-spaces");
        const json = await response.json();

        setSpaces(json.data);
      } catch (error) {
        setIsError(true);
      }
    };

    // call above function
    fetchSpacesData();
  }, [userActionToggler]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage spaces={spaces} />} />
        <Route
          path="/spaces"
          element={<Spaces spaces={spaces} isError={isError} />}
        />
        <Route path="/spaces/:spaceId" element={<Space spaces={spaces} />} />
        <Route path="/account" element={<Account spaces={spaces} />} />
        <Route path="/messages" element={<Messages spaces={spaces} />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
