import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FourPointOne extends Component {
  render(){
    return(
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
        <h1>I am Four.1 component</h1>
      </div>
    );
  }
}

export default FourPointOne;
