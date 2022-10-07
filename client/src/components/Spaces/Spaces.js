import React from "react";
import styled from "styled-components";

import Error from "../Error";
import Loading from "../Loading";
import SpaceDisplay from "./SpaceDisplay";
import SearchBar from "../Homepage/SearchBar";

const Spaces = ({ spaces, isError }) => {
  // const [spaces, setSpaces] = useState(null);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const fetchSpacesData = async () => {
  //     try {
  //       const response = await fetch("/api/get-spaces");
  //       const json = await response.json();

  //       setSpaces(json.data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //   };

  //   fetchSpacesData();
  // }, []);

  return (
    <Wrapper>
      <SearchSection>
        <Search>
          <SearchBar spaces={spaces} />
        </Search>
      </SearchSection>

      {spaces ? (
        <Section>
          <Display>
            <Title>- All Spaces -</Title>

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
        </Section>
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

const Section = styled.div`
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
  text-align: center;
  font-weight: 700;
`;

export default Spaces;
