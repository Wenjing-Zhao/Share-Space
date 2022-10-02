import React, { createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Section>
        <Links>
          <FooterLink to="/spaces">All spaces</FooterLink>
          <FooterLink to="/myspace">My Space</FooterLink>

          <ExternalLink href="https://github.com/Wenjing-Zhao" target="_blank">
            About me
          </ExternalLink>
        </Links>

        <Hr />

        <Copyright>© 2022 Share Space. All rights reserved.</Copyright>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--primary-color);
  height: 150px;
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  width: var(--max-page-width);
  padding: 0 20px;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 45px 0;
`;

const FooterLink = styled(Link)`
  color: white;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #cf6a87;
  }
`;

const ExternalLink = styled.a`
  color: white;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    color: #cf6a87;
  }
`;

const Hr = styled.hr`
  border: 0;
  border-bottom: 1px solid var(--border-color);
`;

const Copyright = styled.p`
  font-size: 1rem;
  color: white;
  text-align: center;
  margin-top: 12px;
`;

export default Footer;
