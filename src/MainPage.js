import React from 'react';
import './index.css';
import EventCard from './EventCard'
import {Grid,Button,Box,Checkbox,FormLabel, Container} from '@material-ui/core/';
import TopBar from './TopBar';
import {
    Redirect
  } from "react-router-dom";

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ProtectedRoute } from './protected.route';
import EventDetails from './EventDetails';




class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cur_user:5,isOrg:true,
            //cur_user:this.props.cur_user,isOrg:this.props.isOrg,
            tab:0,
            club:null,
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
            red:null,
            overlay:"hidden",
        }
        
    }

    componentDidMount(){
        this.getEvents(0);
    }

    getEvents (val) {
        console.log("tan")
        if(val===0){
            this.setState({tab:0})
            //get allevents

            fetch("http://localhost:8000/api/allevents")
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data},console.log("changed"))
                //console.log(res.data);
            })
            .catch(err=>err);
        
        }
        
        else if(val===1){
            //get events for me
            this.setState({tab:1})
            fetch("http://localhost:8000/api/myevents/?user="+this.state.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})

                //console.log(res.data);
            })
            .catch(err=>err);
        }
        else if(val===2){
            //get club events ----change
            this.setState({tab:2})
            fetch("http://localhost:8000/api/allevents")
            .then(res=>res.json())
            .then(res=>{
                var temp=[];
                res.data.map((event)=>{
                  if(event.club_id===this.state.club){
                    temp.push(event)
                  }
                })
                this.setState({events:temp})
            })
            .catch(err=>err);
        }
        else if(val===3){
            this.setState({tab:3})
            //get registered events
            fetch("http://localhost:8000/api/regevents/?user="+this.state.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }
        else if(val===4){
            this.setState({tab:4})
            //get registered events
            fetch("http://localhost:8000/api/addedevents/?user="+this.state.cur_user)  //add user here
            .then(res=>res.json())
            .then(res=>{
                this.setState({events:res.data})
            })
            .catch(err=>err);
        }

        
    }
    
    addedEvents(){
        if(this.state.isOrg===true){
            return(
                <Button onClick={()=>{this.getEvents(4)}}>Added Events</Button>    
            )
        }
        else{
            return(null)
        }
    }

    addEventToggle(){
        if(this.state.isOrg===true){
            return(
                <Fab onClick={()=>this.setState({red:<Redirect to={{pathname: "/addevent",}} />})} color="secondary" aria-label="add">
                    <AddIcon />
                </Fab>
            )
        }
        else{
            return(null)
        }
    }

    dropDown(){
        if(this.state.tab===2){

            return(
                <Box
                    display="flex"
                    justifyContent="center"
                    marginTop={1}
                >
                <Box width={150}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" value={this.state.club}>Select Club</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.club}
                        onChange={event=>{this.setState({club:event.target.value});this.getEvents(2)}}
                    >
                        <MenuItem value={1}>Food Club</MenuItem>
                        <MenuItem value={2}>Photography Club</MenuItem>
                        <MenuItem value={3}>Rangmanch</MenuItem>
                        <MenuItem value={4}>Workshops</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                </Box>
            )
        }
        else{
            return(null)
        }
    }

    renderOverlay(){
        return(<div className={this.state.overlay}>

            <Box
                
                display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
            <Box 
                width={400}
                display="flex"
                height={200}
                justifyContent="center"
                alignItems="center"
                
               
            >   <div style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"white",width:"100%",height:"100%"}}>
                
                    <Box marginTop={-5}>
                    <FormLabel><h5>Are you sure ?</h5></FormLabel>
                    </Box>
                    <Box margin={1} marginTop={10}>
                        <Button 
                            variant="outlined" 
                            size="small" 
                            color="primary"
                            onClick={()=>{this.deleteEvent(this.state.delete_id)}}
                        >
                        Yes
                        </Button>
                    </Box>
                
                    <Box margin={1} marginTop={10}>
                            <Button 
                                hidde
                                variant="contained" 
                                size="small" 
                                color="secondary"
                                onClick={()=>{this.setState({overlay:"hidden"})}}
                            >
                                No
                            </Button>
                        </Box>
                 

                </div>
                </Box>
            </Box>
        </div>)
    }

    deleteEvent(event_id){
        console.log(event_id)
        fetch("http://localhost:8000/api/eventdelete/?"+event_id)
            .then(res=>res.json())
            .then(res=>{
                //console.log(res.data);
            })
            .catch(err=>err);
    }


    
    render(){
       // console.log(this.state.resp[1]);
       document.body.style = 'background: ;';
       return(
            <div>
                {this.renderOverlay()
                }
            <TopBar />
                    <Box
                        display="flex"
                        justifyContent="center"
                        marginTop={15}
                        >
                        <Button onClick={()=>{this.getEvents(0)}}>All Events</Button>
                        <Button onClick={()=>{this.getEvents(1)}}>Events for me</Button>
                        <Button onClick={()=>{this.getEvents(2)}}>Clubwise Events</Button>
                        <Button onClick={()=>{this.getEvents(3)}}>Registered Events</Button>
                        
                        {this.addedEvents()}
                        <Box width={20}></Box>
                
                        {this.addEventToggle()}
                        
                    </Box>
                    {this.dropDown()}
                    <Box
                        padding={5}
                        display="flex"
                        justifyContent="center"
                    >
                        <Box width={900} >
                                    <GridList cols={3} cellHeight="35%">
                                        {
                                            this.state.events.map((item, index) => (
                                                <Box key={index} marginBottom={2}>
                                                    <GridListTile cols={1} key={index}>
                                                        <EventCard 
                                                            key={index} 
                                                            resp={item} 
                                                            added={this.state.tab} 
                                                            onConfirm={(val)=>{
                                                                this.setState({overlay:val,delete_id:item.event_id})
                                                            }}
                                                        />
                                                        <ProtectedRoute
                                                            exact path='/event'
                                                            component={EventDetails}
                                                            resp={item}
                                                        />
                                                    </GridListTile>
                                                </Box>
                                            ))
                                        }
                                    </GridList>
                        </Box>
                 </Box>       
                 {this.state.red}
                 
            </div>
        )    
    }
}
export default MainPage;