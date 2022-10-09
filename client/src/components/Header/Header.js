import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import { TbMessage2 } from "react-icons/tb";

import logo from "../../assets/logo.png";
import Login from "./Login";
import Logout from "./Logout";

import { UserContext } from "../UserContext";

// this function is for site header display
const Header = () => {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();
  const { signInUser } = useContext(UserContext);

  return (
    <Wrapper>
      <ContentSection>
        {/* site logo display */}
        <LogoSection
          onClick={() => {
            // link to homepage
            navigate("/");
          }}
        >
          <Img src={logo} alt="logo-img" />
          <Title>Share Space</Title>
        </LogoSection>

        {/* sign in/out and account links display */}
        <SignInSection>
          {/* conditional: user is logged in? */}
          {signInUser ? (
            <>
              <MessageSection to="/messages">
                <TbMessage2 style={{ fontSize: "28px" }} />
              </MessageSection>

              {/* link to user account page */}
              <HeaderLink to={`/account`}>My Account</HeaderLink>

              {/* logout button */}
              <Logout />
            </>
          ) : (
            <>
              {/* link to login page */}
              <HeaderLink onClick={() => loginWithRedirect()}>
                Share a space?
              </HeaderLink>

              {/* login button */}
              <Login />
            </>
          )}
        </SignInSection>
      </ContentSection>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  height: 100px;
  display: flex;
  justify-content: center;
`;

const ContentSection = styled.div`
  width: var(--max-page-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const LogoSection = styled.div`
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
  margin-left: 20px;
`;

const SignInSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MessageSection = styled(Link)`
  &:hover {
    color: var(--primary-color);
  }
`;

const HeaderLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const FiLoaderAnimation = styled(FiLoader)`
  font-size: 1rem;
  font-weight: bolder;
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Header;
