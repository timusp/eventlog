import React from 'react';

class Event extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props);
        this.state={
            expand:false,
            resp:{
                eventName:null,
                club:null,
                date:null,
                time:null,
                venue:null,
                type:null,
                desc:null,
                poster:null,
                regLink:null,
                regFee:null,
                regDeadline:null,
                modified:null,
            }
        }
        
    }

    
    componentWillReceiveProps(props) {
        this.setState({resp: props.resp})
    }
    
    

    componentDidMount(){
        //this.getStates();
    }

    /*
    getStates(){
        fetch("http://localhost:8000/api/allevents")
          .then(res=>res.json())
          .then(res=>{
            //console.log(res.data.length);
            this.setState({resp:res.data})
          })
          .catch(err=>err);
    }
    */

    toggleExpand = ()=>{
        this.setState({expand:!this.state.expand})
    }

    render(){
        if(this.state.expand===false){
            return(
                <span >
                    <div className="event" >
                        <p key={this.state.resp.event_id}>{this.state.resp.event_name}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_date}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_time}</p>
                    </div>
                </span>
                   
                    
            );
            
        }
        else{
            return(
                    <div className="eventExpanded" >
                        <p key={this.state.resp.event_id}>{this.state.resp.event_name}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_date}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_time}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_venue}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_desc}</p>
                        <p key={this.state.resp.event_id}>{this.state.resp.event_event_reg_link}</p>
                        <img src={this.state.resp.event_poster}></img>
                    </div>
                
            );
        }

       
    }
}

export default Event;