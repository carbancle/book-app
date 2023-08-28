import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Button, Field, Message } from "../ui";
import { ToasterContext } from "../ui/ToasterContext";

function SignIn() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { addToast } = useContext(ToasterContext);

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, login.email, login.password);

      addToast({ text: "로그인 되었습니다.", type: "success" });
      navigate("/");
    } catch (e) {
      console.error(e);
      setError(e.message);
      addToast({ text: "로그인에 실패했습니다.", type: "error" });
    }
    setLoading(false);
  };

  const handleRegist = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, login.email, login.password).then((e) => {
        addToast({ text: "회원가입 되었습니다.", type: "success" });
        navigate("/");
      });
    } catch (e) {
      console.error(e);
      setError(e.message);
      addToast({ text: "회원가입에 실패했습니다.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="singIn">
      <h2>로그인</h2>
      <form action="">
        <Field labelText="이메일 : ">
          <input type="email" name="email" id="email" value={login.email} onChange={handleChange} />
        </Field>
        <Field labelText="비밀번호 : ">
          <input type="password" name="password" id="password" value={login.password} onChange={handleChange} />
        </Field>
        <Button type="submit" loading={loading} onClick={handleSubmit}>
          로그인 하기
        </Button>
        <Button type="submit" loading={loading} onClick={handleRegist}>
          회원 가입
        </Button>

        <Message text={error} type="error" />
      </form>
    </div>
  );
}

export default SignIn;
