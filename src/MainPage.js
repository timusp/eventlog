import React from 'react';
import './index.css';
import Event from './Event'

class MainPage extends React.Component{
    constructor(){
        super();
        this.state={
            org_flag:true,
            cur_user:2,
            tab:0,
            events:[{
                event_id:null,
                club_id:null,
                event_name:null,
                event_date:null,
                event_time:null,
                event_venue:null,
                event_type:null,
                event_desc:null,
                event_poster:null,
                event_reg_link:null,
                event_reg_fee:null,
                event_reg_deadline:null,
                modified:null,
            }],
        }
    }
/*
    componentDidMount(){
        this.getEvents();

    }
*/
    getEvents () {
        if(this.state.tab===0){
            //get allevents

            fetch("http://localhost:8000/api/allevents")
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
                //console.log(res.data);
            })
            .catch(err=>err);
        
        }
        else if(this.state.tab===1){
            //get events for me
            fetch("http://localhost:8000/api/myevents/?user="+this.state.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})

                //console.log(res.data);
            })
            .catch(err=>err);
        }
        else if(this.state.tab===2){
            //get club events ----change
            fetch("http://localhost:8000/api/myevents/?user=")
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }
        else if(this.state.tab===3){
            //get registered events
            fetch("http://localhost:8000/api/regevents/?user="+this.state.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }
    }
    addEventToggle(){
        if(this.state.org_flag===true){
            return(
                <button className="addEventBtn">
                    Add Event
                </button>
            )
        }
    }

    render(){
       // console.log(this.state.resp[1]);
       

       return(
            <div>
                <div className="Border">

                
                    <div className="tabContainer">
                        <button className="btnA" onClick={()=>{this.setState({tab:0})}}>All Events</button>
                        <button className="btnA" onClick={()=>{this.setState({tab:1})}}>Events for me</button>
                        <button className="btnA" onClick={()=>{this.setState({tab:2})}}>Clubwise Events</button>
                        <button className="btnA" onClick={()=>{this.setState({tab:3})}}>Registered Events</button>
                    </div>

                    
                            <div className="events">
                                
                                {this.getEvents()}
                                {
                                    this.state.events.map((item, index) => (
                                        <Event key={index} resp={item} />
                                    ))
                                }
                          

                            </div>
                            {this.addEventToggle()}
                        

                </div>
            </div>
        )    
    
    
    }
}
export default MainPage;