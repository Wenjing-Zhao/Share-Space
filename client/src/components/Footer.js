import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// this function is for site footer
const Footer = () => {
  return (
    <Wrapper>
      <Section>
        <Links>
          {/* link to all spaces page */}
          <FooterLink to="/spaces">All spaces</FooterLink>

          {/* link to the top of page */}
          <FooterLink
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Back to Top ⇧
          </FooterLink>

          {/* link to github */}
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

const Wrapper = styled.footer`
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
