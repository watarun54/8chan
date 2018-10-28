const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    user_id: Number(localStorage.getItem('userId')),
    message: '',
    tokenExpired: 0,
    userDeleted: 0,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'START_REQUEST_USER':
        return {
          user: {},
          token: null,
          user_id: null,
          message: '',
          tokenExpired: 0,
          userDeleted: 0,
          error: false
        };
  
      case 'RECEIVE_DATA_USER':
        return action.payload.error
          ? { ...state, error: true }
          : {
              ...state,
              user: action.payload.response.user || {},
              token: action.payload.response.token || localStorage.getItem('token'),
              user_id: action.payload.response.user.id || Number(localStorage.getItem('userId')),
              message: '',
          };

      case 'RECEIVE_ERROR_USER':
        return {
            user: {},
            token: null,
            user_id: null,
            message: action.payload.response.error
        }

      case 'RESET_DATA_USER':
        return {
            user: {},
            token: null,
            user_id: null,
            message: '',
            tokenExpired: 0,
            userDeleted: 0,
            error: false
        };

      case 'RECEIVE_TOKEN_EXPIRED':
        return {
          user: {},
          token: null,
          user_id: null,
          message: '',
          //tokenExpired: action.payload.user.tokenExpired === 1 ? 0 : 1,
          tokenExpired: 1,
          userDeleted: 0
        };

      case 'USER_DELETED':
        return {
          user: {},
          token: null,
          user_id: null,
          message: 'ユーザーを消去しました',
          tokenExpired: 0,
          userDeleted: 1
        }
  
      default:
        return state;
    }
  };