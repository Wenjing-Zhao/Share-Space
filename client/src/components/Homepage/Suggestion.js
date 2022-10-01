import styled from "styled-components";

const Suggestion = ({ suggestion, handleSelect, value, category }) => {
  const getIndex = suggestion.title.toLowerCase().indexOf(value.toLowerCase());
  const getIndexPoint = getIndex + value.length;

  // console.log(getIndexPoint);

  return (
    <List onClick={() => handleSelect(suggestion.title)}>
      <span>
        {suggestion.title.slice(0, getIndexPoint)}
        <Prediction>{suggestion.title.slice(getIndexPoint)}</Prediction>
        <Span1> in </Span1>
        <Span2>{category}</Span2>
      </span>
    </List>
  );
};

export default Suggestion;

const List = styled.li`
  padding: 10px;

  &:hover {
    background: lightyellow;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Span1 = styled.span`
  font-size: 15px;
  font-style: italic;
`;

const Span2 = styled.span`
  font-size: 15px;
  font-style: italic;
  color: purple;
`;
