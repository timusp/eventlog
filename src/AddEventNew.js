import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Field } from 'react-final-form';
//import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { InputLabel,Box,Select,Input,Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup,Radio, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';

import DropDown from './base/DropDown';
import ContainerPanel from './base/ContainerPanel';
import addicon from './images/addicon.JPG';

// Picker
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';


/*
const onSubmit = async values => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);
        window.alert(JSON.stringify(values, 0, 2));
    };
*/
const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    }
    return errors;
};

const uploadButton = {
    paddingLeft: "10px",
    paddingTop: "10px",
};

const imageStyle = {
    width: "100px",
    height: "60% !important",
}



class AddEvent extends React.Component {    

    constructor(){
        super();
        this.state={
            name:null,
            date:null,
            time:null,
            club:null,
            type:null,
            venue:null,
            desc:null,
            poster:null,
            reglink:null,
            regfee:null,
            deadline:null,
            day:null,month:null,year:null,
            dday:null,dmonth:null,dyear:null,
            hour:null,min:null,ampm:null,
            
        }
    }

    SubmitEvent(){
        this.setState({req:{name:this.state.name,date:this.state.date,time:this.state.time,venue:this.state.venue,
            desc:this.state.desc,poster:this.state.poster,reglink:this.state.reglink,regfee:this.state.regfee,
            deadline:this.state.deadline}})
        
    fetch('http://localhost:8000/api/submitevent', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))

    }
    handleChange(event){
        this.setState({type:event.target.value})
    }
    
    validate(){
        
    }

    prepareDate(){
        //this.setState({date:})
    }

    
    render() {

    return (
        <ContainerPanel>
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <CssBaseline />
                <Paper style={{ padding: 28 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={2}>
                        <Image
                            src={addicon}
                            style={imageStyle}
                            align="right"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="h4" align="center" component="h1" style={{paddingBottom: 20, paddingTop:20}} gutterBottom>
                            Add an Event
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Input 
                            type="text"
                            error
                            placeholder="Event Name *"
                            onChange={event=>this.setState({name:event.target.value})}
                        >

                        </Input>
                    </Grid>
                    <Grid item xs={4} align="center">
                        <Button
                            variant="contained"
                            component="label"
                            required
                        >
                            Upload Poster
                            <input
                                type="file"
                                style={{ display: "none" }}
                                required
                            />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Input type="text" placeholder="Event Description *" fullWidth multiline rows={2} rowsMax={4} onChange={event=>this.setState({desc:event.target.value})}></Input>
                    </Grid>
                    <Grid item xs={7} style={{paddingTop: 20}}>
                        <FormControl component="fieldset">
                            <FormLabel component="label">Event Type</FormLabel>
                            <RadioGroup row name="type" value={this.state.type} onChange={(event)=>this.setState({type:event.target.value})}>
                                <FormControlLabel label="Club" value="club" control={<Radio />} />
                                <FormControlLabel label="Talks" value="talk" control={<Radio />} />
                                <FormControlLabel label="Workshop" value="workshop" control={<Radio />} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {
                        (this.state.type == 'club') ? 
                        <Grid item xs={5} align="right">
                            <FormControl >
                            <Box marginTop={2} width={120}>
                                <InputLabel id="demo-controlled-open-select-label">Select Club</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.club}
                                    onChange={event=>{this.setState({club:event.target.value})}}
                                >
                                    <MenuItem value={1}>Food Club</MenuItem>
                                    <MenuItem value={2}>Photography Club</MenuItem>
                                    <MenuItem value={3}>Rangmanch</MenuItem>
                                    <MenuItem value={4}>Workshops</MenuItem>
                                </Select>
                            </Box>
                                </FormControl>
                        </Grid>
                        :
                         <Grid item xs={5} align="right">
                            <FormControl >
                            <Box marginTop={2} width={120}>
                                <InputLabel id="demo-controlled-open-select-label">Club Name</InputLabel>
                                <Select
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={this.state.club}
                                    disabled
                                    onChange={event=>{this.setState({club:event.target.value})}}
                                >
                                    <MenuItem value={1}>Food Club</MenuItem>
                                    <MenuItem value={2}>Photography Club</MenuItem>
                                    <MenuItem value={3}>Rangmanch</MenuItem>
                                    <MenuItem value={4}>Workshops</MenuItem>
                                </Select>
                            </Box>
                                </FormControl>
                        </Grid>
                    }
                    <Grid item xs={6} align="left">
                    <FormLabel component="label">Event Date</FormLabel>
                        <Grid container spacing={1}>
                            <Grid item xs={2} align="left">
                                <Input type="text" placeholder="DD" onChange={(event)=>this.setState({day:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={2}>
                                <Input type="text" placeholder="MM" onChange={(event)=>this.setState({month:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={2}>
                                <Input type="text" placeholder="YY" onChange={(event)=>this.setState({year:event.target.value})}></Input>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                    <FormLabel component="label">Event Time</FormLabel>
                        <Grid container spacing={1}>

                            <Grid item xs={2} align="left">
                                <Input type="text" placeholder="HH" onChange={(event)=>this.setState({hour:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={2}>
                                <Input type="text" placeholder="MM" onChange={(event)=>this.setState({min:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={3}>
                                <Select
                                    fullWidth
                                    labelId="am-pm-label"
                                    id="am-pm"
                                    value={this.state.ampm}
                                    onChange={(event)=>this.setState({ampm:event.target.value})}
                                >
                                    <MenuItem value={"AM"}>AM</MenuItem>
                                    <MenuItem value={"PM"}>PM</MenuItem>
                                </Select>
                            </Grid>
                            </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <FormLabel component="label">Registration Deadline</FormLabel>
                        <Grid container spacing={1}>
                            <Grid item xs={2} align="left">
                                <Input type="text" placeholder="DD" onChange={(event)=>this.setState({dday:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={2}>
                                <Input type="text" placeholder="MM" onChange={(event)=>this.setState({dmonth:event.target.value})}></Input>
                            </Grid>
                            <Grid item xs={2}>
                                <Input type="text" placeholder="YY" onChange={(event)=>this.setState({dyear:event.target.value})}></Input>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={6}>
                        <Input type="text" placeholder="Fee Amount" onChange={(event)=>this.setState({regfee:event.target.value})}></Input>
                    </Grid>

                    <Grid item xs={12}>
                        <Input 
                            type="text"
                            placeholder="Registraion Link"
                            fullWidth
                            onChange={(event)=>this.setState({regfee:event.target.value})}>

                            </Input>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                    <Button
                        type="button"
                        variant="contained"
                        //onClick={}
                    >
                        Reset
                    </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    </Grid>
                </Grid>
                </Paper>
            
        
        </div>
        </ContainerPanel>
        )
    } 
}

export default AddEvent;
