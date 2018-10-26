import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import Todo from './components/Todo';
import MainContainer from './containers/MainContainer';
import Login from './containers/Login';
import Register from './containers/Register';
import Edit from './containers/Edit';
import Auth from './containers/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Auth>
            <Switch>
              <Route exact path="/" component={MainContainer} />
              <Route exact path="/edit" component={Edit} />
            </Switch>
          </Auth>
        </Switch>
      </div>
    );
  }
}

export default App