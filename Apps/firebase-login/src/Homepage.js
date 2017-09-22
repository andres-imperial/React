import React, {Component} from 'react';
import Authen from './Authen';
var firebase = require('firebase');


class Homepage extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedIn: true
    };
    this.logout = this.logout.bind(this);
  }

  logout(){
    const email = this.props.email;
    firebase.auth().signOut();
    this.setState({
      err: 'Thanks for using our app ' + email,
      loggedIn: false
    });
  }

  render(){
    if(!this.state.loggedIn){
      return(
        <Authen/>
      )
    }
    return(
      <div>
        <header className='greeting'>
          <h2>Hi {this.props.email}</h2>
          <button onClick={this.logout} id='logout' className=''>Log Out</button>
        </header>
        <h1>
          Hello and welcome to my main page!!!
        </h1>
      </div>
    );
  }
}

export default Homepage;
