import React, { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import logo from "../../assets/logo.png";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <Wrapper>
      <Section>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          <Img src={logo} alt="logo-img" />
          <Title>Share Space</Title>
        </Logo>

        <SignIn>
          {isAuthenticated ? (
            <>
              <HeaderLink to="/myspace">My Spaces</HeaderLink>
              <LogoutButton />
            </>
          ) : (
            <>
              <Welcome>Welcome!</Welcome>
              <LoginButton />
            </>
          )}
        </SignIn>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  width: var(--max-page-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.img`
  width: 60px;
  height: 60px;
`;

const Title = styled.h1`
  color: var(--primary-color);
  font-size: 2.5rem;
  font-weight: 800;
  margin-left: 15px;
`;

const SignIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
`;

const HeaderLink = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const Welcome = styled.p`
  font-size: 1.2rem;
`;

export default Header;
