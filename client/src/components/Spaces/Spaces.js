import React from "react";
import styled from "styled-components";

import Error from "../Error";
import SpaceDisplay from "./SpaceDisplay";

const Spaces = () => {
  return (
    <Wrapper>
      <SearchSection>
        <Search>
          <p></p>
        </Search>
      </SearchSection>

      <Section>
        <Display>
          <Title>- All Spaces -</Title>

          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
          <SpaceDisplay />
        </Display>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 250px);
`;

const SearchSection = styled.div`
  height: 80px;
  background: var(--primary-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Search = styled.div`
  width: var(--max-page-width);
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
`;

const Display = styled.div`
  width: var(--max-page-width);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 50px 20px;
  gap: 20px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 30px;
`;

export default Spaces;
