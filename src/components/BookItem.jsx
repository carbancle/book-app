import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { Divider } from "../ui";

function BookItem({ book }) {
  const { user } = useStateValue();

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate(`/book/${book.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bookItem">
      <h1 onClick={handleClick} style={{ cursor: "pointer" }}>
        {book.title}
      </h1>
      <span>
        <strong>책 제목: </strong> {book.title}
      </span>
      <br />
      <span>
        <strong>페이지 수: </strong> {book.pages}
      </span>
      <br />
      <span>
        <strong>출판일: </strong> {new Date(book.publishDate.toDate()).toLocaleString()}
      </span>
      <Divider />
    </div>
  );
}

export default BookItem;
