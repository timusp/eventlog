import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';

import DropDown from './base/DropDown';
import ContainerPanel from './base/ContainerPanel';
import addicon from './images/addicon.JPG';
import PosterComponent from './PosterComponent';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import MoneyIcon from '@material-ui/icons/Money';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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

        
    }
    clubName(val){
        //if()

    }
    render() {
        return(
                
            <ContainerPanel>
          
                <div style={{ padding: 16, margin: 'auto', maxWidth: 800 }}>
                <CssBaseline />

                <Paper style={{ padding: 28 }}>

                    <Grid container alignItems="flex-start" spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" component="h1" style={{paddingBottom: 20, paddingTop:20}} gutterBottom>
                                {this.props.event.event_name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} align="center">
                            <PosterComponent poster={this.props.event.event_poster} deadline={this.props.event.event_reg_deadline} />
                        </Grid>

                        <Grid item xs={12} align="center" style={{marginLeft: "5%", marginRight: "5%"}}>
                            <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                {this.props.event.type}
                            </Typography>
                            <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                {this.clubName()}
                            </Typography>
                            <Typography align="center" component="h1" style={{paddingBottom: 20, paddingTop:20,}} gutterBottom>
                                {this.props.event.event_desc}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} align="left" style={{paddingLeft: "7%"}}>
                            <LocationOnIcon />
                            {this.props.event.event_venue}
                        </Grid>

                        <Grid item xs={6} align="left" style={{paddingRight: "0%"}}>
                            <EventIcon />
                            {this.props.event.start_date} {this.props.event.end_date} 
                        </Grid>

                        <Grid item xs={6} align="left" style={{paddingLeft: "7%"}}>
                            {this.props.event.seats}
                        </Grid>

                        <Grid item xs={6} align="left" style={{paddingRight: "0%"}}>
                            <AccessTimeIcon />
                            {this.props.event.event_time}
                        </Grid>

                    </Grid>
                </ Paper>
                 </div>
            </ContainerPanel>

        )
    }
}


export default EventDetails;