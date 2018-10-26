import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Auth from '../components/Auth';


const mapStateToProps = state => {
  return {
    todo: state.todo,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirect: (path) => {
            dispatch(push(path));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
