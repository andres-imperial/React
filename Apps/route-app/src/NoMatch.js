import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Three extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="./">Home</Link></li>
        </ul>
        <h1>This page was not found....</h1>
      </div>
    );
  }
}

export default Three;
