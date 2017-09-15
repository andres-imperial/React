import React, {Component} from 'react';
var firebase = require('firebase');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDLrOHxkcHZsPj5h1pDiGqdywTx3D8-Yds",
    authDomain: "fir-login-94152.firebaseapp.com",
    databaseURL: "https://fir-login-94152.firebaseio.com",
    projectId: "fir-login-94152",
    storageBucket: "fir-login-94152.appspot.com",
    messagingSenderId: "53287781999"
  };
  firebase.initializeApp(config);


class Authen extends Component {
  login(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    // TODO: handle login process

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      err: ''
    };
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email'/>
        <br/>
        <input id='pass' ref='password' type='password' placeholder='Enter your password'/>
        <br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button>Sign Up</button>
        <button>Log Out</button>
      </div>
    );
  }
}

export default Authen;
