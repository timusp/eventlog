import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Route,
   Redirect
 } from "react-router-dom";
import './index.css';
import GLogin from './GLogin'
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import EventDetails from './EventDetails';

import AddEvent from './AddEventNew';

import EventCard from './EventCard';
import EventPage from './EventPage';
import TopBar from './TopBar';
import NotAuth from './NotAuth';
import ContainerPanel from "./base/ContainerPanel";

import {Button,Grid} from '@material-ui/core/';


import ModifyEvent from './ModifyEvent';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProtectedRoute } from './protected.route';



class BasicExample extends React.Component {
  constructor(){
    super()
    //this._child= React.createRef();
    this.state={
      cur_user:0,
      isNew:false,
      isAuth:false,
      isOrg:false,
    }
  }

  Sess(){

    localStorage.setItem('myCat', 'Tom');
  }
  render(){

    const renderAuth = ()=>{
      if(this.state.isAuth){
        if(this.state.isNew){
          return(<Redirect to={{pathname: "/selectclubs",}} />)
        }
        else{
          return(<Redirect to={{pathname: "/dashboard",}} />)
        }
        
      }
    }
    return (
      <div>

        <Route
          exact path='/'
          render={(props) => <GLogin {...props} onLogin={(cur_user,isNew,isAuth,isOrg)=>{this.setState({cur_user:cur_user,isNew:isNew,isAuth:isAuth,isOrg:isOrg})}} />}
        />
        <ProtectedRoute
          exact path='/dashboard'
          component={MainPage}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
          isOrg={this.state.isOrg}
        />
        <ProtectedRoute
          exact path='/selectclubs'
          component={SelectClub}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
        />
        

        {
          renderAuth()
        }
        
        

        {/*
        <GLogin onLogin={(cur_user,isNew,isAuth)=>{this.setState({cur_user:cur_user,isNew:isNew,isAuth:isAuth})}} />
          
          this.select()
        */}
        

      </div>
    )}
  componentDidMount() {
    //this.setState(({cur_user:this._child.current.getCurUser()}))
  }
};
export default BasicExample;




  // ========================================
  
 ReactDOM.render(
    //<BrowserRouter><BasicExample /></BrowserRouter>,
    //<GLogin />,
    //<EventCard />,
    //<SelectClub />,
    //<BrowserRouter><MainPage /></BrowserRouter>,
    <AddEvent />,
    //<TopBar />,
    //<ModifyEvent event_id={1}/>,
    //<NotAuth />,
    document.getElementById('root')
 );
  