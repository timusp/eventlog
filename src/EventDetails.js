import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';
import TopBar from './TopBar'
import DropDown from './base/DropDown';
import ContainerPanel from './base/ContainerPanel';
import addicon from './images/addicon.JPG';
import PosterComponent from './PosterComponent';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import MoneyIcon from '@material-ui/icons/Money';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import {ProtectedRoute} from './protected.route'

// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';


class EventDetails extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            event:{
                event_id:null,
                club_id:null,
                event_name:null,
                start_time:null,
                end_time:null,
                event_venue:null,
                event_type:null,
                event_desc:null,
                event_poster:null,
                event_reg_link:null,
                paid:false,
                event_reg_deadline:null,
            }
        }
        
    }
    clubName(val){
        //if()

    }
    componentDidMount(){
        this.setState({event:this.props.event})
    }

    render() {
        return(
                
            <ContainerPanel>
            <TopBar />

            <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900, minHeight: "100vh" }}>
                <CssBaseline />

                <Paper style={{ padding: 50, minHeight: "89vh" }}>

                <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "0 0 7% 0"}}>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" component="h1" style={{paddingBottom: 10}} gutterBottom>
                                {this.state.event.event_name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                                    <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        maxHeight="200"
                                        padding="20"
                                        //style={{width: 400, height: "400%"}}
                                        image={this.state.event.event_poster}
                                    />  
                                    </CardActionArea>
                            </Grid>
                        <Grid item xs={12} align="center">
                        <Grid container alignItems="flex-start" spacing={2}>

                            <Grid item xs={12} align="center" style={{marginLeft: "5%", marginRight: "5%"}}>
                                <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                    {this.state.event.type}
                                </Typography>
                                <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                    {this.clubName()}
                                </Typography>
                                <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                    {this.state.event.event_desc}
                                </Typography>
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingLeft: "7%"}}>
                                <LocationOnIcon />
                                {this.state.event.event_venue}
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingRight: "0%"}}>
                                <EventIcon />
                                {this.state.event.start_date} {this.state.event.end_date} 
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingLeft: "7%"}}>
                                {this.state.event.seats}
                            </Grid>

                            <Grid item xs={6} align="left" style={{paddingRight: "0%"}}>
                            <AccessTimeIcon />
                            {this.state.event.event_time}
                        </Grid>
                        </Grid>
                        </Grid>
                </Grid>
                </ Paper>
                 </div>
            </ContainerPanel>

        )
    }
}


export default EventDetails;