import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Two extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <h1>I am Two component</h1>
      </div>
    );
  }
}

export default Two;
