import React from "react";
import styled from "styled-components";

const Suggestion = ({ suggestion, handleSelect, value }) => {
  const getIndex = suggestion.address
    .toLowerCase()
    .indexOf(value.toLowerCase());
  const getIndexPoint = getIndex + value.length;

  return (
    <List onClick={() => handleSelect(suggestion)}>
      <span>
        {suggestion.address.slice(0, getIndexPoint)}
        <Prediction>{suggestion.address.slice(getIndexPoint)}</Prediction>
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
