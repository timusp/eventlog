import React from 'react';
import ReactDOM from 'react-dom';
import {
   BrowserRouter,
   Switch,
   Route
 } from "react-router-dom";
import './index.css';
import GLogin from './GLogin'
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import AddEvent from './AddEvent';
import EventCard from './EventCard';
import TopBar from './TopBar';


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
    }
  }

  select(){
    
    if(this.state.isAuth){
      
      if(this.state.isNew){
        
        return(
          <ProtectedRoute exact path="/" component={SelectClub} isAuth={this.state.isAuth} isNew={this.state.isNew} cur_user={this.state.cur_user} />
        )
      }
      else{
        
        return(
          <ProtectedRoute exact path="/" component={MainPage} isAuth={this.state.isAuth} isNew={this.state.isNew}  cur_user={this.state.cur_user}/>
        )
      }

    }
  }

  render(){

    return (
      <div>
        <GLogin onLogin={(cur_user,isNew,isAuth)=>{this.setState({cur_user:cur_user,isNew:isNew,isAuth:isAuth})}} />
        {this.select()}
        

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
    //<MainPage />,
    //<AddEvent />,
    //<TopBar />,
    //<ModifyEvent event_id={1}/>,
    document.getElementById('root')
 );
  