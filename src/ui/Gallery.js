import React from "react";
import Image from "./Image";
import styled from "styled-components";

const StyleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  > div {
    margin: 4px;
  }
`;

function Gallery({ imgs, id }) {
  return (
    <StyleDiv>
      <div>
        {imgs.map((img) => (
          <Image img={img} id={id} alt="" />
        ))}
      </div>
    </StyleDiv>
  );
}

export default Gallery;
