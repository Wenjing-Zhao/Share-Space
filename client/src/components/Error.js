import React from "react";
import styled from "styled-components";
import { MdRunningWithErrors } from "react-icons/md";

// this function is for error display
const Error = () => {
  return (
    <Wrapper>
      <Section>
        <MdRunningWithErrors style={{ fontSize: "50px" }} />
        <H1>An unknown error has occurred.</H1>
        <Para>Please try refreshing the page.</Para>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 330px);
`;

const Section = styled.div`
  text-align: center;
  padding: 0 20px;
`;

const H1 = styled.h1`
  font-size: 1.6rem;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Para = styled.p`
  font-size: 1.2rem;
`;

export default Error;
