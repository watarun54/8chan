import React from 'react';
import EmergencyAndImportant from './card-components/EmergencyAndImportant';
import Emergency from "./card-components/Emergency";
import Important from "./card-components/Important";
import FormContainer from './FormContainer';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';
import MediaQuery from 'react-responsive';
import classnames from 'classnames';

import { Alert } from 'reactstrap';


class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      visible: false
    }
  }

  componentWillMount() {
    this.props.onMount();
  }

  handleSubmit = (item, selectedPriority) => {
    if (item.length === 0) {
      this.setState({visible: true});
    } else {
      this.props.onCreate(item, selectedPriority);
    }
  }

  handleDelete = (id) => {
    this.props.onDelete(id);
  }

  handleUpdate = (id, updateText, updatedPriority, updateTextChange,selectedPriorityChanged) => {
    console.log(updateTextChange);
    console.log(selectedPriorityChanged);
    if (updateTextChange === 0 && selectedPriorityChanged === 0) {
      this.setState({visible: true});
      console.log("done");
    } else {
      this.props.onUpdate(id, updateText, updatedPriority);
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
        <div>
          
        {/*スマホ版 */}
        <MediaQuery maxWidth={767}>
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          テキストを入力してください
        </Alert>
        <div className="nav-area">
        <Nav　tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              緊急＆重要
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              緊急
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              重要
            </NavLink>
          </NavItem>
        </Nav>
        </div>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <div className="sp-main-container">
            <Container>
              <Row>
                <Col sm={12}>
                <FormContainer handleSubmit={this.handleSubmit} />
                  <div className="itemList">
                  {this.props.todo.emeImpList.map((item) => {
                    return (
                      <EmergencyAndImportant key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                    )
                  })}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          </TabPane>

          <TabPane tabId="2">
          <div className="sp-main-container">
            <Container>
              <Row>
                <Col sm={12}>
                <FormContainer handleSubmit={this.handleSubmit} />
                  <div className="itemList">
                  {this.props.todo.emeList.map((item) => {
                    return (
                      <Emergency key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                    )
                  })}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          </TabPane>

          <TabPane tabId="3">
          <div className="sp-main-container">
            <Container>
              <Row>
                <Col sm={12}>
                <FormContainer handleSubmit={this.handleSubmit} />
                  <div className="itemList">
                  {this.props.todo.impList.map((item) => {
                    return (
                      <Important key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                    )
                  })}
                  </div>
                </Col>
              </Row>
              </Container>
            </div>
          </TabPane>
        </TabContent>
        </MediaQuery>



        {/*PC版 */}
        <MediaQuery minWidth={768}>
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          テキストを入力してください
        </Alert>
        <div className="pc-main-container">
        <Container>
        <FormContainer handleSubmit={this.handleSubmit} />
          <Row>
            <Col md={4}>
              <h4>緊急＆重要</h4>
              <div className="itemList">
              {this.props.todo.emeImpList.map((item) => {
                return (
                  <EmergencyAndImportant key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                )
              })}
              </div>
            </Col>
            <Col md={4}>
              <h4>緊急</h4>
              <div className="itemList">
              {this.props.todo.emeList.map((item) => {
                return (
                  <Emergency key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                )
              })}
              </div>
            </Col>
            <Col md={4}>
              <h4>重要</h4>
              <div className="itemList">
              {this.props.todo.impList.map((item) => {
                return (
                  <Important key={item.id} item={item} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
                )
              })}
              </div>
            </Col>
          </Row>
        </Container>
        </div>
        </MediaQuery>

        </div>
    );
  }
}

export default MainContainer