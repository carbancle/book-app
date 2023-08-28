import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button, Field, Message } from "../ui";
import { ToasterContext } from "../ui/ToasterContext";

function EditBook({ book, id }) {
  const [bookTitle, setBookTitle] = useState(book.title);
  const [bookPage, setBookPage] = useState(book.pages);
  const [bookPublish, setBookPublish] = useState(book.publishDate.toDate().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dbRef = doc(db, "books", id);

  const handleBook = async (addToast, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateDoc(
        dbRef,
        {
          title: bookTitle,
          pages: parseInt(bookPage),
          publishDate: new Date(bookPublish),
        },
        { merge: true }
      );

      addToast({ text: "수정 되었습니다.", type: "success" });
    } catch (e) {
      setError("수정에 실패하였습니다.");
      addToast({ text: "수정에 실패하였습니다.", type: "error" });
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  return (
    <ToasterContext.Consumer>
      {({ addToast }) => (
        <div className="editBook">
          <form action="" onSubmit={handleBook.bind(this, addToast)}>
            <Field labelText="제목" id="book-title">
              &nbsp;
              <input type="text" name="name" id="book-title" value={bookTitle} placeholder="제목" onChange={(e) => setBookTitle(e.target.value)} />
            </Field>

            <Field labelText="페이지 수" id="book-pages">
              &nbsp;
              <input type="number" name="pages" id="book-pages" value={bookPage} placeholder="페이지 수" onChange={(e) => setBookPage(e.target.value)} />
            </Field>

            <Field labelText="출판일" id="book-publish_date">
              &nbsp;
              <input type="date" name="publish_date" id="book-publish_date" value={bookPublish} placeholder="출판일" onChange={(e) => setBookPublish(e.target.value)} />
            </Field>

            <Button type="submit" disabled={loading}>
              {loading ? "저장 중입니다..." : "저장하기"}
            </Button>

            <Message text={error} type="error" />
          </form>
        </div>
      )}
    </ToasterContext.Consumer>
  );
}

export default EditBook;
