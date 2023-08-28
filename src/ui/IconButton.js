import React from "react";
import styled, { css } from "styled-components";
import { Delete } from "@mui/icons-material";
import CircularIndeterminate from "./Loading";

const Div = styled.div`
  cursor: pointer;

  ${({ color }) => {
    return (
      color &&
      css`
        div {
          color: ${color};
        }
      `
    );
  }}

  ${({ size }) => {
    return (
      size &&
      css`
        div {
          font-size: ${size};
        }
      `
    );
  }}
`;

function IconButton({ loading, color, size, onClick }) {
  return (
    <Div size={size} color={color}>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <div>
          <Delete className="delete" onClick={onClick} />
        </div>
      )}
    </Div>
  );
}

export default IconButton;
