import React from "react";
import styled from "styled-components";

import Error from "../Error";
import Loading from "../Loading";
import SearchBar from "../Homepage/SearchBar";
import SpaceDisplay from "./SpaceDisplay";

// this function is for spaces page display
const Spaces = ({ spaces, isError }) => {
  return (
    <Wrapper>
      {/* search bar display */}
      <SearchSection>
        <Search>
          <SearchBar spaces={spaces} />
        </Search>
      </SearchSection>

      {/* all spaces display */}
      {spaces ? (
        <SpacesSection>
          <Display>
            <Title data-test-id="all-spaces-title">Find All Spaces</Title>

            {/* map each space infos */}
            {spaces.map((space) => (
              <SpaceDisplay
                key={space.spaceId}
                spaceId={space.spaceId}
                imageSrc={space.spaceDetails.imageSrc}
                availableDateFrom={space.spaceDetails.availableDate[0]}
                availableDateTo={space.spaceDetails.availableDate[1]}
                needs={space.spaceDetails.needs}
                country={space.spaceDetails.addressDetails.country}
                region={space.spaceDetails.addressDetails.region}
                city={space.spaceDetails.addressDetails.city}
              />
            ))}
          </Display>
        </SpacesSection>
      ) : isError ? (
        <Error />
      ) : (
        <Loading />
      )}
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
  align-items: center;
`;

const Search = styled.div`
  width: var(--max-page-width);
`;

const SpacesSection = styled.div`
  display: flex;
  justify-content: center;
`;

const Display = styled.div`
  width: var(--max-page-width);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 60px 20px;
  gap: 54px;
`;

const Title = styled.h1`
  width: 100%;
  font-size: 1.8rem;
`;

export default Spaces;
