import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// this function is for login button
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  // link to login page and redirect to homepage
  return <HeaderLink onClick={() => loginWithRedirect()}>Sign in</HeaderLink>;
};

const HeaderLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

export default LoginButton;
