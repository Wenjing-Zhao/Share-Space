import React from "react";
import styled from "styled-components";
import { MdRoom } from "react-icons/md";

const Space = () => {
  return (
    <Wrapper>
      <Image>
        <Location>
          <MdRoom />
          Location
        </Location>
        <Img src="" alt="" />
      </Image>

      <Date>Date: </Date>
      <Hr />
      <Needs>Pets & Needs:</Needs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 270px;
  height: 335px;
`;

const Location = styled.h2`
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
`;

const Image = styled.div`
  width: 100%;
  height: 270px;
  border: 1px solid black;
`;

const Img = styled.img``;

const Hr = styled.hr`
  border: 0;
  border-bottom: 2px solid var(--border-color);
`;

const Date = styled.p`
  margin: 10px 0;
`;

const Needs = styled.p`
  margin-top: 10px;
`;

export default Space;
