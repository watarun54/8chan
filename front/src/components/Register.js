import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import MediaQuery from 'react-responsive';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_conf: '',
            message: '',
            visible: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user.user.id);
        if (nextProps.user.message.length !== 0) {
            this.setState({ message: nextProps.user.message, visible: true});
        }
        if (nextProps.user.user.id) {
            this.props.onRedirect('/login');
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    onRegister = () => {
        if (this.state.email.length === 0) {
            this.setState({ message: 'emailを入力してください', visible: true });
        } else if (this.state.password.length === 0) {
            this.setState({ message: 'パスワードを入力してください', visible: true });
        } else if (this.state.password !== this.state.password_conf) {
            this.setState({ message: 'パスワードが一致しません', visible: true })
        } else {
            this.props.onRegister(this.state.email, this.state.password);
            this.setState({email: '', password: '', password_conf: '', message: ''})
        }
    }

    toLogin = () => {
        this.props.onRedirect("/login");
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
                    <h2>新規登録</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" value={this.state.email} name="email" id="exampleEmail" placeholder="xxx@example.com" onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" value={this.state.password} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password（確認用）</Label>
                        <Input type="password" value={this.state.password_conf} name="password" id="examplePasswordConf" placeholder="password" onChange={(e) => this.setState({ password_conf: e.target.value })} />
                        </FormGroup>
                        
                        <Button onClick={this.onRegister}>登録</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toLogin}>>> ログイン画面へ</p>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery minWidth={768}>
                <div className="pc-login-container">
                    <h2>新規登録</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" value={this.state.email} name="email" id="exampleEmail" placeholder="xxx@example.com" onChange={(e) => this.setState({ email: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" value={this.state.password} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ password: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">Password（確認用）</Label>
                        <Input type="password" value={this.state.password_conf} name="password" id="examplePasswordConf" placeholder="password" onChange={(e) => this.setState({ password_conf: e.target.value })} />
                        </FormGroup>
                        
                        <Button onClick={this.onRegister}>登録</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toLogin}>>> ログイン画面へ</p>
                    </div>
                </div>
            </MediaQuery>

            </div>
            
        );
    }

}

export default Register