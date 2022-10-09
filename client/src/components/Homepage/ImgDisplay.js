import React from "react";
import styled from "styled-components";

// this function is for each intro display
const ImgDisplay = ({ imageSrc }) => {
  return (
    <Wrapper>
      {/* intro image */}
      <Image>
        <Img src={imageSrc} alt="intro-img" />
      </Image>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  text-align: center;
  margin-top: 120px;
`;

const Image = styled.div`
  width: 100%;
  height: 200px;
  border: 5px solid #b57284;
  border-radius: 100px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

export default ImgDisplay;
