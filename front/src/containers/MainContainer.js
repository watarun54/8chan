import { connect } from 'react-redux';
import * as actionsTodo from '../actions/Todo';
import * as actionsUser from '../actions/User';
import MainContainer from '../components/MainContainer';
import { push } from 'react-router-redux';


const mapStateToProps = state => {
  return {
    todo: state.todo,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMount: () => {
        dispatch(actionsTodo.fetchList());
    },
    onCreate: (item, selectedPriority) => {
        dispatch(actionsTodo.createProduct(item, selectedPriority));
    },
    onDelete: (id) => {
        dispatch(actionsTodo.deleteProduct(id));
    },
    onUpdate: (id, item, selectedPriority) => {
        dispatch(actionsTodo.updateProduct(id, item, selectedPriority));
    },
    onRedirect: (path) => {
        dispatch(push(path));
    },
    onReset: () => {
        dispatch(actionsUser.resetDataUser());
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)
