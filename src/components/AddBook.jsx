import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Button, Field, Message, Modal } from "../ui";
import { ToasterContext } from "../ui/ToasterContext";
import { useStateValue } from "../StateProvider";

function AddBook() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookPage, setBookPage] = useState("");
  const [bookPublish, setBookPublish] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { user } = useStateValue();

  const navigate = useNavigate();

  const dbRef = collection(db, "books");

  const handleBook = async (addToast, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(dbRef, {
        title: bookTitle,
        pages: parseInt(bookPage),
        publishDate: new Date(bookPublish),
      });

      addToast({ text: "성공적으로 추가 되었습니다.", type: "success" });
      dbRef.id ? navigate(`/book/${dbRef.id}`) : navigate("/");
    } catch (e) {
      setError("에러가 발생하였습니다.");
      addToast({ text: "등록에 실패하였습니다.", type: "error" });
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleClick = () => {
    if (user) {
      setIsModal(true);
      setError(null);
    } else {
      navigate("/login");
    }
  };

  return (
    <ToasterContext.Consumer>
      {({ addToast }) => (
        <div className="addBook">
          <Button outline onClick={handleClick}>
            책 추가하기
          </Button>

          <Modal title="새로운 책 추가하기" show={isModal} close={() => setIsModal(false)}>
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
          </Modal>
        </div>
      )}
    </ToasterContext.Consumer>
  );
}

export default AddBook;
