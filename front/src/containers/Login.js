import { connect } from 'react-redux';
import * as actionsUser from '../actions/User';
import Login from '../components/Login';
import { push } from 'react-router-redux';


const mapStateToProps = state => {
  return {
    user: state.user
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
    onReset: () => {
        dispatch(actionsUser.reset());
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
