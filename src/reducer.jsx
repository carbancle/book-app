export const initialState = {
  user: null,
};

// reducer 변수를 정의, 상태(state)와 행동(action) 값을 인자로 갖는다.
const reducer = (state, action) => {
  // 행동 타입에 관한 switch 문 실행
  switch (action.type) {
    // 행동이 SET_USER 라면
    case "SET_USER":
      // 이전 상태(state)를 반환 - 여기서 state 는 상단 초기 상태 값인 initialState 인 user: null 이 됨
      // 해당 user 값에 action.user 값을 대입하여 반환
      return {
        ...state,
        user: action.user,
      };
    // 초기값은 초기 상태가 된다.
    default:
      return state;
  }
};

export default reducer;
