import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useContext } from "react";
import { db, storage } from "../../firebase";
import { ToasterContext } from "../../ui/ToasterContext";
import profileImg from "../../ui/profile-placeholder.png";
import { excerpt } from "../../functions/stringFn";

function BookAuthor({ author, id }) {
  const { addToast } = useContext(ToasterContext);

  const dbRef = doc(db, "books", id);

  const imgRef = ref(storage, author.photo);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      if (author.photo !== "") await deleteObject(imgRef);

      await updateDoc(dbRef, {
        authors: arrayRemove(author),
      });

      addToast({ text: "선택한 작가가 삭제되었습니다.", type: "success" });
    } catch (e) {
      addToast({ text: "삭제에 실패했습니다", type: "error" });
    }
  };

  return (
    <div className="bookAuthor">
      <div>
        <figure>
          <img src={author.photo === "" ? profileImg : author.photo} width="120" alt="" />
        </figure>
      </div>
      <div>
        <h5>{author.name}</h5>
        <p>{excerpt(author.description)}</p>
      </div>
      <div>
        <button href="#" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default BookAuthor;
