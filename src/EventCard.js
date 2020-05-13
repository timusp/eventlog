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
        }
        

    }
    

    
    componentWillReceiveProps(props) {

    }
    
  
    renderButtons(){
        if(this.props.added===4){
            return(
                <CardActions>
                    <Button variant="outlined" size="small" color="primary"
                        onClick={()=>{this.setState({confirm:"overlay"},this.props.onConfirm(this.state.confirm))}}
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
                        onClick={()=>this.setState({eventRed:<Redirect to={{pathname: "/event",state:{event:this.props.resp}}} />})}
                    >
                        More
                    </Button>
                    <Button variant="contained" size="small" color="primary" onClick={()=>this.register(this.props.resp.event_id)}>
                        Register
                    </Button>
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
            .then((data)=>console.log(data))
            .catch((err)=>console.log(err))
    }

    render(){
        return(
            <Container margin={1}>
              
            
                <Card>
                <CardActionArea>
                    
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
                        {this.props.resp.event_date}
                        

                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.resp.event_venue}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {this.renderButtons()}
                {this.state.eventRed}
                
                </Card>
            </Container>
        )

    }
}

export default EventCard;