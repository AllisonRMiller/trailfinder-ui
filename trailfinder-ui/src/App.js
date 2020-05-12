import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Landing from './landing';
import LoginForm from './login.js';
// import SignupForm from './signup.js';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"
        >
          <Landing />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
