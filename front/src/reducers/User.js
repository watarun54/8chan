const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    user_id: Number(localStorage.getItem('userId')),
    message: '',
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'START_REQUEST_USER':
        return {
          user: {},
          token: null,
          user_id: null,
          message: '',
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
            error: false
        };
  
      default:
        return state;
    }
  };