import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiLoader, FiAlertCircle } from "react-icons/fi";
import moment from "moment";

import Error from "../Error";
import Loading from "../Loading";
import SearchBar from "../Homepage/SearchBar";
import { UserContext } from "../UserContext";

// this function is for space page display
const Messages = ({ spaces }) => {
  const { signInUser, isError, userActionToggler, setUserActionToggler } =
    useContext(UserContext);

  const [textValue, setTextValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSedMessError, setIsSedMessError] = useState(false);

  // this function handles button clicking send a message
  const handleSendMessage = async (
    evt,
    spaceId,
    hostId,
    hostFirstName,
    hostLastName,
    talkerId
  ) => {
    evt.preventDefault();
    setIsLoading(true);

    try {
      // updata the user messages
      const response = await fetch(
        `/api/update-user-messages/${signInUser.userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            spaceId: spaceId,
            hostId: hostId,
            hostFirstName: hostFirstName,
            hostLastName: hostLastName,
            talkerId: talkerId,
            message: textValue,
            timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
          }),
        }
      );

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
        setIsLoading(false);
        evt.target.reset();
      }
    } catch (error) {
      setIsSedMessError(true);
      setIsLoading(false);
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

      {/* conditional: user is logged in? */}
      {signInUser ? (
        <InfoSection>
          <Info>
            <Title>My Messages</Title>

            {signInUser.messages.length > 0 ? (
              <MessageSection>
                {signInUser.messages.map((message, index) => (
                  <form
                    key={index.toString()}
                    onSubmit={(evt) =>
                      handleSendMessage(
                        evt,
                        message.spaceId,
                        message.hostId,
                        message.hostFirstName,
                        message.hostLastName,
                        message.talkerId
                      )
                    }
                  >
                    <MessageInfo key={message.spaceId}>
                      {signInUser.userId === message.hostId ? (
                        <SubTitle>
                          Host: {message.hostFirstName} {message.hostLastName}{" "}
                          (Me)
                        </SubTitle>
                      ) : (
                        <SubTitle>
                          Host: {message.hostFirstName} {message.hostLastName}
                        </SubTitle>
                      )}

                      <SpaceLink to={`/spaces/${message.spaceId}`}>
                        Space Id: {message.spaceId}
                      </SpaceLink>
                      <Hr />

                      {message.messagesLog.map((log, index) => (
                        <div key={index.toString()}>
                          <Para>
                            {log.firstName} {log.lastName}: {log.message}
                          </Para>

                          <Time>{log.timestamp}</Time>
                          <LightHr />
                        </div>
                      ))}

                      <TextArea
                        rows="5"
                        stype="text"
                        onChange={(evt) => setTextValue(evt.target.value)}
                      />

                      <Button type="submit">
                        {isLoading ? <FiLoaderAnimation /> : "Send Message"}
                      </Button>
                    </MessageInfo>
                  </form>
                ))}
              </MessageSection>
            ) : (
              <MessageSection>
                <Para>
                  <FiAlertCircle /> You don't have any message yet.
                </Para>
              </MessageSection>
            )}
          </Info>
        </InfoSection>
      ) : isError || isSedMessError ? (
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
  font-size: 1.8rem;
  margin: 50px 20px 20px;
`;

const MessageSection = styled.div`
  width: 100%;
  padding: 0 20px 50px;
  display: grid;
  gap: 30px;
`;

const MessageInfo = styled.div`
  border: 1px solid;
  border-radius: 10px;
  padding: 30px;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const SpaceLink = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    color: var(--primary-color);
  }
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 1px solid;
  margin: 20px 0;
`;

const LightHr = styled.hr`
  border: none;
  border-bottom: 1px solid #f7ebeb;
  margin: 20px 0;
`;

const Para = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const Time = styled.p`
  color: grey;
  font-size: 0.9rem;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  font-size: 1.2rem;
  border-radius: 2px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: #cf6a87 solid 2px;
    outline-offset: 1px;
  }
`;

const Button = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  width: 100%;
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
