import React, { Component } from 'react';
import './App.css';
// import Todo from './components/Todo';
import MainContainer from './containers/MainContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer />
      </div>
    );
  }
}

export default App