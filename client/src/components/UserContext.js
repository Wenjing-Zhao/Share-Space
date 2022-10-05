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

    user && isAuthenticated && fetchUserData();
  }, [user]);

  return (
    <UserContext.Provider value={{ signInUser, isError }}>
      {children}
    </UserContext.Provider>
  );
};
