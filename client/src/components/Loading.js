import React from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";

const Error = () => {
  return (
    <Wrapper>
      <Section>
        <FiLoaderAnimation />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 350px);
`;

const Section = styled.div`
  text-align: center;
  padding: 0 20px;
`;

const FiLoaderAnimation = styled(FiLoader)`
  font-size: 50px;
  animation: rotate 1.5s linear infinite;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Error;
