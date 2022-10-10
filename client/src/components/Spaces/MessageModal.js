import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import moment from "moment";

import { UserContext } from "../UserContext";

// this function is for send message modal display
const MessageModal = ({
  spaceId,
  hostId,
  hostFirstName,
  hostLastName,
  openMessageModal,
  setOpenMessageModal,
  setHidden,
}) => {
  const { signInUser, userActionToggler, setUserActionToggler } =
    useContext(UserContext);

  const [textValue, setTextValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSedMessError, setIsSedMessError] = useState(false);

  // this function handles button clicking send a message
  const handleSendMessage = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);

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
            spaceId,
            talkerId: hostId,
            hostFirstName,
            hostLastName,
            message: textValue,
            timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
          }),
        }
      );

      if (response.ok) {
        setUserActionToggler(!userActionToggler);
        setIsSuccess(true);
        setIsLoading(false);
        setTextValue("");
      }
    } catch (error) {
      setIsSedMessError(true);
      setIsLoading(false);
    }
  };

  return (
    <Wrapper openMessageModal={openMessageModal}>
      <Section>
        <CloseButton
          type="button"
          onClick={() => {
            setOpenMessageModal(false);
            setHidden();
          }}
        >
          <MdOutlineClear style={{ fontSize: "15px" }} />
        </CloseButton>

        <form onSubmit={(evt) => handleSendMessage(evt)}>
          <TextAreaWrapper>
            <SpaceId>Space Id: {spaceId.substring(0, 8) + "..."}</SpaceId>
            <Label>Send message to space host:</Label>

            <TextArea
              rows="8"
              stype="text"
              value={textValue}
              onChange={(evt) => setTextValue(evt.target.value)}
            />
          </TextAreaWrapper>

          <SubmitButton type="submit">
            {isLoading ? <FiLoaderAnimation /> : "Send Message"}
          </SubmitButton>

          {/* send a message successfully and display a message */}
          {isSuccess && (
            <AlertSuc>Success! Your message has been sent.</AlertSuc>
          )}

          {/* failed to send a message and display a message */}
          {isSedMessError && (
            <AlertErr>Error! Please try again or refresh page.</AlertErr>
          )}
        </form>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 650px;
  height: 450px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  display: ${(props) => (props.openMessageModal ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  width: 85%;
`;

const SpaceId = styled.p`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  width: 100%;
  margin-bottom: 5px;
`;

const TextAreaWrapper = styled.div`
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

const AlertErr = styled.p`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const AlertSuc = styled.p`
  color: green;
  font-size: 1rem;
  text-align: center;
  margin-top: 10px;
`;

const CloseButton = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  outline: none;
  padding: 2px 3px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const SubmitButton = styled.button`
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

export default MessageModal;
