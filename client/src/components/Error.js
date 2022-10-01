import React from "react";
import { FaBomb } from "react-icons/fa";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <Section>
        <FaBomb style={{ fontSize: "80px" }} />
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
  height: 100%;
`;

const Section = styled.div`
  text-align: center;
  padding: 0 20px;
`;

const H1 = styled.h1`
  font-size: 1.8rem;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Para = styled.p`
  font-size: 1.2rem;
`;

export default Error;
