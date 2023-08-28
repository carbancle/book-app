import React, { useState, useContext } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ToasterContext } from "../../ui/ToasterContext";
import AuthorForm from "../AuthorForm";
import BookAuthor from "./BookAuthor";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styled from "styled-components";
import { Divider } from "../../ui";

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 120px auto 50px;
  gap: 20px;
  max-width: 600px;
`;

function BookAuthors({ book, id }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState({
    name: "",
    photo: "",
    description: "",
  });

  function createImg(photo) {
    const img = new Image();
    img.src = photo;
    return new Promise((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    });
  }

  async function resizeImg(photo) {
    //const canvas = document.getElementById("imgCanvas");
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    const img = await createImg(photo);
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // Math 메소드를 활용해서 캔버스에 맞는 이미지 배율을 유지할 수 있도록 scale를 정한다

    let x = canvas.width / 2 - (img.width / 2) * scale;
    let y = canvas.height / 2 - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    });
  }

  const dbRef = doc(db, "books", id);

  const onSubmit = async (author, e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blob = await resizeImg(author.photo);
      const photoName = `images/author/${Date.now()}.jpeg`;
      const imageRef = ref(storage, photoName);
      const uploadTask = uploadBytesResumable(imageRef, blob, { contentType: "image/jpeg" });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (e) => {
          switch (e.code) {
            case "storage/unauthorized":
              console.error("허가 되지 않은 경로입니다");
              break;
            case "storage/unknown":
              console.error(e.serverResponse);
              break;
            default:
            // do nothing
          }
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("다운로드 URL : ", downloadURL);

          await updateDoc(dbRef, {
            authors: arrayUnion({ ...author, photo: downloadURL }),
          });

          // Author 값이 입력 완료되면 해당 Author 필드를 초기화함
          setAuthor({
            name: "",
            photo: "",
            description: "",
          });
          addToast({ text: "작가 정보가 추가 되었습니다.", type: "success" });
          setLoading(false);
        }
      );

      // await updateDoc(dbRef, {
      //   authors: arrayUnion(author),
      // });

      // addToast({ text: "작가 정보가 추가 되었습니다.", type: "success" });
    } catch (e) {
      // console.error("작가를 추가하는데 에러가 발생했습니다.", e)
      setError("작가를 추가하는데 실패했습니다.");
      setTimeout(() => {
        setError(null);
        setLoading(false);
      }, 3000);
    }
  };
  const { addToast } = useContext(ToasterContext);

  return (
    <div className="bookAuthors">
      <h1>작가 정보</h1>

      {/* <canvas id="canvas" height="250" width="250" /> */}

      <GridDiv>{book && book.authors ? book.authors.map((author) => <BookAuthor key={id} author={author} id={id} />) : "입력된 작가가 존재하지 않습니다."}</GridDiv>
      <Divider />
      <hr />
      <h4>작가 추가하기</h4>
      <AuthorForm error={error} loading={loading} onSubmit={onSubmit.bind(this, author)} author={author} setAuthor={setAuthor} />
    </div>
  );
}

export default BookAuthors;
