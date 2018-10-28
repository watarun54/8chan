import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MediaQuery from 'react-responsive';


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            currentPassword: '',
            newPassword: '',
            newPasswordConf: '',
            message: '',
            visible: false,
            modal: false,
        }
    }

    componentWillMount() {
        this.props.onMount();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ email: nextProps.user.user.email})

        /*
        if (nextProps.user.userDeleted === 1) {
          this.props.onRedirect("/login");
        }
        */
    }

    onEdit = () => {
        if (this.state.email.length === 0) {
            this.setState({ message: 'emailを入力してください', visible: true });
        } else if (this.state.currentPassword.length === 0) {
            this.setState({ message: '現在のパスワードを入力してください', visible: true });
        } else if (this.props.user.user.password !== this.state.currentPassword) {
            this.setState({message: '現在のパスワードが間違っています', visible: true});
        } else if (this.state.newPassword.length === 0) {
            this.setState({ message: '新しいパスワードを入力してください', visible: true });
        } else if (this.state.newPassword !== this.state.newPasswordConf) {
            this.setState({ message: 'パスワードが一致しません', visible: true })
        } else {
            this.props.onEdit(this.state.email, this.state.newPassword);
            this.setState({email: '', currentPassword: '', newPassword: '', newPasswordConf: '', message: 'アカウント情報が更新されました', visible: true});
        }
    }
    
    onDelete = () => {
        this.props.onDeleteUserProducts();
        //this.setState({ modal: false });
        this.props.onDelete(this.props.user.user_id);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        //this.props.onReset();
        //this.props.onRedirect("/login");
    }

    toTop = () => {
        this.props.onRedirect("/");
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    deleteModalToggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    render() {
        console.log(this.props.user);
        return (
            
            <div className="login-container">
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                {this.state.message}
            </Alert>

            <Modal isOpen={this.state.modal} toggle={this.deleteModalToggle}>
                <ModalHeader toggle={this.deleteModalToggle}>確認</ModalHeader>
                <ModalBody>
                    アカウントを消去すると、アカウント情報及びTodoリストのデータ全てが消滅します。本当によろしいですか？
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.onDelete}>消去</Button>{' '}
                    <Button color="secondary" onClick={this.deleteModalToggle}>キャンセル</Button>
                </ModalFooter>
            </Modal>

            <MediaQuery maxWidth={767}>
                <div className="sp-login-container">
                    <h2>アカウント編集</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input plaintext className="login-email">{this.state.email || ""}</Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">現在のPassword</Label>
                        <Input type="password" value={this.state.currentPassword} name="password" id="examplePasswordPrev" placeholder="password" onChange={(e) => this.setState({ currentPassword: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">新しいPassword</Label>
                        <Input type="password" value={this.state.newPassword} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">新しいPassword（確認用）</Label>
                        <Input type="password" value={this.state.newPasswordConf} name="password" id="examplePasswordConf" placeholder="password" onChange={(e) => this.setState({ newPasswordConf: e.target.value })} />
                        </FormGroup>
                        
                        <Button color="danger" onClick={this.deleteModalToggle}>アカウント消去</Button>{" "}
                        <Button onClick={this.onEdit}>更新</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toTop}>>> 戻る</p>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery minWidth={768}>
                <div className="pc-login-container">
                    <h2>アカウント編集</h2>
                    <Form>
                        <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input plaintext className="login-email">{this.state.email || ""}</Input>
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">現在のPassword</Label>
                        <Input type="password" value={this.state.currentPassword} name="password" id="examplePasswordPrev" placeholder="password" onChange={(e) => this.setState({ currentPassword: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">新しいPassword</Label>
                        <Input type="password" value={this.state.newPassword} name="password" id="examplePassword" placeholder="password" onChange={(e) => this.setState({ newPassword: e.target.value })} />
                        </FormGroup>

                        <FormGroup>
                        <Label for="examplePassword">新しいPassword（確認用）</Label>
                        <Input type="password" value={this.state.newPasswordConf} name="password" id="examplePasswordConf" placeholder="password" onChange={(e) => this.setState({ newPasswordConf: e.target.value })} />
                        </FormGroup>
                        
                        <Button color="danger" onClick={this.deleteModalToggle}>アカウント消去</Button>{" "}
                        <Button onClick={this.onEdit}>更新</Button>
                    </Form>
                    <div className="login-to-register">
                        <p onClick={this.toTop}>>> 戻る</p>
                    </div>
                </div>
            </MediaQuery>

            </div>
            
        );
    }

}

export default Edit