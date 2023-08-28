import React from "react";
import { useRef } from "react";
import { Button, Field, Message } from "../ui";
import profileImg from "../ui/profile-placeholder.png";
import { getBase64URL } from "../functions/imageFn";

function AuthorForm({ error, loading, onSubmit, author, setAuthor }) {
  const imgRef = useRef();

  const handleFile = async (e) => {
    const base64URL = await getBase64URL(e.target.files[0]);

    // 변경된 URL 방식의 데이터를 load 한다. 데이터 형식이 변경되지 않으면 load 할 수 없다.
    // imgRef.current.src = e.target.result;
    setAuthor({
      ...author,
      photo: base64URL,
    });
  };

  const handleChange = (e) => {
    setAuthor({
      ...author,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="authorForm">
      <form action="" onSubmit={onSubmit}>
        <Field labelText="작가 이름" id="author-name">
          <input type="text" name="name" id="author-name" placeholder="이름" value={author.name} onChange={handleChange} />
        </Field>

        <Field labelText="사진" id="author-photo">
          <div>
            <figure>
              <img ref={imgRef} src={author.photo === "" ? profileImg : author.photo} width="120" alt="" />
            </figure>

            <input type="file" onChange={handleFile} name="photo" id="author-photo" accept="image/*" />
          </div>
        </Field>

        <Field labelText="작가 소개" id="author-description">
          <textarea name="description" id="author-description" rows="8" value={author.description} onChange={handleChange} />
        </Field>

        <Message text={error} type="error" />

        <Button loading={loading} type="submit">
          작가 추가하기
        </Button>
      </form>
    </div>
  );
}

export default AuthorForm;
