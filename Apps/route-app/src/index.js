import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import FourPointOne from './FourPointOne';
import NoMatch from './NoMatch';


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/One' component={One}/>
        <Route path='/Two' component={Two}/>
        <Route path='/Three' component={Three}/>
        <Route path='/Four/:id' component={FourPointOne}/>
        <Route path='/Four' component={Four}></Route>
        <Route path='/NoMatch' component={NoMatch}/>
        <Redirect to='/NoMatch'/>
      </Switch>
    </div>
  </Router>

, document.getElementById('root'));
registerServiceWorker();
