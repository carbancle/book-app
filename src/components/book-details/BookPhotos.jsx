import React, { useState } from "react";
import { Divider, DropBox, Gallery, ImgProgress } from "../../ui";
import { getBase64URL, resizeImg } from "../../functions/imageFn";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function BookPhotos({ book, id }) {
  const dbRef = doc(db, "books", id);
  const [image, setImage] = useState([]);

  const onFiles = async (files) => {
    for (let i = 0; i < files.length; i++) {
      try {
        const base64URL = await getBase64URL(files[i]);

        setImage((image) => [...image, { url: base64URL, percent: 0 }]);

        const blob = await resizeImg(base64URL, 2000);
        const imageName = `images/books/${Date.now()}.jpeg`;
        const imageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(imageRef, blob, { contentType: "image/jpeg" });

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            let percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percent);
            setImage((image) => image.map((img, j) => (j === i ? { url: img.url, percent } : img)));
            console.log(percent, i);
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
            setTimeout(() => setImage((image) => image.filter((img, j) => j === i)), 800);
            console.log(image);

            await updateDoc(dbRef, {
              photos: arrayUnion(downloadURL),
            });
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="bookPhotos">
      <h1>도서 사진 정보</h1>
      {book.photos && book.photos.length ? <Gallery imgs={book.photos} id={id} /> : <p>리스트에 사진이 없습니다</p>}
      <Divider />
      <DropBox onFiles={onFiles} />
      {image.map((img) => (
        <ImgProgress imgURL={img.url} percent={img.percent} />
      ))}
    </div>
  );
}

export default BookPhotos;
