import styled, { css } from "styled-components";

const ButtonStyled = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  color: white;
  background-color: black;
  cursor: pointer;

  ${(props) => {
    return (
      props.outline &&
      css`
        border: 2px solid gray;
        background-color: white;
        border-radius: 6px;
        color: black;
        font-size: 20px;
      `
    );
  }}
`;

function Button({ loading, ...rest }) {
  return (
    <ButtonStyled {...rest} disabled={loading}>
      {loading ? "저장중입니다...." : rest.children}
    </ButtonStyled>

    // <ToasterContext.Consumer>
    //     {
    //          ({addToast}) => (<ButtonStyled {...rest} disabled={loading} onClick={() => addToast({text: "책 업로드 성공", type:"success"})}>
    //              {loading ? "저장중입니다...." : rest.children}
    //          </ButtonStyled>)
    //     }
    // </ToasterContext.Consumer>
  );
}

export default Button;
