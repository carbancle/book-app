import React, { useContext, useState } from "react";
import styled from "styled-components";
import { db, storage } from "../firebase";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import IconButton from "./IconButton";
import { ToasterContext } from "./ToasterContext";

const Figure = styled.div`
  position: relative;
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0) 30%);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  :hover {
    div {
      opacity: 1;
    }
  }
`;

function Image({ img, id }) {
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToasterContext);
  const dbRef = doc(db, "books", id);
  var imageRef = ref(storage, img);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteObject(imageRef);
      await updateDoc(dbRef, {
        photos: arrayRemove(img),
      });
      addToast({ text: "성공적으로 이미지를 삭제했습니다.", type: "success" });
    } catch (e) {
      addToast({ text: "이미지 삭제에 실패했습니다.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <Figure>
      <img src={img} height="150" alt="" />
      <div>
        <IconButton loading={loading} color="white" onClick={handleDelete} />
      </div>
    </Figure>
  );
}

export default Image;
