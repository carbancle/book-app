import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import BookItem from "./BookItem";
import AddBook from "./AddBook";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "books"), (snapshot) => {
      setBooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="bookList">
      <AddBook />
      <div className="book-list">
        <h2>책 목록</h2>

        {!books.length ? "북 리스트가 존재하지 않습니다." : books.map((book) => <BookItem book={book} key={book.id} />)}
      </div>
    </div>
  );
}

export default BookList;
