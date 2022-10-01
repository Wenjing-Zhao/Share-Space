import React from "react";
import styled from "styled-components";

import poster from "../../assets/poster.jpg";
import SearchBar from "./SearchBar";

const Homepage = () => {
  return (
    <Wrapper>
      <Poster>
        <Img src={poster} alt="poster-img" />
        <SearchSection>Search Bar</SearchSection>
      </Poster>

      <Section>
        <Intro>
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

const Poster = styled.div`
  width: 100%;
  position: relative;
`;

const SearchSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 10%;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
`;

const Intro = styled.div`
  width: var(--max-page-width);
`;

const Para = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: 50px 0;
`;

export default Homepage;
