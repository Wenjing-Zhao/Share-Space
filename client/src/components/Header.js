import React, { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

import logo from "../assets/logo.png";
import LoginButton from "./MySpace/LoginButton";
import LogoutButton from "./MySpace/LogoutButton";

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

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
          <HeaderLink to="/myspace">My Spaces</HeaderLink>

          <LoginButton />
          <LogoutButton />
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
  font-weight: bolder;
  margin-left: 15px;
`;

const SignIn = styled.div`
  display: flex;
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

export default Header;
