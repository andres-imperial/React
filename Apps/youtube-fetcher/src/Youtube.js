import React, {Component} from 'react';
var firebase = require('firebase');
const API = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'
const result = 10;
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCtB5ba9u1G1kiGGYAiz25uCDIcwcC5QJA",
    authDomain: "youtube-searcher-d5694.firebaseapp.com",
    databaseURL: "https://youtube-searcher-d5694.firebaseio.com",
    projectId: "youtube-searcher-d5694",
    storageBucket: "youtube-searcher-d5694.appspot.com",
    messagingSenderId: "140240708116"
  };
firebase.initializeApp(config);


class Youtube extends Component {

  constructor(props){
    super(props);

    this.state = {
      profile: this.props.profile,
      noneFound: '',
      resultyt: [],
      channelName: '',
      channelID: '',
      titles: [],
      savedChannels: []
    };


    // Bind Functions
    this.getSavedChannel = this.getSavedChannel.bind(this);
    this.saveChannel = this.saveChannel.bind(this);
    this.getChannelID = this.getChannelID.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.retrieve = this.retrieve.bind(this);
  }

  //============================================================================
  componentWillMount(){
    // Get profiles saved channels from database upon app load up.
    var channels = firebase.database().ref('users/'+this.state.profile.user_id+'/channels');
    channels.once('value', function(snapshot) {
      this.setState({savedChannels:snapshot.val()});
    }.bind(this));
  }

  //============================================================================
  handleSearch(event) {
    event.preventDefault();
    var URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,id,statistics&forUsername=${this.state.channelName}&key=AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA`;
    this.getChannelID(URL);
  }

  //============================================================================
  getChannelID(URL){
    fetch(URL)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.items.length){
          // show save button if channel is not saved yet
          if(this.state.savedChannels.indexOf(this.state.channelName) === -1){
            document.getElementById('saveButton').className = '';
          }
          this.setState({noneFound:false});
          // Set states channelID and search for channels latest 10 videos
          this.setState({channelID: responseJson.items[0].id});
          var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${this.state.channelID}&part=snippet,id&order=date&maxResults=${result}`;
          this.retrieve(finalURL);
        }
        else{
          // Channel name produced no results
          this.setState({noneFound:true});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //============================================================================
  getSavedChannel(event){
    event.preventDefault();
    var URL = `https://www.googleapis.com/youtube/v3/channels?part=snippet,id,statistics&forUsername=${event.target.text}&key=AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA`;
    this.setState({channelName: event.target.text});
    // Hide save button
    document.getElementById('saveButton').className = 'hide';
    this.getChannelID(URL);
  }

  //============================================================================
  handleChange(event) {
    this.setState({channelName: event.target.value});
    // Hide save button
    document.getElementById('saveButton').className = 'hide';
  }

  //============================================================================
  saveChannel(){
    // If profile has no saved channels reference database and add first entry
    if(this.state.savedChannels === null){
      let channelArr = [this.state.channelName];
      this.setState({savedChannels: channelArr}, () => {
        console.log(this.state.savedChannels, this.state.savedChannels.length);
        firebase.database().ref('users/'+this.state.profile.user_id).set({
          channels: this.state.savedChannels
        });
      });
    }
    // If profile has saved channels and current channel is not already saved
    // concat current channel to array of saved channels and submit to database.
    else if(this.state.savedChannels.indexOf(this.state.channelName) === -1){
      this.setState({savedChannels: this.state.savedChannels.concat(this.state.channelName)}, () => {
        firebase.database().ref('users/'+this.state.profile.user_id).set({
          channels: this.state.savedChannels
        });
      });
    }
  }

  //============================================================================
  retrieve(finalURL){
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseJson) => {
        const resultyt = responseJson.items.map(obj =>'https://www.youtube.com/embed/'+obj.id.videoId);
        const titles = responseJson.items.map(obj => obj.snippet.title);
        this.setState({resultyt,titles});
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //============================================================================
  render() {
    // Rendering if no results are displayed
    if(this.state.noneFound){
      return (
        <div id='youtube-page'>
          <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                  <li className="sidebar-brand">
                      <a href="#">
                        Saved Channels
                      </a>
                  </li>
                  {
                    this.state.savedChannels !== null &&
                    this.state.savedChannels.map((channel, i) => {
                      var savedChannels =
                        <li key={i}>
                            <a onClick={this.getSavedChannel} href="#">{channel}</a>
                        </li>
                        return savedChannels;
                    })
                  }
                  {this.savedChannels}
              </ul>
          </div>
          <div id='page-content'>
            <br/>
            <form className='search' onSubmit={this.handleSearch}>
              <label> Search Channel Name:
                <input type="text" value={this.state.channelName} onChange={this.handleChange} />
              </label>
              <input className='submitButton' type="submit" value="Submit" />
            </form>
            <button id='saveButton' className='hide' onClick={this.saveChannel}>Save {this.state.channelName} Page</button>
            <h3 className='alert'>No Results Found</h3>
          </div>
        </div>
      );
    }
    // Rendering if results are found
    else{
      return (
        <div id='youtube-page'>
          <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                  <li className="sidebar-brand">
                      <a href="#">
                        Saved Channels
                      </a>
                  </li>
                  {
                    this.state.savedChannels !== null &&
                    this.state.savedChannels.map((channel, i) => {
                      var savedChannels =
                        <li key={i}>
                            <a onClick={this.getSavedChannel} href="#">{channel}</a>
                        </li>
                        return savedChannels;
                    })
                  }
                  {this.savedChannels}
              </ul>
          </div>
          <div id='page-content'>
            <br/>
            <form className='search' onSubmit={this.handleSearch}>
              <label>
                Search Channel Name:
                <input type="text" value={this.state.channelName} onChange={this.handleChange} />
              </label>
              <input className='submitButton' type="submit" value="Submit" />
            </form>
            <button id='saveButton' className='hide' onClick={this.saveChannel}>Save {this.state.channelName} Page</button>
              {
                this.state.resultyt.map((link, i) => {
                  var frame =
                    <div className='youtube' key={i}>
                      <iframe className='videoArea' title={this.state.titles[i]} width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe>
                    </div>
                    return frame;
                })
              }
              {this.frame}
          </div>
        </div>
      );
    }

  }
}

export default Youtube;
