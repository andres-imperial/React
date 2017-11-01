import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Youtube from './Youtube';
import Auth0Lock from 'auth0-lock';
import Header from './Header';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      idToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID: 'hi10zR7uB8f0lb4LRIFEp4pZYbjxEogx',
    domain: 'ai-auth0.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain, {auth: {responseType: 'id_token'}});

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }

        this.setProfile(authResult.idToken, profile);
      });
    });
    this.getProfile();
  }

  setProfile(idToken, profile){
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    if(localStorage.getItem('idToken') != null){
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      });
    }
  }

  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({
      idToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  render() {
    let yt;

    // If user is logged in display the youtube fetcher app, else tell them to
    // login.
    if(this.state.idToken){
      yt = <Youtube profile={this.state.profile}/>
    } else {
      yt =
      <div className='alert'>
        <h3>
         "Click on Login to view Youtube Fetcher"
        </h3>
      </div>
    }

    return (
      <div className="App">
        <Header
          lock={this.lock}
          idToken={this.state.idToken}
          onLogout={this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
          />
        {yt}
      </div>
    );
  }
}

export default App;
