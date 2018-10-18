const initialState = {
  todoList: [],
  emeImpList: [],
  emeList: [],
  impList: [],
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

    default:
      return state;
  }
};