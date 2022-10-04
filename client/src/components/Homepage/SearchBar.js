import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineClear, MdRoom } from "react-icons/md";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [matchedList, setMatchedList] = useState([]);

  return (
    <Wrapper>
      <Input
        type="text"
        value={searchValue}
        placeholder="Where do you want to go? (Country, region, city...)"
        onChange={(evt) => {
          setSearchValue(evt.target.value);

          // setMatchedList(
          //   suggestions.filter((ele) => {
          //     if (
          //       ele.title
          //         .toLowerCase()
          //         .includes(evt.target.value.toLowerCase()) &&
          //       evt.target.value.length > 1
          //     ) {
          //       return ele.title;
          //     }
          //   })
          // );
        }}

        // handleSelect={(suggestion) => {
        //   window.alert(suggestion);
        // }}

        // onKeyDown={(evt) => {
        //   if (evt.key === "Enter") {
        //     handleSelect(evt.target.value);
        //   }
        // }}
      />

      <ClearButton
        type="button"
        onClick={() => {
          setSearchValue("");
          setMatchedList([]);
        }}
      >
        <MdOutlineClear style={{ fontSize: "15px" }} />
      </ClearButton>

      <FindButton
        type="button"
        onClick={() => {
          setSearchValue("");
          setMatchedList([]);
        }}
      >
        <MdRoom /> Find Spaces
      </FindButton>

      {/* <ListWrapper disApper={matchedList.length === 0}>
        {matchedList.map((suggestion) => {
          return (
            <Suggestion
              key={suggestion.id}
              suggestion={suggestion}
              handleSelect={handleSelect}
              value={value}
              category={categories[suggestion.categoryId].name}
            />
          );
        })}
      </ListWrapper> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const ListWrapper = styled.ul`
  line-height: 1.5rem;
  display: ${(p) => (p.disApper ? "none" : "block")};
  margin-top: 10px;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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
