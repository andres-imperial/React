import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class One extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <h1>I am One component</h1>
      </div>
    );
  }
}

export default One;
