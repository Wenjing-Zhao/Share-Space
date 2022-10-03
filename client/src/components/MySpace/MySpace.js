import React, { useState } from "react";
import styled from "styled-components";
import { FiPlusSquare, FiEdit, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

// import Error from "../Error";
import SpaceDisplay from "../Spaces/SpaceDisplay";
import SearchBar from "../Homepage/SearchBar";
import FormModal from "./FormModal";

const MySpace = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [openFormModal, setOpenFormModal] = useState(false);

  //   if (isLoading) {
  //     return <div>Loading ...</div>;
  //   }

  //   return (
  //     isAuthenticated && (
  //       <div>
  //         <img src={user.picture} alt={user.name} />
  //         <h2>{user.name}</h2>
  //         <p>{user.email}</p>
  //       </div>
  //     )
  //   );
  // };

  // stop scrolling when modal open
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  return (
    <Wrapper>
      <FormModal
        openFormModal={openFormModal}
        setOpenFormModal={setOpenFormModal}
        setHidden={setHidden}
      />

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
              <UserId>User Id: 1234-5678-1234</UserId>

              <Button>
                <FiEdit style={{ fontSize: "13px" }} />
                {` Profile`}
              </Button>
            </div>
          </UserInfo>

          <SpaceInfo>
            <Title>My spaces</Title>

            <Button>
              <FiPlusSquare style={{ fontSize: "13px" }} />
              {` Add`}
            </Button>

            <ButtonSection>
              <SpaceId>Space Id: 1234-5678-1234</SpaceId>

              <Button
                onClick={() => {
                  setOpenFormModal(true);
                  setHidden();
                }}
              >
                <FiEdit style={{ fontSize: "13px" }} />
                {` Edit`}
              </Button>

              <Button>
                <FiTrash2 style={{ fontSize: "13px" }} />
                {` Delete`}
              </Button>
            </ButtonSection>

            <House>
              <img src="" alt="" />
            </House>

            <SubSpaceInfo>
              <div>
                <SmallTitlt>Available date</SmallTitlt>

                <p>2022.10.01 - 2022.10.10</p>
              </div>

              <div>
                <SmallTitlt>Pets & Needs</SmallTitlt>

                <Needs>
                  <span>
                    <FiCheckCircle />
                    {` Dogs`}
                  </span>

                  <span>
                    <FiCheckCircle />
                    {` Cats`}
                  </span>

                  <span>
                    <FiCheckCircle />
                    {` Plants`}
                  </span>
                </Needs>
              </div>

              <div>
                <SmallTitlt>My Address</SmallTitlt>

                <p>20 Florence, Cadiac, QC, CA J5R 0A8</p>
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
  position: relative;
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

const UserId = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
`;

const SpaceId = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
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
  width: 350px;
  height: 350px;
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

const ButtonSection = styled.div`
  width: 100%;
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 130px;
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

export default MySpace;
