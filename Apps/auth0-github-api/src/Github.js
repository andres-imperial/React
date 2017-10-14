import React, {Component} from 'react';
import Profile from './Components/Profile';
import Search from './Components/Search';

const API = 'https://api.github.com/users';
class Github extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: 'andres-imperial',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: ''
    };
  }

  getProfile(username){
    let reqURL = `${API}/${username}`;

    fetch(reqURL)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      })
    })
    .catch((error) => console.log('Problem encountered: ' + error))
  }

  componentDidMount(){
    this.getProfile(this.state.username);
  }

  render(){
    return(
      <div>
        <section>
          <Search searchProfile={this.getProfile.bind(this)}/>
          <Profile userData={this.state}/>
        </section>
      </div>
    );
  }
}

export default Github;
