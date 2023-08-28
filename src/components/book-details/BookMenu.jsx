import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledUl = styled.ul`
  list-style: none;
  padding: 0;
  li {
    padding: 4px;
    margin: 5px;
    background-color: #f0f0f0;
    display: inline-block;

    &.active {
      background-color: #ccc;
    }
  }
`;

function BookMenu({ id }) {
  const location = useLocation();
  return (
    <div className="bookMenu">
      <StyledUl>
        <ul>
          <li className={location.pathname ? `/book/${id}` && "active" : undefined}>
            <Link to={`/book/${id}`}>일반정보</Link>
          </li>
          <li className={location.pathname ? `/book/${id}/authors` && "active" : undefined}>
            <Link to={`/book/${id}/authors`}>작가 정보</Link>
          </li>
          <li className={location.pathname ? `/book/${id}/photos` && "active" : undefined}>
            <Link to={`/book/${id}/photos`}>사진 정보</Link>
          </li>
        </ul>
      </StyledUl>
    </div>
  );
}

export default BookMenu;
