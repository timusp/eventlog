import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Route,
   Redirect,
   Router,
   browserHistory,
   IndexRoute
 } from "react-router-dom";
import './index.css';
import GLogin from './GLogin'
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import EventDetails from './EventDetails';

import Test from './test';

//import { AUTHENTICATE_THE_USER } from './actions/types';



import AddEvent from './AddEventNew';
import ModifyEvent from './ModifyEventNew';

import EventCard from './EventCard';
import EventPage from './EventPage';
import TopBar from './TopBar';
import NotAuth from './NotAuth';
import ContainerPanel from "./base/ContainerPanel";

import {Button,Grid} from '@material-ui/core/';


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

  renderAuth(){

    
    if(this.state.isAuth){
      localStorage.setItem('document',JSON.stringify(this.state));
      if(this.state.isNew){
        return(<Redirect to={{pathname: "/selectclubs",}} />)
      }
      else{
        return(<Redirect to={{pathname: "/dashboard",}} />)
      }

      
    }
    else{
      return(<Redirect to={{pathname: "/",}} />)
    }
  }


  componentWillMount() {
      this.documentData = JSON.parse(localStorage.getItem('document'));
      if (localStorage.getItem('document')) {
          this.setState({
            cur_user:this.documentData.cur_user,
            isNew:this.documentData.isNew,
            isAuth:this.documentData.isAuth,
            isOrg:this.documentData.isOrg,
        })
      } else {
          this.setState({
            cur_user:0,
            isNew:false,
            isAuth:false,
            isOrg:false,
          })
      }
  }

  render(){

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
          onRed={(redevent)=>this.setState({redevent})}
        />
        <ProtectedRoute
          exact path='/selectclubs'
          component={SelectClub}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/addevent'
          component={AddEvent}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/modifyevent'
          component={ModifyEvent}
          event={this.state.redevent}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
        />
        <ProtectedRoute
          exact path='/event'
          component={EventDetails}
          event={this.state.redevent}
          isAuth={this.state.isAuth}
          cur_user={this.state.cur_user}
        />

        {
          this.renderAuth()
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
    <BrowserRouter><BasicExample /></BrowserRouter>,
    //<GLogin />,
    //<EventCard />,
    //<SelectClub />,
    //<Test />,
    //<BrowserRouter><MainPage /></BrowserRouter>,
    //<EventDetails />,
    //<AddEvent />,
    //<TopBar />,
    //<ModifyEvent event_id={1}/>,
    //<NotAuth />,
    document.getElementById('root')
 );
  