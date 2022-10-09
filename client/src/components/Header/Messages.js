import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

import Error from "../Error";
import Loading from "../Loading";
import SearchBar from "../Homepage/SearchBar";
import Login from "../Header/Login";
import { UserContext } from "../UserContext";

// this function is for space page display
const Messages = ({ spaces }) => {
  const { signInUser } = useContext(UserContext);

  const [host, setHost] = useState(null);
  const [isError, setIsError] = useState(false);

  const [isFavorite, setIsFavorite] = useState(null);
  const [isFavoriteError, setIsFavoriteError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // this function fetchs space data and host data
  //   const fetchSpaceData = async () => {
  //     try {
  //       // fetch space data
  //       const responseSpace = await fetch(`/api/get-space/${spaceId}`);
  //       const jsonSpace = await responseSpace.json();

  //       setSpace(jsonSpace.data);

  //       // fetch host data
  //       const responseHost = await fetch(
  //         `/api/get-user/${jsonSpace.data.host}`
  //       );
  //       const jsonHost = await responseHost.json();

  //       setHost(jsonHost.data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //   };

  //   // this function fetchs the space status in user favorites
  //   const fetchUserFavorite = async () => {
  //     setIsLoading(true);

  //     try {
  //       // fetch the space status in user favorites
  //       const responseFavorite = await fetch(
  //         `/api/get-user-favorites/${signInUser.userId}?spaceId=${spaceId}`
  //       );
  //       const jsonFavorite = await responseFavorite.json();

  //       setIsFavorite(jsonFavorite.isFavorite);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsFavoriteError(false);
  //       setIsLoading(false);
  //     }
  //   };

  //   // call above functions
  //   spaceId && fetchSpaceData();
  //   signInUser && fetchUserFavorite();
  // }, [spaceId, signInUser]);

  // // this function handles button clicking favorite a space
  // const handleFavoriteSpace = async (evt) => {
  //   evt.preventDefault();
  //   setIsFavoriteSpaceError(false);

  //   try {
  //     // updata the space status in user favorites
  //     const response = await fetch(
  //       `/api/update-user-favorites/${signInUser.userId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         body: JSON.stringify({
  //           spaceId: spaceId,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       setUserActionToggler(!userActionToggler);
  //     }
  //   } catch (error) {
  //     setIsFavoriteSpaceError(true);
  //   }
  // };

  return (
    <Wrapper>
      {/* search bar display */}
      <SearchSection>
        <Search>
          <SearchBar spaces={spaces} />
        </Search>
      </SearchSection>

      {/* conditional: fetch user data done? */}
      {signInUser ? (
        <InfoSection>
          <Info>
            <MessageInfo>
              <Title>My messages</Title>
            </MessageInfo>
          </Info>
        </InfoSection>
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

const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Info = styled.div`
  width: var(--max-page-width);
`;

const Title = styled.h3`
  width: 100%;
  font-size: 1.8rem;
`;

const MessageInfo = styled.div`
  width: 100%;
  padding: 50px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
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

export default Messages;
