import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import MediaQuery from 'react-responsive';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            token: localStorage.getItem('token') || null,
            visible: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.token) {
            console.log(nextProps.user.token);
            this.props.onRedirect("/");
        }
        if (nextProps.user.message.length !== 0) {
            this.setState({ message: nextProps.user.message, visible: true});
            this.props.onResetDataUser();
        }
        if (nextProps.user.tokenExpired === 1 || nextProps.todo.tokenExpired === 1) {
            this.props.onResetDataPosts();
            this.props.onResetDataUser();
            this.setState({ message: 'ログインしてください', visible: true});
        }
    }

    componentWillMount() {
        if (Object.keys(this.props.user.user).length !== 0 && !this.props.user.token) {
            this.setState({ message: '新規登録に成功しました', visible: true});
            this.props.onResetDataUser();
        }
        if (this.props.user.userDeleted === 1) {
            this.setState({ message: this.props.user.message, visible: true});
            this.props.onResetDataUser();
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.user.tokenExpired === 1 || this.props.todo.tokenExpired === 1) {
            this.props.onResetDataPosts();
            this.props.onResetDataUser();
            this.setState({ message: 'ログインしてください', visible: true});
        }
        console.log(this.props.user.tokenExpired)
    }

    onLogin = () => {
        if (this.state.email.length === 0) {
            this.setState({ message: 'emailを入力してください', visible: true});
        } else if (this.state.password.length === 0) {
            this.setState({ message: 'パスワードを入力してください', visible: true});
        } else {
            this.props.onLogin(this.state.email, this.state.password);
            this.setState({email: '', password: '', message: '', visible: false});
        }
    }

    toRegister = () => {
        this.props.onRedirect("/register");
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        return (
            
            <div className="login-container">
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.state.message}
            </Alert>

            <MediaQuery maxWidth={767}>
                <div className="sp-login-container">
                    <h2>ログイン</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" value={this.state.email} name="email" id="exampleEmail" placeholder="xxx@example.com" onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" value={this.state.password} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </FormGroup>
                        
                        <Button onClick={this.onLogin}>ログイン</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toRegister}>>> 新規登録ページへ</p>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery minWidth={768}>
                <div className="pc-login-container">
                    <h2>ログイン</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" value={this.state.email} name="email" id="exampleEmail" placeholder="xxx@example.com" onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" value={this.state.password} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </FormGroup>
                        
                        <Button onClick={this.onLogin}>ログイン</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toRegister}>>> 新規登録ページへ</p>
                    </div>
                </div>
            </MediaQuery>

            </div>
            
        );
    }

}

export default Login