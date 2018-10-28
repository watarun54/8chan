import { connect } from 'react-redux';
import * as actionsUser from '../actions/User';
import * as actionsTodo from '../actions/Todo';
import Login from '../components/Login';
import { push } from 'react-router-redux';


const mapStateToProps = state => {
  return {
    user: state.user,
    todo: state.todo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => {
        dispatch(actionsUser.login(email, password));
    },
    onRedirect: (path) => {
        dispatch(push(path));
    },
    onResetDataPosts: () => {
        dispatch(actionsTodo.resetDataPosts());
    },
    onResetDataUser: () => {
        dispatch(actionsUser.resetDataUser());
    }
    
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
