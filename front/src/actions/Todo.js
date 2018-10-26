import axios from 'axios'
import update from 'immutability-helper';
import { config } from '../config';


// const CHAT_API_URL = 'https://watarun54.com/api/chat';
const CHAT_API_URL = config.CHAT_API_URL;


//　リクエスト開始
const startRequest = todo => ({
    type: 'START_REQUEST',
    payload: { todo },
});
//　レスポンス受信
const receiveData = (error, response) => ({
    type: 'RECEIVE_DATA',
    payload: { error, response },
});
// リクエスト完了
const finishRequest = todo => ({
    type: 'FINISH_REQUEST',
    payload: { todo },
});

const filterTodoList = (todoList, user_id) => {
    const updatedList = todoList.filter((ele) => {
        return (ele.user_id === user_id);
      })
    return updatedList;
}

export const fetchList = () => {
    // getState関数でstate.todoにアクセスする
    return async (dispatch, getState) => {
        const todo = getState().todo;
        const user = getState().user;
        let token = user.token;
        let user_id = user.user_id;

        console.log(token);
        console.log(typeof(user_id));

        dispatch(startRequest(todo));

        axios.get(`${CHAT_API_URL}?token=${token}`)
            .then(res => {
                console.log(res.data);
                const response = res.data.posts;
                const updatedResponse = filterTodoList(response, user_id);
                dispatch(receiveData(null, updatedResponse.reverse()));
            }).catch(err => 
                dispatch(receiveData(err))
            )

        dispatch(finishRequest(todo));
    };
};

export const createProduct = (product, selectedPriority) => {
    return async (dispatch, getState) => {
        const todo = getState().todo;
        const user = getState().user;
        let token = user.token;
        let user_id = user.user_id;

        axios.post(`${CHAT_API_URL}?token=${token}`, {text: product, priority:selectedPriority, name: "created", user_id: user_id})
            .then((res) => {
                console.log(res.data);
                const newData = update(todo.todoList, {$unshift:[res.data.data]})
                dispatch(receiveData(null, newData));
                console.log("create and set");
            }).catch(err => {
                dispatch(receiveData(err)) 
                console.log(err);
            })
        
        dispatch(finishRequest(todo));
    }
}

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        const todo = getState().todo;
        const user = getState().user;
        let token = user.token;

        axios.delete(`${CHAT_API_URL}/${id}?token=${token}`)
            .then((res) => {
                const productIndex = todo.todoList.findIndex(x => x.id === id)
                const newData = update(todo.todoList, {$splice: [[productIndex, 1, ]]})
                dispatch(receiveData(null, newData));
                console.log("delete and set");
            })
            .catch((err) => {
                dispatch(receiveData(err));
            })

        dispatch(finishRequest(todo));
    }
}

export const deleteUserProducts = () => {
    return async (dispatch, getState) => {
        const todo = getState().todo;
        const user = getState().user;

        let token = user.token;
        let user_id = user.user_id;

        axios.delete(`${CHAT_API_URL}/user/${user_id}?token=${token}`)
            .then((res) => {
                console.log(res.data);
                console.log("delete and set");
            })
            .catch((err) => {
                dispatch(receiveData(err));
            })

        dispatch(finishRequest(todo));
    }
}

export const updateProduct = (id, product, selectedPriority) => {
    return async (dispatch, getState) => {
        const todo = getState().todo;
        const user = getState().user;
        const token = user.token;

        const user_id = user.user.id || localStorage.getItem('userId');

        axios.put(`${CHAT_API_URL}/${id}?token=${token}`,{text: product ,priority: selectedPriority, name: "updated", user_id: user_id})
            .then((res) => {
                const productIndex = todo.todoList.findIndex(x => x.id ===id)
                const newData = update(todo.todoList, {[productIndex]: {$set: res.data.data}})
                dispatch(receiveData(null, newData));
                console.log("update and set")
            })
            .catch((err) => {
                dispatch(receiveData(err));
            })
        
        dispatch(finishRequest(todo));
    }
}