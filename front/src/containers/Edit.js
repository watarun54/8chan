import { connect } from 'react-redux';
import * as actionsUser from '../actions/User';
import * as actionsTodo from '../actions/Todo';
import Edit from '../components/Edit';
import { push } from 'react-router-redux';


const mapStateToProps = state => {
  return {
    user: state.user,
    todo: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
        dispatch(actionsUser.fetchUser());
    },
    onDelete: (id) => {
        dispatch(actionsUser.deleteUser(id));
    },
    onEdit: (email, password) => {
        dispatch(actionsUser.editUser(email, password));
    },
    onRedirect: (path) => {
        dispatch(push(path));
    },
    onReset: () => {
        dispatch(actionsUser.resetDataUser());
    },
    onDeleteUserProducts: () => {
        dispatch(actionsTodo.deleteUserProducts());
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
