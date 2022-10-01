import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaDog, FaUserAlt, FaHome, FaRegHeart } from "react-icons/fa";

import poster from "../../assets/poster.jpg";
import SearchBar from "./SearchBar";

const Homepage = () => {
  return (
    <Wrapper>
      <Poster>
        <Img src={poster} alt="poster-img" />
        <Title>Happy travel and happy pets</Title>

        <SearchSection>
          <SearchBar />
        </SearchSection>

        <Links>
          <LinkStyle to="/spaces">Find all spaces</LinkStyle>
          <LinkStyle to="/myspace">Share your space</LinkStyle>
        </Links>
      </Poster>

      <Section>
        <Intro>
          <FaRegHeart style={{ fontSize: "50px" }} />

          <Para>Connecting like-minded people around the world</Para>

          {/* <FaDog style={{ fontSize: "30px" }} />
          <FaUserAlt style={{ fontSize: "30px" }} />
          <FaHome style={{ fontSize: "30px" }} /> */}
        </Intro>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 2px solid var(--border-color);
  min-height: calc(100vh - 250px);
`;

const Title = styled.h1`
  font-size: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: var(--max-page-width);
  text-align: center;
`;

const Poster = styled.div`
  width: 100%;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
`;

const SearchSection = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  height: 100px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Links = styled.div`
  display: flex;
  gap: 40px;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LinkStyle = styled(Link)`
  font-size: 1.1rem;
  color: var(--primary-color);
  font-weight: 600;

  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
`;

const Intro = styled.div`
  width: var(--max-page-width);
  text-align: center;
  margin: 150px 0;
`;

const Para = styled.h1`
  font-size: 2rem;
  margin: 50px 0;
`;

export default Homepage;
