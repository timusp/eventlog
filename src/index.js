import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Link
 } from "react-router-dom";
import './index.css';
import GLogin from './GLogin'
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import AddEvent from './AddEvent';
import ModifyEvent from './ModifyEvent';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BasicExample() {
   return (
   <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <GLogin />
          </Route>
          <Route path="/about">
            <MainPage />
          </Route>
          <Route path="/dashboard">
          <SelectClub />,
          </Route>
        </Switch>
      </div>
    </Router>
   )}





  // ========================================
  
 ReactDOM.render(
    //<BasicExample />,
    //<GLogin />,
    <SelectClub />,
    //<MainPage />,
    //<AddEvent />,
    //<ModifyEvent event_id={1}/>,
    document.getElementById('root')
 );
  