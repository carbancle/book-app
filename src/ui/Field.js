import styled from "styled-components";

const StyledDiv = styled.div`
display: flex;
border-bottom: #f0f0f0 1px solid;
margin-bottom: 10px;
padding-bottom 10px;
`;

const StyledLabel = styled.label`
  margin-right: 6px;
  font-weight: bold;
  width: auto;
`;

function Field(props) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={props.id}>{props.labelText}</StyledLabel>
      <div>{props.children}</div>
    </StyledDiv>
  );
}

export default Field;
