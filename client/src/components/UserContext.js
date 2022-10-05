import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  const [signInUser, setSignInUser] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/signin/brigitte65@yahoo.com`);
        // const response = await fetch(`/api/signin/${user.email}`);
        const json = await response.json();

        console.log(json);
        if (json.message === "Email Not Found") {
          console.log("create new user");
        } else {
          setSignInUser(json.data);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    isAuthenticated && fetchUserData();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ signInUser, isError }}>
      {children}
    </UserContext.Provider>
  );
};
