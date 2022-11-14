import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  FiMail,
  FiMessageSquare,
  FiCheckCircle,
  FiLoader,
} from "react-icons/fi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import Error from "../Error";
import Loading from "../Loading";
import SearchBar from "../Homepage/SearchBar";
import MessageModal from "./MessageModal";
import Login from "../Header/Login";
import { UserContext } from "../UserContext";

// this function is for space page display
const Space = ({ spaces }) => {
  const { spaceId } = useParams();
  const { signInUser, userActionToggler, setUserActionToggler } =
    useContext(UserContext);

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [space, setSpace] = useState(null);
  const [host, setHost] = useState(null);
  const [isError, setIsError] = useState(false);

  const [isFavorite, setIsFavorite] = useState(null);
  const [isFavoriteError, setIsFavoriteError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteSpaceError, setIsFavoriteSpaceError] = useState(false);

  useEffect(() => {
    // this function fetchs space data and host data
    const fetchSpaceData = async () => {
      try {
        // fetch space data
        const responseSpace = await fetch(`/api/get-space/${spaceId}`);
        const jsonSpace = await responseSpace.json();

        setSpace(jsonSpace.data);

        // fetch host data
        const responseHost = await fetch(
          `/api/get-user/${jsonSpace.data.host}`
        );
        const jsonHost = await responseHost.json();

        setHost(jsonHost.data);
      } catch (error) {
        setIsError(true);
      }
    };

    // this function fetchs the space status in user favorites
    const fetchUserFavorite = async () => {
      setIsLoading(true);

      try {
        // fetch the space status in user favorites
        const responseFavorite = await fetch(
          `/api/get-user-favorites/${signInUser.userId}?spaceId=${spaceId}`
        );
        const jsonFavorite = await responseFavorite.json();

        setIsFavorite(jsonFavorite.isFavorite);
        setIsLoading(false);
      } catch (error) {
        setIsFavoriteError(false);
        setIsLoading(false);
      }
    };

    // call above functions
    spaceId && fetchSpaceData();
    signInUser && fetchUserFavorite();
  }, [spaceId, signInUser]);

  // this function handles button clicking favorite a space
  const handleFavoriteSpace = async (evt) => {
    evt.preventDefault();
    setIsFavoriteSpaceError(false);

    try {
      // updata the space status in user favorites
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

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
      }
    } catch (error) {
      setIsFavoriteSpaceError(true);
    }
  };

  // this funcrion toggles scrollbar hidden for modals
  const setHidden = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <Wrapper>
      {/* search bar display */}
      <SearchSection>
        <Search>
          <SearchBar spaces={spaces} />
        </Search>
      </SearchSection>

      {space && host ? (
        <InfoSection>
          <Info>
            {/* space infos display */}
            <SpaceInfo>
              <ButtonSection>
                <Title>Space Id: {space.spaceId.substring(0, 8) + "..."}</Title>

                {signInUser && signInUser.userId !== host.userId && (
                  <>
                    {/* send message modal */}
                    <MessageModal
                      spaceId={spaceId}
                      hostId={host.userId}
                      hostFirstName={host.firstName}
                      hostLastName={host.lastName}
                      openMessageModal={openMessageModal}
                      setOpenMessageModal={setOpenMessageModal}
                      setHidden={setHidden}
                    />

                    {/* button to open modal */}
                    <Button
                      onClick={() => {
                        setOpenMessageModal(true);
                        setHidden();
                      }}
                    >
                      <FiMessageSquare style={{ fontSize: "13px" }} />
                      {` Message`}
                    </Button>

                    {/* favorite space button */}
                    <Button
                      disabled={isLoading}
                      onClick={(evt) => handleFavoriteSpace(evt)}
                    >
                      {isLoading ? (
                        <FiLoaderAnimation />
                      ) : isFavorite ? (
                        <>
                          <AiFillHeart style={{ fontSize: "13px" }} />
                          {` Favorited`}
                        </>
                      ) : (
                        <>
                          <AiOutlineHeart style={{ fontSize: "13px" }} />
                          {` Favorite`}
                        </>
                      )}
                    </Button>
                  </>
                )}
              </ButtonSection>

              {/* space house image */}
              <House>
                <Img
                  data-test-id="space-image"
                  src={space.spaceDetails.imageSrc}
                  alt="house-img"
                />
              </House>

              {/* space available date, needs and address */}
              <SubSpaceInfo>
                <div>
                  <SmallTitlt>Available Date</SmallTitlt>
                  <p>
                    {`${space.spaceDetails.availableDate[0]} -
                     ${space.spaceDetails.availableDate[1]}`}
                  </p>
                </div>

                <div>
                  <SmallTitlt>Pets & Needs</SmallTitlt>
                  <Needs>
                    {/* map each space pets and needs */}
                    {space.spaceDetails.needs.map((need) => (
                      <span key={need}>
                        <FiCheckCircle />
                        {need}
                      </span>
                    ))}
                  </Needs>
                </div>

                <div>
                  <SmallTitlt>Shared Address</SmallTitlt>
                  <p>
                    {`${space.spaceDetails.addressDetails.address}, 
                    ${space.spaceDetails.addressDetails.city}, 
                    ${space.spaceDetails.addressDetails.region}, 
                    ${space.spaceDetails.addressDetails.country}, 
                    ${space.spaceDetails.addressDetails.postal}`}
                  </p>
                </div>
              </SubSpaceInfo>
            </SpaceInfo>

            {/* space host infos display */}
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

                    {/* send host email button */}
                    {signInUser.userId !== host.userId && (
                      <EmailButton href={`mailto:${host.email}`}>
                        <FiMail style={{ fontSize: "13px" }} />
                        {` Send E-mail`}
                      </EmailButton>
                    )}
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
      ) : isError || isFavoriteError || isFavoriteSpaceError ? (
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

// space infos
const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Info = styled.div`
  width: var(--max-page-width);
`;

const SpaceInfo = styled.div`
  width: 100%;
  padding: 50px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h3`
  font-size: 1.8rem;
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
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

const Needs = styled.div`
  display: flex;
  gap: 20px;
`;

// user infos
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

const Email = styled.p`
  font-size: 1.2rem;
  margin: 20px 0;
`;

// buttons
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

  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 160px;
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

// loading icon
const FiLoaderAnimation = styled(FiLoader)`
  font-size: 0.8rem;
  font-weight: bolder;
  color: white;
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Space;
