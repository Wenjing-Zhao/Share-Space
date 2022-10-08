import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

import poster from "../../assets/poster.jpg";
import SearchBar from "./SearchBar";

const Homepage = ({ spaces }) => {
  return (
    <Wrapper>
      <Poster>
        <Img src={poster} alt="poster-img" />
        <Title>Happy travel and happy pets</Title>

        <SearchSection>
          <SearchBar spaces={spaces} />
        </SearchSection>
      </Poster>

      <Section>
        <Intro>
          <FaRegHeart style={{ fontSize: "50px" }} />

          <Para>Connecting like-minded people around the world</Para>
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
  font-weight: 600;
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

const LinkStyle = styled(Link)`
  font-size: 1.3rem;
  color: var(--primary-color);
  font-weight: 500;

  &:hover {
    color: white;
    text-decoration: underline;
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
