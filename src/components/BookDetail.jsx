import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { doc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import BookGeneral from "./book-details/BookGeneral";
import BookAuthors from "./book-details/BookAuthors";
import BookPhotos from "./book-details/BookPhotos";
import BookMenu from "./book-details/BookMenu";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState("");

  const dbRef = collection(db, "books");

  useEffect(() => {
    try {
      onSnapshot(doc(dbRef, id), (snapshot) => {
        setBook(snapshot.data());
      });
    } catch (e) {
      console.error(e);
    }
  }, [dbRef, id]);

  return (
    <div className="bookDetail">
      <BookMenu id={id} />

      {
        // 중첩 routing 을 App 페이지가 아닌 해당 페이지에서 진행하는 케이스
        // 조건문에 맞춰서 데이터를 보여주기 위해서 작업진행
        // book 데이터를 가지고 있을 때 해당 데이터에 맞는 정보를 표시함
        // 현재 페이지인 BookDetail 에서는 경로 변경 없이 BookGeneral 페이지를 호출하고
        // BookAuthors, BookPhotos는 페이지 주소가 변경됨에 따라 BookGeneral 정보와 변경됨
        book ? (
          <Routes>
            <Route path="/" element={<BookGeneral book={book} id={id} />} />
            <Route path="/authors" element={<BookAuthors book={book} id={id} />} />
            <Route path="/photos" element={<BookPhotos book={book} id={id} />} />
          </Routes>
        ) : (
          "저장된 내역이 존재하지 않습니다."
        )
      }
    </div>
  );
}

export default BookDetail;
