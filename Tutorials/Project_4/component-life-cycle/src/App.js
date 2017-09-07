import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Component Life Cycle</h2>
        </div>
        <Body/>
      </div>
    );
  }
}

class Body extends Component {
  ComponentWillMount() {
    console.log("ComponentWillMount called here");
  }

  constructor(props) {
    super(props);

    this.state = {
      r: 0
    };
    this.getRandomNumber = this.getRandomNumber.bind(this);
  }

  getRandomNumber() {
    // console.log("random number called");
    this.setState({
      r: Math.floor(Math.random() * 10)
    })
  }

  render() {
    return (
      <div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <button onClick={this.getRandomNumber}>Random Number</button>
        <Numbers myNumber={this.state.r}/>
      </div>
    );
  }
}

class Numbers extends Component {
  componentWillMount() {
      console.log('Component WILL MOUNT!')
   }

  componentDidMount() {
    console.log("ComponentDidMount called here");
  }

  componentWillReceiveProps(newProps) {
    console.log("componentWillReceiveProps called");
  }

  shouldComponentUpdate(newProps, nextState) {
    console.log('Called should component update');
    return true;
  }

  componentWillUpdate(newProps, nextState) {
    console.log('Called component will update');
  }

  componentDidUpdate(newProps, nextState) {
    console.log('Called component did update');
  }

  componentWillUnmount() {
    console.log('Called component will unmount');
  }

  render() {
    return (
      <div>
        <br/> {this.props.myNumber}
      </div>
    );
  }
}
export default App;
