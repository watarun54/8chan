import React from 'react';
import { Route } from 'react-router-dom';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.user.token
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