import React from 'react';
//import EventCard from './EventCard';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import {
    //BrowserRouter,
    //Route,
    Redirect,
    //Router,
    //browserHistory,
    //IndexRoute
  } from "react-router-dom";
import {ProtectedRoute} from './protected.route'
import EventDetails from './EventDetails'

import AnnouncementIcon from '@material-ui/icons/Announcement';

import foodImg from './images/food_club.png'
import artImg from './images/art_club.png'
import photoImg from './images/photo_club.png'
import envImg from './images/env_club.png'
import danceImg from './images/dance_club.png'





class EventCard extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props);
        this.state={
            confirm:null,
            eventRed:null,
            temp:false,
        }
    }
    

    
    componentWillReceiveProps(props) {

    }
    
    renderRegBtn(){
        if(this.state.reg){
            return(
                <Button variant="contained" size="small" color="secondary" onClick={()=>this.unregister(this.props.resp.event_id)}>
                        Unregister
                </Button>
            )
        }else{
            return(
                <Button variant="contained" size="small" color="primary" onClick={()=>this.register(this.props.resp.event_id)}>
                        Register
                </Button>
            )
        }
    }
    renderButtons(){
        if(this.props.added===4){
            return(
                <CardActions>
                    <Button variant="outlined" size="small" color="primary"
                        onClick={()=>{
                            this.setState({eventRed:<Redirect to={{pathname: "/modifyevent",}} />},
                            this.props.onRed(this.props.resp)
                            )
                        }}
                    >
                        Modify
                    </Button>
                    <Button variant="contained" size="small" color="secondary"
                        onClick={()=>{this.setState({confirm:"overlay"},this.props.onConfirm(this.state.confirm))}}
                    >
                        Delete
                    </Button>
                </CardActions>
            )
        }
        else{
            return(
                <CardActions>
                    <Button variant="outlined" size="small" color="primary"
                        onClick={()=>{
                            this.setState({eventRed:<Redirect to={{pathname: "/event",}} />},
                            this.props.onRed(this.props.resp)
                            )
                        }}
                    >
                        More
                    </Button>
                    {this.renderRegBtn()}
                </CardActions>
            )
        }
    }

    getCardImage(club){
        var cardImage=null;
        if(club===1){cardImage=foodImg}
        else if(club===2){cardImage=photoImg}
        else if(club===3){cardImage=artImg}
        else if(club===4){cardImage=danceImg}
        else if(club===5){cardImage=envImg}
        return cardImage
    }

    register(event_id){
        const req={user_id:this.props.cur_user,event_id:event_id}
        fetch('http://localhost:8000/api/eventregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            //.then((data)=>console.log(data))
            .catch((err)=>console.log(err))
    }

    unregister(event_id){
        const req={user_id:this.props.cur_user,event_id:event_id}
        fetch('http://localhost:8000/api/unregister', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            //.then((data)=>console.log(data))
            .then(this.setState({temp:!this.state.temp}))
            .catch((err)=>console.log(err))
    }

    componentWillMount(){
    }

    isRegistered(){
        const req={user_id:5,event_id:this.props.resp.event_id}
        fetch('http://localhost:8000/api/getregs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req)
        })
        .then((res) => res.json())
        .then((data)=>this.setState({reg:data.reg}))
        .catch((err)=>console.log(err))
    }
    modifyMark(){
        if(this.props.resp.isModified==="true"){
            return(<Box textAlign="right"><AnnouncementIcon color="secondary"/></Box>)
        }else{return(null)}}

    render(){
        this.isRegistered()
        return(
            <Container margin={1}>
              
            
                <Card>
                <CardActionArea>
                    {this.modifyMark()}
                    <CardMedia
                        component="img"
                        height="140"
                        image={this.getCardImage(this.props.resp.club_id)}
                        title={this.props.resp.event_name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.resp.event_name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.resp.start_date}
                        

                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.resp.event_venue}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {this.renderButtons()}
                
                </Card>
                {this.state.eventRed}
                
            </Container>
        )

    }
}

export default EventCard;
