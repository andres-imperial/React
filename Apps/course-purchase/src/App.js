import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CourseSales from './CourseSales';


class App extends Component {
  render() {

    var courses = [
      {name: 'Complete IOS dev course', price: 199.00},
      {name: 'Complete pentesting dev course', price: 189.00},
      {name: 'Complete frontend dev course', price: 139.00},
      {name: 'Complete backend dev course', price: 159.00}
    ];

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Course Purchase Page</h2>
        </div>
        <CourseSales items={courses}/>
      </div>
    );
  }
}


export default App;
