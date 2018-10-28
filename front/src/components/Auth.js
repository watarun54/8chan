import React from 'react';
import { Route } from 'react-router-dom';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.user.token
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.tokenExpired === 1 || nextProps.todo.tokenExpired === 1) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            this.props.onRedirect("/login");
        }
        if (nextProps.user.userDeleted === 1) {
            this.props.onRedirect("/login");
        }
    }

    componentDidMount() {
        if (!this.state.token) {
            this.props.onRedirect("/login");
        }
    }

    render() {
        return (
            <Route children={this.props.children} />
        )
    }
}


export default Auth