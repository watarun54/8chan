const initialState = {
  todoList: [],
  emeImpList: [],
  emeList: [],
  impList: [],
  tokenExpired: 0,
}

const getEmeImpList = (todoList) => {
  const emeImpList = todoList.filter((ele) => {
      return (ele.priority === 0);
    })
  return emeImpList;
}

const getEmeList = (todoList) => {
  const emeList = todoList.filter((ele) => {
      return (ele.priority === 1);
    })
  return emeList;
}

const getImpList = (todoList) => {
  const impList = todoList.filter((ele) => {
      return (ele.priority === 2);
    })
  return impList;
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'START_REQUEST':
      return {
        todoList: [],
        emeImpList: [],
        emeList: [],
        impList: [],
        error: false
      };

    case 'RECEIVE_DATA':
      return action.payload.error
        ? { ...state, error: true }
        : {
            ...state,
            todoList: action.payload.response,
            emeImpList: getEmeImpList(action.payload.response),
            emeList: getEmeList(action.payload.response),
            impList: getImpList(action.payload.response),
        };

    case 'RESET_DATA_POSTS':
      return {
        todoList: [],
        emeImpList: [],
        emeList: [],
        impList: [],
        tokenExpired: 0,
        error: false
      };

    case 'RECEIVE_TOKEN_EXPIRED':
      return {
        todoList: [],
        emeImpList: [],
        emeList: [],
        impList: [],
        // tokenExpired: action.payload.user.tokenExpired === 1 ? 0 : 1
        tokenExpired: 1
      };

    default:
      return state;
  }
};