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
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block">
                            <button onClick={this.toggleExpand}><i className="fa fa-chevron-right"></i></button> 
                        </div>
                        <div className="d-inline-block">
                            <p key={this.state.resp.event_id}>{` `+this.state.resp.event_name +` `+ this.state.resp.event_date+` `+this.state.resp.event_time+` `+this.state.resp.event_venue}</p>
                        </div>
                    </div>
            );
            
        }
        else{
            return(
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block">
                            <button onClick={this.toggleExpand}><i className="fa fa-chevron-down"></i></button> 
                        </div>
                        <div className="d-inline-block">
                            <p key={this.state.resp.event_id}>{this.state.resp.event_name +` `+ this.state.resp.event_date+` `+this.state.resp.event_time+` `+this.state.resp.event_venue+` `+this.state.resp.event_desc+` `+this.state.resp.event_reg_link}</p>
                            <img src={this.state.resp.event_poster}></img>
                        </div>
                    </div>
                );
        }

       
    }
}

export default Event;