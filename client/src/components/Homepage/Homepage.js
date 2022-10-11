import React from "react";
import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa";

import poster from "../../assets/poster.jpg";
import intro1 from "../../assets/intro-1.png";
import intro2 from "../../assets/intro-2.png";
import intro3 from "../../assets/intro-3.png";
import intro4 from "../../assets/intro-4.png";
import intro5 from "../../assets/intro-5.png";
import intro6 from "../../assets/intro-6.png";

import SearchBar from "./SearchBar";
import ImgDisplay from "./ImgDisplay";

// this function is for homepage display
const Homepage = ({ spaces }) => {
  return (
    <Wrapper>
      {/* poster display */}
      <PosterSection>
        <Img src={poster} alt="poster-img" />
        <Title>Happy travel and happy pets</Title>

        {/* search bar display */}
        <SearchSection>
          <SearchBar spaces={spaces} />
        </SearchSection>
      </PosterSection>

      {/* site introduces display */}
      <IntrosSection>
        <Display>
          <div style={{ width: "100%" }}>
            <FaRegHeart style={{ fontSize: "50px" }} />
          </div>

          <SubTitle>Connecting like-minded people around the world</SubTitle>

          <ImgDisplay imageSrc={intro1} />
          <ImgDisplay imageSrc={intro2} />
          <ImgDisplay imageSrc={intro3} />
          <SmallTitle>
            Find travel and pets lovers to{" "}
            <Span>look after house and pets</Span> when you are away.
          </SmallTitle>

          <ImgDisplay imageSrc={intro4} />
          <ImgDisplay imageSrc={intro5} />
          <ImgDisplay imageSrc={intro6} />
          <SmallTitle>
            Look after house and pets <Span>free of charge in exchange</Span>{" "}
            for accommodation.
          </SmallTitle>

          <Para>
            Sign up for free, complete your profile and start an interesting
            experience.
          </Para>
        </Display>
      </IntrosSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-top: 2px solid var(--border-color);
  min-height: calc(100vh - 250px);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 100%;
  text-align: center;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const PosterSection = styled.div`
  width: 100%;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
`;

const SearchSection = styled.div`
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 68%;
  height: 100px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IntrosSection = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Display = styled.div`
  width: var(--max-page-width);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 100px 20px 50px;
`;

const SubTitle = styled.h2`
  width: 100%;
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 50px;
`;

const SmallTitle = styled.h3`
  width: 100%;
  font-size: 1.4rem;
  margin-top: 50px;
`;

const Para = styled.h3`
  width: 100%;
  font-size: 1.8rem;
  font-weight: 600;
  margin-top: 100px;
`;

const Span = styled.span`
  color: var(--primary-color);
  text-decoration: underline;
`;

export default Homepage;
