import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const StyleHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: lavender;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;

  .header_title {
    margin-top: auto;
    margin-right: 30px;
  }

  .header_search {
    display: flex;
    flex: 0.5;
    align-items: center;
    border-radius: 24px;
  }

  .header_searchInput {
    padding: 10px;
    border: none;
    width: 100%;
    height: 12px;
  }

  .header_searchIcon {
    background-color: #cd9042;
    height: 22px;
    padding: 5px;
  }

  .header_option {
    display: flex;
    flex-direction: column;
    margin-left: 25px;
    align-items: center;
  }

  .header_optionLineOne {
    font-size: 10px;
    color: black;
    font-weight: bold;
  }

  .header_optionLineTwo {
    font-size: 10px;
    font-weight: 800;
    margin-top: 3px;
  }
`;

function Header() {
  const { user } = useStateValue();

  console.log(user);

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
  };

  return (
    <StyleHead>
      <h1 className="header_title">
        <Link to="/">도서 조회 사이트</Link>
      </h1>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <Search className="header_searchIcon" />
      </div>

      <div className="header_option">
        <span className="header_optionLineOne">{user ? user.email : "guest"}</span>

        <Link to={!user && "/login"}>
          <span className="header_optionLineTwo" onClick={handleAuthentication}>
            {user ? "로그아웃" : "로그인"}
          </span>
        </Link>
      </div>
    </StyleHead>
  );
}

export default Header;
