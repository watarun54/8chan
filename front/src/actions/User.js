import axios from 'axios'
import { config } from '../config';


// const LOGIN_API_URL = 'https://watarun54.com/api/login';
const LOGIN_API_URL = config.LOGIN_API_URL;

// const REGISTER_API_URL = 'https://watarun54.com/api/register';
const REGISTER_API_URL = config.REGISTER_API_URL;


//　リクエスト開始
const startRequest = user => ({
    type: 'START_REQUEST_USER',
    payload: { user },
});
//　レスポンス受信
const receiveData = (error, response) => ({
    type: 'RECEIVE_DATA_USER',
    payload: { error, response },
});
// リクエスト完了
const finishRequest = user => ({
    type: 'FINISH_REQUEST_USER',
    payload: { user },
});

const receiveError = response => ({
    type: 'RECEIVE_ERROR_USER',
    payload: { response }
})

const resetData = () => ({
    type: 'RESET_DATA_USER',
});

const receiveTokenExpired = user => ({
    type: 'RECEIVE_TOKEN_EXPIRED',
    payload: { user }
});

const userDeleted = () => ({
    type: 'USER_DELETED'
});

export const resetDataUser = () => {
    return async (dispatch, getState) => {
        dispatch(resetData());
        console.log("reset user data");
    }
}

export const fetchUser = () => {
    return async (dispatch, getState) => {
        const user = getState().user;

        let token = user.token;
        let user_id = user.user_id;

        dispatch(startRequest(user));

        axios.get(`${LOGIN_API_URL}/${user_id}?token=${token}`)
            .then(res => {
                console.log(res.data);
                if (res.data.user) {
                    dispatch(receiveData(null, res.data));
                    console.log("fetch user data");
                } else {
                    dispatch(receiveTokenExpired(user));
                }
            }).catch(err => 
                dispatch(receiveData(err))
            )

        dispatch(finishRequest(user));
    };
}

export const editUser = (email, password) => {
    return async (dispatch, getState) => {
        const user = getState().user;

        let token = user.token;
        let user_id = user.user_id;

        console.log(user);

        axios.put(`${LOGIN_API_URL}/${user_id}?token=${token}`,{email: email ,password: password})
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    dispatch(receiveData(null, res.data));
                    console.log("edit user data");
                } else {
                    dispatch(receiveTokenExpired(user));
                }
            })
            .catch((err) => {
                dispatch(receiveData(err));
            })
        
        dispatch(finishRequest(user));
    }
}

export const deleteUser = () => {
    return async (dispatch, getState) => {
        const user = getState().user;

        let token = user.token;
        let user_id = user.user_id;

        axios.delete(`${LOGIN_API_URL}/${user_id}?token=${token}`)
            .then((res) => {
                if (res.data.results) {
                    console.log("delete user data");
                    dispatch(userDeleted());
                } else {
                    dispatch(resetData());
                }
            })
            .catch((err) => {
                dispatch(receiveData(err));
            })

        dispatch(finishRequest(user));
    }
}

export const login = (email, password) => {
    return async (dispatch, getState) => {
        const user = getState().user;

        axios.post(`${LOGIN_API_URL}`, {email: email, password: password})
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    dispatch(receiveData(null, res.data));
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.user.id);
                    console.log("login user success");
                } else {
                    dispatch(receiveError(res.data));
                }
            }).catch(err => {
                dispatch(receiveData(err)) 
                console.log(err);
            })
        
        dispatch(finishRequest(user));
    }
}

export const register = (email, password) => {
    return async (dispatch, getState) => {
        const user = getState().user;

        axios.post(`${REGISTER_API_URL}`, {email: email, password: password})
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    dispatch(receiveData(null, res.data));
                    console.log("register user success");
                } else {
                    dispatch(receiveError(res.data));
                }
            }).catch(err => {
                dispatch(receiveData(err)) 
                console.log(err);
            })
        
        dispatch(finishRequest(user));
    }
}
