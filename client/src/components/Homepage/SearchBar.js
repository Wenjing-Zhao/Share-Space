import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineClear, MdRoom } from "react-icons/md";

import Suggestion from "./Suggestion";

// this function is for search bar display
const SearchBar = ({ spaces }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [matchedList, setMatchedList] = useState([]);

  // this function handles selecting each matched space in the list
  const handleSelect = (suggestion) => {
    // link to each matched space page by each spaceId
    navigate(`/spaces/${suggestion.spaceId}`);
  };

  return (
    <Wrapper>
      <Input
        type="text"
        value={value}
        placeholder="Where do you want to go? (Country, region, city...)"
        onChange={(evt) => {
          setValue(evt.target.value);

          setMatchedList(
            // filter out matched spaces
            spaces.filter((ele) => {
              // get matched spaces by country
              if (
                ele.spaceDetails.addressDetails.country
                  .toLowerCase()
                  .includes(evt.target.value.toLowerCase()) &&
                evt.target.value.length > 1
              ) {
                return ele.spaceDetails.addressDetails;
              }

              // get matched spaces by region
              if (
                ele.spaceDetails.addressDetails.region
                  .toLowerCase()
                  .includes(evt.target.value.toLowerCase()) &&
                evt.target.value.length > 1
              ) {
                return ele.spaceDetails.addressDetails;
              }

              // get matched spaces by city
              if (
                ele.spaceDetails.addressDetails.city
                  .toLowerCase()
                  .includes(evt.target.value.toLowerCase()) &&
                evt.target.value.length > 1
              ) {
                return ele.spaceDetails.addressDetails;
              }
            })
          );
        }}
      />

      <ListSection disApper={matchedList.length === 0}>
        {/* map each mateched space address in the list */}
        {matchedList.map((suggestion) => {
          return (
            <Suggestion
              key={suggestion.spaceId}
              suggestion={{
                spaceId: suggestion.spaceId,
                address: `${suggestion.spaceDetails.addressDetails.country}, 
                ${suggestion.spaceDetails.addressDetails.region}, 
                ${suggestion.spaceDetails.addressDetails.city}, 
                ${suggestion.spaceDetails.addressDetails.address}`,
              }}
              handleSelect={handleSelect}
              value={value}
            />
          );
        })}
      </ListSection>

      {/* clear button */}
      <ClearButton
        type="button"
        onClick={() => {
          setValue("");
          setMatchedList([]);
        }}
      >
        <MdOutlineClear style={{ fontSize: "15px" }} />
      </ClearButton>

      {/* link to all spaces page button */}
      <FindButton onClick={() => navigate("/spaces")} type="button">
        <MdRoom /> Find All Spaces
      </FindButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
  z-index: 1;
`;

const Input = styled.input`
  padding: 15px 25px;
  width: 100%;
  font-size: 1.4rem;
  border-radius: 50px;
  border: 1px solid #ccc;
  margin-left: 20px;

  &:focus {
    outline: #cf6a87 solid 3px;
    outline-offset: 1px;
  }
`;

const ListSection = styled.ul`
  width: 95%;
  position: absolute;
  top: 65px;
  background: white;
  line-height: 1.5rem;
  display: ${(p) => (p.disApper ? "none" : "block")};
  border-radius: 5px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ClearButton = styled.button`
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
  padding: 10px 12px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  position: relative;
  right: 55px;
  opacity: 50%;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const FindButton = styled.button`
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  width: 250px;
  font-size: 1rem;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  min-height: 60px;
  outline: none;
  padding: 10px 24px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
  position: relative;
  right: 20px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export default SearchBar;
