import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdRoom } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";

const Space = ({
  spaceId,
  imageSrc,
  availableDateFrom,
  availableDateTo,
  needs,
  country,
  region,
  city,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Image
        onClick={() => {
          navigate(`/spaces/${spaceId}`);
        }}
      >
        <Location>
          <MdRoom />
          {city}, {region}, {country}
        </Location>

        <Img src={imageSrc} alt="space-img" />
      </Image>

      <Date>
        Date: {availableDateFrom} - {availableDateTo}
      </Date>

      <Hr />

      <Needs>
        Pets & Needs:
        {needs.map((need) => (
          <Span key={need}>
            <FiCheckCircle />
            {need}
          </Span>
        ))}
      </Needs>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  height: 420px;
`;

const Location = styled.h2`
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  width: 350px;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.5rem;
`;

const Image = styled.div`
  width: 100%;
  height: 350px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const Hr = styled.hr`
  border: 0;
  border-bottom: 2px solid var(--border-color);
`;

const Date = styled.p`
  margin: 10px 0;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Needs = styled.p`
  margin-top: 10px;
  font-size: 1.1rem;
`;

const Span = styled.span`
  margin-left: 10px;
`;

export default Space;
