import { connect } from 'react-redux';
import * as actionsUser from '../actions/User';
import Register from '../components/Register';
import { push } from 'react-router-redux';


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (email, password) => {
        dispatch(actionsUser.register(email, password));
    },
    onRedirect: (path) => {
        dispatch(push(path));
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
