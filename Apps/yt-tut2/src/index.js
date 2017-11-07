import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import routes from './routes';


ReactDOM.render(
  <Router>
    {routes}
  </Router>
, document.getElementById('root'));
registerServiceWorker();
