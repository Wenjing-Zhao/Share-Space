import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FiMail,
  FiHeart,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

import Error from "../Error";
import Loading from "../Loading";
import SearchBar from "../Homepage/SearchBar";
import MessageModal from "./MessageModal";
import { UserContext } from "../UserContext";
import Login from "../Header/Login";

const Space = () => {
  const { spaceId } = useParams();
  const { signInUser } = useContext(UserContext);

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [space, setSpace] = useState(null);
  const [host, setHost] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isFavoriteError, setIsFavoriteError] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);

  useEffect(() => {
    const fetchSpaceData = async () => {
      try {
        const responseSpace = await fetch(`/api/get-space/${spaceId}`);
        const jsonSpace = await responseSpace.json();
        setSpace(jsonSpace.data);

        const responseHost = await fetch(
          `/api/get-user/${jsonSpace.data.host}`
        );
        const jsonHost = await responseHost.json();
        setHost(jsonHost.data);
      } catch (error) {
        setIsError(true);
      }
    };

    spaceId && fetchSpaceData();
  }, [spaceId]);

  // handler button for user favorite a space
  const handleFavoriteSpace = async (evt) => {
    evt.preventDefault();

    try {
      const response = await fetch(
        `/api/update-user-favorites/${signInUser.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            spaceId: spaceId,
          }),
        }
      );
    } catch (error) {
      setIsFavoriteError(true);
    }
  };

  // stop scrolling when modal open
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <Wrapper>
      <MessageModal
        spaceId={spaceId}
        openMessageModal={openMessageModal}
        setOpenMessageModal={setOpenMessageModal}
        setHidden={setHidden}
      />

      <SearchSection>
        <Search>
          <SearchBar />
        </Search>
      </SearchSection>

      {space && host ? (
        <InfoSection>
          <Info>
            <SpaceInfo>
              <ButtonSection>
                <Title>Space Id: {space.spaceId.substring(0, 8) + "..."}</Title>

                {signInUser && (
                  <>
                    <Button
                      onClick={() => {
                        setOpenMessageModal(true);
                        setHidden();
                      }}
                    >
                      <FiMessageSquare style={{ fontSize: "13px" }} />
                      {` Message`}
                    </Button>

                    <Button onClick={(evt) => handleFavoriteSpace(evt)}>
                      <FiHeart style={{ fontSize: "13px" }} />
                      {` Favorite`}
                    </Button>
                  </>
                )}
              </ButtonSection>

              <House>
                <Img src={space.spaceDetails.imageSrc} alt="house-img" />
              </House>

              <SubSpaceInfo>
                <div>
                  <SmallTitlt>Available date</SmallTitlt>
                  <p>
                    {space.spaceDetails.availableDate[0]} -{" "}
                    {space.spaceDetails.availableDate[1]}
                  </p>
                </div>

                <div>
                  <SmallTitlt>Pets & Needs</SmallTitlt>
                  <Needs>
                    {space.spaceDetails.needs.map((need) => (
                      <span key={need}>
                        <FiCheckCircle />
                        {need}
                      </span>
                    ))}
                  </Needs>
                </div>

                <div>
                  <SmallTitlt>Address</SmallTitlt>
                  <p>
                    {space.spaceDetails.addressDetails.address},{" "}
                    {space.spaceDetails.addressDetails.city},{" "}
                    {space.spaceDetails.addressDetails.region},{" "}
                    {space.spaceDetails.addressDetails.country},{" "}
                    {space.spaceDetails.addressDetails.postal}
                  </p>
                </div>
              </SubSpaceInfo>
            </SpaceInfo>

            <UserInfo>
              <Avatar>
                <Img src={host.avatarUrl} alt="host-avatar" />
              </Avatar>

              <div>
                <Title>
                  {host.firstName} {host.lastName}
                </Title>

                {signInUser ? (
                  <>
                    <Email>E-mail: {host.email}</Email>

                    <EmailButton href={`mailto:${host.email}`}>
                      <FiMail style={{ fontSize: "13px" }} />
                      {` Send E-mail`}
                    </EmailButton>
                  </>
                ) : (
                  <Email>
                    Contact the host now? You can <Login />.
                  </Email>
                )}
              </div>
            </UserInfo>
          </Info>
        </InfoSection>
      ) : isError || isFavoriteError || isMessageError ? (
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
`;

const Title = styled.h3`
  font-size: 1.8rem;
`;

const Email = styled.p`
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

const House = styled.div`
  width: 350px;
  height: 350px;
  margin-right: 30px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const SubSpaceInfo = styled.div`
  display: grid;
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

// button'
const ButtonSection = styled.div`
  width: 100%;
`;

const EmailButton = styled.a`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 180px;
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
    color: white;
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
    color: white;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 155px;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  margin-top: 20px;
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

// const ModalContainer = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
// `;

export default Space;
