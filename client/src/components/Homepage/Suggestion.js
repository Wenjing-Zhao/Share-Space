import React from "react";
import styled from "styled-components";

// this function is for each mateched space address display in the list
const Suggestion = ({ suggestion, handleSelect, value }) => {
  // get input value index of the mateched space address
  const getValueIndex = suggestion.address
    .toLowerCase()
    .indexOf(value.toLowerCase());

  // get index between input value and prediction value
  const getIndex = getValueIndex + value.length;

  return (
    <List onClick={() => handleSelect(suggestion)}>
      <span>
        {suggestion.address.slice(0, getIndex)}
        <Prediction>{suggestion.address.slice(getIndex)}</Prediction>
      </span>
    </List>
  );
};

export default Suggestion;

const List = styled.li`
  padding: 10px;

  &:hover {
    background: var(--border-color);
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;
