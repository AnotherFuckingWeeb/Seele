import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './views/Home'
import Login from './views/Login'
import SignUp from './views/SignUp'
import Projects from './views/Projects';
import Board from './views/Board'
import ProfileSettings from './views/ProfileSettings'
import ProjectSettings from './views/ProjectSettings'
import ForgotPassword from './views/ForgotPassword'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
