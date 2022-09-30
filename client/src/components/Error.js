import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

export const ErrorScreen = () => {
  return (
    <Wrapper>
      <Contextwrapper>
        <FaBomb style={{ fontSize: "50px" }} />
        <H1>An unknown error has occurred.</H1>
        <p>Please try refreshing the page.</p>
      </Contextwrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 650px;
`;

const Contextwrapper = styled.div`
  text-align: center;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  margin-top: 50px;
  margin-bottom: 30px;
`;
