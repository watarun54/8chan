import axios from 'axios'
import update from 'immutability-helper';


const API_URL = 'https://watarun54.com/api/chat';

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

export const fetchList = () => {
    // getState関数でstate.todoにアクセスする
    return async (dispatch, getState) => {
        const todo = getState().todo;

        dispatch(startRequest(todo));

        axios.get(`${API_URL}`)
            .then(res => {
                console.log(res.data);
                const response = res.data.posts;
                dispatch(receiveData(null, response.reverse()));
                let todo_updated = response.filter((ele) => {
                    return (ele.name === 'updated');
                })
        
                console.log(todo_updated);
            }).catch(err => 
                dispatch(receiveData(err))
            )

        dispatch(finishRequest(todo));
    };
};

export const createProduct = (product, selectedPriority) => {
    return async (dispatch, getState) => {
        const todo = getState().todo;

        axios.post(`${API_URL}`, {text: product, priority:selectedPriority, name: "created"})
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

        axios.delete(`${API_URL}/${id}`)
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

export const updateProduct = (id, product, selectedPriority) => {
    return async (dispatch, getState) => {
        const todo = getState().todo;
        axios.put(`${API_URL}/${id}`,{text: product ,priority: selectedPriority, name: "updated"})
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