import React, { Component } from 'react';
import Header from './components/header/'
import Taskbar from './components/taskbar/'
import Tasklist from './components/tasklist/'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Taskbar/>
        <Tasklist/>
      </div>
    );
  }
}

export default App;
