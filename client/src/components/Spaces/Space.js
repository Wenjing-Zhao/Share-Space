import React from "react";
import styled from "styled-components";
import { FiMail, FiHeart, FiMessageSquare, FiCheck } from "react-icons/fi";

import Error from "../Error";
import SpaceDisplay from "../Spaces/SpaceDisplay";
import SearchBar from "../Homepage/SearchBar";

const Space = () => {
  return (
    <Wrapper>
      <SearchSection>
        <Search>
          <SearchBar />
        </Search>
      </SearchSection>

      <InfoSection>
        <Info>
          <UserInfo>
            <Avatar>
              <img src="" alt="" />
            </Avatar>

            <div>
              <Name>Wenjing Zhao</Name>
              <SpaceId>Space Id: 1234-5678-1234</SpaceId>

              <Button>
                <FiMail style={{ fontSize: "13px" }} />
                {` Send E-mail`}
              </Button>

              <Button>
                <FiMessageSquare style={{ fontSize: "13px" }} />
                {` Message Me`}
              </Button>

              <Button>
                <FiHeart style={{ fontSize: "13px" }} />
                {` Favorite`}
              </Button>
            </div>
          </UserInfo>

          <SpaceInfo>
            <Title>My space</Title>

            <House>
              <img src="" alt="" />
            </House>

            <SubSpaceInfo>
              <div>
                <SmallTitlt>Available date</SmallTitlt>
                <p>2022.10.01 - 2022.10.10</p>
              </div>

              <div>
                <SmallTitlt>My Address</SmallTitlt>
                <span>20 Florence, Cadiac, QC, CA J5R 0A8</span>
              </div>

              <div>
                <SmallTitlt>Pets & Needs</SmallTitlt>

                <Needs>
                  <span>
                    <FiCheck />
                    Dogs
                  </span>

                  <span>
                    <FiCheck />
                    Cats
                  </span>

                  <span>
                    <FiCheck />
                    Plants
                  </span>
                </Needs>
              </div>
            </SubSpaceInfo>
          </SpaceInfo>
        </Info>
      </InfoSection>

      <Section>
        <Display>
          <MyFavorites>My Favorites</MyFavorites>

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

// search bar

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

// user info

const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Info = styled.div`
  width: var(--max-page-width);
`;

const UserInfo = styled.div`
  width: 100%;
  padding: 50px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 50px;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid black;
`;

const Name = styled.h3`
  font-size: 1.8rem;
`;

const SpaceId = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
`;

// space info

const SpaceInfo = styled.div`
  width: 100%;
  padding: 50px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 1.5rem;
`;

const House = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

const SubSpaceInfo = styled.div`
  display: grid;
  margin-left: 30px;
  gap: 60px;
`;

const SmallTitlt = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 5px;
`;

const Needs = styled.div`
  display: flex;
  gap: 20px;
`;

// favorites

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

const MyFavorites = styled.h3`
  width: 100%;
  font-size: 1.5rem;
`;

// button

const Button = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 170px;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  margin-right: 10px;
  min-height: 30px;
  outline: none;
  padding: 10px 24px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export default Space;
