import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <HeaderLink onClick={() => logout({ returnTo: window.location.origin })}>
      Sign out
    </HeaderLink>
  );
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

export default LogoutButton;
