import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClear } from "react-icons/md";

const MessageModal = ({
  spaceId,
  openMessageModal,
  setOpenMessageModal,
  setHidden,
}) => {
  const [textValue, setTextValue] = useState("");

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

        <form>
          <TextAreaWrapper>
            <Label htmlFor="id">
              Space Id: {spaceId.substring(0, 8) + "..."}
            </Label>
            <Label htmlFor="meaasge">Send message to space host:</Label>
            <TextArea
              rows="23"
              cols="50"
              stype="text"
              value={textValue}
              onChange={(evt) => setTextValue(evt.target.value)}
            />
          </TextAreaWrapper>

          <SubmitButton type="submit">Send Message</SubmitButton>
        </form>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 650px;
  height: 650px;
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
  font-size: 1rem;
  border-radius: 2px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: #cf6a87 solid 2px;
    outline-offset: 1px;
  }
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

export default MessageModal;
