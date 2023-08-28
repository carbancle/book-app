import { useContext, useEffect } from "react";
import { createContext, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import reducer, { initialState } from "./reducer";
import { auth } from "./firebase";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      // console.log(authUser);

      if (authUser) {
        // 유저가 방금 로그인하거나 이미 한 상태
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // 사용자가 로그아웃 되었거나 로그인 하지 않았을 때
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <StateContext.Provider value={{ user, dispatch }}>
      <>{children}</>
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
