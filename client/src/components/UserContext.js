import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

// this function is for user context to share signin user infos
export const UserProvider = ({ children }) => {
  // get user infos and authentication status from Auth0
  const { user, isAuthenticated } = useAuth0();

  const [signInUser, setSignInUser] = useState(null);
  const [isError, setIsError] = useState(false);
  const [userActionToggler, setUserActionToggler] = useState(false);

  useEffect(() => {
    // this function fetchs signin user data or new user data
    const fetchUserData = async () => {
      try {
        // fetch signin user data or new user data
        const response = await fetch("/api/add-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: user.given_name,
            lastName: user.family_name,
            avatarUrl: user.picture,
            email: user.email,
          }),
        });

        if (response.ok) {
          const json = await response.json();
          setSignInUser(json.data);
        }
      } catch (error) {
        setIsError(true);
      }
    };

    // call above function
    user && isAuthenticated && fetchUserData();
  }, [user, isAuthenticated, userActionToggler]);

  return (
    <UserContext.Provider
      value={{
        signInUser,
        isError,
        userActionToggler,
        setUserActionToggler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
