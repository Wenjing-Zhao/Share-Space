import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FiPlusSquare,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";

import Error from "../Error";
import Loading from "../Loading";
import SpaceDisplay from "../Spaces/SpaceDisplay";
import SearchBar from "../Homepage/SearchBar";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { UserContext } from "../UserContext";

const Account = ({ spaces }) => {
  const { signInUser, isError, userActionToggler, setUserActionToggler } =
    useContext(UserContext);

  const [userSpaces, setUserSpaces] = useState(null);
  const [userFavorites, setFavorites] = useState(null);
  const [isProAllError, setIsProAllError] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [isAddSpaceError, setIsAddSpaceError] = useState(false);
  const [isUpdateSpaceError, setIsUpdateSpaceError] = useState(false);
  const [isDeleteSpaceError, setIsDeleteSpaceError] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // ftech user data about spaces and favorites
    const fetchUserData = async () => {
      try {
        // fetch user all the spaces
        const proAllResSpaces = await Promise.all(
          signInUser.spaces.map(async (space) => {
            const responseSpace = await fetch(`/api/get-space/${space}`);
            const jsonSpace = await responseSpace.json();

            return jsonSpace.data;
          })
        );

        setUserSpaces(proAllResSpaces);

        // fetch user all the favorites
        const proAllResFavorites = await Promise.all(
          signInUser.favorites.map(async (favorite) => {
            const responseFavorite = await fetch(`/api/get-space/${favorite}`);
            const jsonFavorite = await responseFavorite.json();

            return jsonFavorite.data;
          })
        );

        setFavorites(proAllResFavorites);
      } catch (error) {
        setIsProAllError(true);
      }
    };

    signInUser && fetchUserData();
  }, [signInUser]);

  // handle submit button for user add a space
  const handleAddSpaceSubmit = async (
    evt,
    imageSrc,
    datePicker,
    needs,
    addressData
  ) => {
    evt.preventDefault();
    setIsAddSpaceError(false);
    setIsAddLoading(true);
    setIsSuccess(false);

    try {
      const response = await fetch("/api/add-space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          spaceDetails: {
            imageSrc: imageSrc,
            availableDate: datePicker,
            needs: needs,
            addressDetails: addressData,
          },
          host: signInUser.userId,
        }),
      });

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
        setIsSuccess(true);
        setIsAddLoading(false);
        evt.target.reset();
      }
    } catch (error) {
      setIsAddSpaceError(true);
      setIsAddLoading(false);
    }
  };

  // handle submit button for user updates a space
  const handleUpdateSpaceSubmit = async (
    evt,
    imageSrc,
    datePicker,
    needs,
    spaceId
  ) => {
    evt.preventDefault();
    setIsUpdateSpaceError(false);
    setIsUpdateLoading(true);
    setIsSuccess(false);

    try {
      const response = await fetch(`/api/update-space/${spaceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          imageSrc: imageSrc,
          availableDate: datePicker,
          needs: needs,
        }),
      });

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
        setIsSuccess(true);
        setIsUpdateLoading(false);
      }
    } catch (error) {
      setIsUpdateSpaceError(true);
      setIsUpdateLoading(false);
    }
  };

  // handle button for user deletes a space
  const handleDeleteSpace = async (evt, spaceId) => {
    evt.preventDefault();
    setIsDeleteSpaceError(false);
    setIsDeleteLoading(true);

    try {
      const response = await fetch(`/api/delete-space/${spaceId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
        setIsDeleteLoading(false);
      }
    } catch (error) {
      setIsDeleteSpaceError(true);
      setIsDeleteLoading(false);
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
      {/* search bar  */}
      <SearchSection>
        <Search>
          <SearchBar spaces={spaces} />
        </Search>
      </SearchSection>

      {/* sign in user info display */}
      {signInUser && userSpaces && userFavorites ? (
        <>
          {/* user profile */}
          <InfoSection>
            <Info>
              <UserInfo>
                <Avatar>
                  <Img src={signInUser.avatarUrl} alt="user-avatar" />
                </Avatar>

                <div>
                  <Name>
                    {signInUser.firstName} {signInUser.lastName}
                  </Name>

                  <UserId>
                    User Id: {signInUser.userId.substring(0, 13) + "..."}
                  </UserId>
                </div>
              </UserInfo>

              {/* user spaces */}
              <SpaceInfo>
                <Title>My Spaces</Title>

                {/* popup for add a space */}
                <AddModal
                  openFormModal={openAddModal}
                  setOpenFormModal={setOpenAddModal}
                  setHidden={setHidden}
                  handleSubmit={handleAddSpaceSubmit}
                  isError={isAddSpaceError}
                  isLoading={isAddLoading}
                  isSuccess={isSuccess}
                  setIsSuccess={setIsSuccess}
                />

                <Button
                  onClick={() => {
                    setOpenAddModal(true);
                    setHidden();
                  }}
                >
                  <FiPlusSquare style={{ fontSize: "13px" }} />
                  {` Add`}
                </Button>

                {userSpaces.length === 0 ? (
                  <Alert>
                    <FiAlertCircle /> You don't have any space yet.
                  </Alert>
                ) : (
                  <>
                    {userSpaces.map((space) => (
                      <MapSpaceInfo key={space.spaceId}>
                        <ButtonSection>
                          <SpaceId>
                            Space Id: {space.spaceId.substring(0, 8) + "..."}
                          </SpaceId>

                          {/* popup for update a space*/}
                          <UpdateModal
                            openFormModal={openUpdateModal}
                            setOpenFormModal={setOpenUpdateModal}
                            setHidden={setHidden}
                            handleSubmit={handleUpdateSpaceSubmit}
                            isError={isUpdateSpaceError}
                            isLoading={isUpdateLoading}
                            isSuccess={isSuccess}
                            setIsSuccess={setIsSuccess}
                            spaceId={space.spaceId}
                          />

                          <Button
                            onClick={() => {
                              setOpenUpdateModal(true);
                              setHidden();
                            }}
                          >
                            <FiEdit style={{ fontSize: "13px" }} />
                            {` Edit`}
                          </Button>

                          <Button
                            disabled={isDeleteLoading}
                            onClick={(evt) =>
                              handleDeleteSpace(evt, space.spaceId)
                            }
                          >
                            {isDeleteLoading ? (
                              <FiLoaderAnimation />
                            ) : (
                              <>
                                <FiTrash2 style={{ fontSize: "13px" }} />
                                {` Delete`}
                              </>
                            )}
                          </Button>
                        </ButtonSection>

                        <House>
                          <Img
                            src={space.spaceDetails.imageSrc}
                            alt="house-img"
                          />
                        </House>

                        <SubSpaceInfo>
                          <div>
                            <SmallTitlt>Available Date</SmallTitlt>

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
                            <SmallTitlt>Shared Address</SmallTitlt>
                            <p>
                              {space.spaceDetails.addressDetails.address},{" "}
                              {space.spaceDetails.addressDetails.city},{" "}
                              {space.spaceDetails.addressDetails.region},{" "}
                              {space.spaceDetails.addressDetails.country},{" "}
                              {space.spaceDetails.addressDetails.postal}
                            </p>
                          </div>
                        </SubSpaceInfo>
                      </MapSpaceInfo>
                    ))}
                  </>
                )}
              </SpaceInfo>
            </Info>
          </InfoSection>

          {/* user favorites */}
          <Section>
            <Display>
              <MyFavorites>My Favorites</MyFavorites>
              {userFavorites.length === 0 ? (
                <Alert>
                  <FiAlertCircle /> You don't have any favorite yet.
                </Alert>
              ) : (
                <>
                  {userFavorites.map((favorite) => (
                    <SpaceDisplay
                      key={favorite.spaceId}
                      spaceId={favorite.spaceId}
                      imageSrc={favorite.spaceDetails.imageSrc}
                      availableDateFrom={favorite.spaceDetails.availableDate[0]}
                      availableDateTo={favorite.spaceDetails.availableDate[1]}
                      needs={favorite.spaceDetails.needs}
                      country={favorite.spaceDetails.addressDetails.country}
                      region={favorite.spaceDetails.addressDetails.region}
                      city={favorite.spaceDetails.addressDetails.city}
                    />
                  ))}
                </>
              )}
            </Display>
          </Section>
        </>
      ) : isError || isProAllError || isDeleteSpaceError ? (
        <Error />
      ) : (
        <Loading />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: calc(100vh - 250px);
  position: relative;
`;

const Alert = styled.p`
  width: 100%;
  font-size: 1.2rem;
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

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Name = styled.h3`
  font-size: 1.8rem;
`;

const UserId = styled.p`
  font-size: 1.2rem;
  margin-top: 20px;
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

const MapSpaceInfo = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

const House = styled.div`
  width: 350px;
  height: 350px;
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
  justify-content: flex-start;
  padding: 50px 20px;
  gap: 54px;
`;

const MyFavorites = styled.h3`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: -34px;
`;

// button

const ButtonSection = styled.div`
  width: 100%;
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

  &:disabled {
    cursor: not-allowed;
    opacity: 50%;
  }
`;

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

export default Account;
