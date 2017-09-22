import React, {Component} from 'react';
import Homepage from './Homepage';
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
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      this.setState({
        err: 'Welcome ' + user.email,
        email: user.email,
        loggedIn: true
      });
    });

    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "Welcome " + user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      this.setState({
        err: 'Welcome ' + user.email,
        email: user.email,
        loggedIn: true
      });
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState(({err: err}));
    });
  }

  logout(){
    const email = this.refs.email.value;
    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
    this.setState({err: 'Thanks for using our app ' + email});
  }

  google(){
    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then(result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });
      this.setState({
        err: 'Welcome ' + user.email,
        email: user.email,
        loggedIn: true
      });
    });
    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      err: '',
      loggedIn: false
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render() {
    if(this.state.loggedIn){
      return(
        <div>
          <Homepage email={this.state.email}/>
        </div>
      )
    }
    return (
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email'/>
        <br/>
        <input id='pass' ref='password' type='password' placeholder='Enter your password'/>
        <br/>
        <p>{this.state.err}</p>
        <button onClick={this.login}>Log In</button>
        <button onClick={this.signup}>Sign Up</button>
        <button onClick={this.logout} id='logout' className='hide'>Log Out</button>
        <br/>
        <button onClick={this.google} id='google' className='google'>Sign In with Google</button>
      </div>
    );
  }
}

export default Authen;
