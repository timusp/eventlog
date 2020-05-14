import React from 'react';
import ReactDOM from 'react-dom';
import { Form,Field } from 'react-final-form';
//import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { TextField,InputLabel,Box,Select,Input,Typography, Paper, Link, Grid, Button, CssBaseline, RadioGroup,Radio, FormLabel, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';

import TopBar from './TopBar'
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



const imageStyle = {
    width: "100px",
    height: "60% !important",
}



class ModifyEvent extends React.Component {    

    constructor(props){
        super(props);
        this.state={
            event:{
                event_name:'',
                club_id:'',
                event_type:'club',
                event_venue:'',
                event_desc:'',
                event_poster:'',
                event_reg_link:'',
                event_paid:"false",
                event_seats:0,
                start_date:'',
                end_date:'',
                event_time:'',
                event_reg_deadline:'',
                is_deleted:false,
            },
            err:false,
            btnColor:"primary",
            error:{name:null,desc:null,venue:null},
            req:{   event_name:null,
                    event_desc:null,
                    club_id:null,
                    event_type:null,
                    event_venue:null,
                    event_poster:null,
                    event_reg_link:null,
                    event_paid:null,
                    event_seats:null,
                    start_date:null,
                    end_date:null,
                    event_time:null,
                    event_reg_deadline:null,
                    added_by:this.props.cur_user,
                    is_deleted:false,
                }
            
        }
    }

    reset(){
        this.setState({
                        event_name:'',
                        club_id:'',
                        event_type:'club',
                        event_venue:'',
                        event_desc:'',
                        event_poster:'',
                        event_reg_link:'',
                        event_paid:"false",
                        event_seats:0,
                        start_date:'',
                        end_date:'',
                        event_time:'',
                        event_reg_deadline:'',
                        err:false,
                        btnColor:"primary",
                        error:{name:null,desc:null,venue:null},
                        req:{   name:null,
                                desc:null,
                                club:null,
                                type:null,
                                venue:null,
                                poster:null,
                                link:null,
                                paid:null,
                                seats:null,
                                start_date:null,
                                end_date:null,
                                time:null,
                                deadline:null,
                                added_by:this.props.cur_user,
                            }
        
        })
    }

    checkErr(){
        if(this.state.event.event_name===''||
        this.state.event.event_venue===''||
        this.state.event.event_poster===''||
        this.state.event.event_seats===0||
        this.state.event.start_date===''||
        this.state.event.event_time===''||
        this.state.event.event_reg_deadline==='')
        {
            
            return true;
        }else{
            if(this.state.error.name!=null||
                this.state.error.desc!=null||
                this.state.error.venue!=null)
            {
                return true;
            }
            else{return false;}
        }
    }

    componentDidMount(){
        this.setState({
            event_name:this.props.event.event_name,
            club_id:this.props.event.club_id,
            event_type:this.props.event.event_type,
            event_venue:this.props.event.event_venue,
            event_desc:this.props.event.event_desc,
            event_poster:this.props.event.event_poster,
            event_reg_link:this.props.event.event_reg_link,
            event_paid:this.props.event.event_paid,
            event_seats:this.props.event.event_seats,
            start_date:this.props.event.start_date,
            end_date:this.props.event.end_date,
            event_time:this.props.event.event_time,
            event_reg_deadline:this.props.event.event_reg_deadline,
        })
    }


    SubmitEvent(){
        console.log(this.checkErr())

        if(!this.checkErr()){
            this.setState({
                req:this.state.event
            },()=>this.callApi()
            )
            
            
            this.setState({btnColor:"primary"})
        }else{
            this.setState({btnColor:"secondary"})
        }
                
    }

    callApi(){
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
    
    isTypeOk(){
        if(this.state.event.event_type===null){
            let copy=this.state.error
            copy.type="error"
            this.setState({error:copy})
            return("error") 
        }
        else{
            return(null)
        }
    }
    IsNameOk(){
        if(this.state.event.event_name.length>=100){
            if(this.state.error.name===null){
                let copy=this.state.error
                copy.name="100 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.name!=null){
                let copy=this.state.error
                copy.name=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    IsDescOk(){
        if(this.state.event.event_desc.length>=200){
            if(this.state.error.desc===null){
                let copy=this.state.error
                copy.desc="200 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.desc!=null){
                let copy=this.state.error
                copy.desc=null
                this.setState({error:copy})
                return(false)
            }
        }
    }
    IsVenueOk(){
        if(this.state.event.event_venue.length>=200){
            if(this.state.error.venue===null){
                let copy=this.state.error
                copy.venue="200 Characters Max"
                this.setState({error:copy})
                return(true)
            }
            else{
                return(true)
            }
        }
        else{
            if(this.state.error.venue!=null){
                let copy=this.state.error
                copy.venue=null
                this.setState({error:copy})
                return(false)
            }
        }
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
                                Modify {this.props.event.event_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>

                        <TextField
                            inputProps={{
                                maxLength: 100,
                            }}
                            required
                            id="name"
                            value={this.state.event_name}
                            error={this.IsNameOk()}
                            label="Event Name"
                            helperText={this.state.error.name}
                            fullWidth
                            onChange={event=>this.setState({event_name:event.target.value})}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            inputProps={{
                                maxLength: 200,
                            }}
                            fullWidth multiline rows={2} rowsMax={4}
                            error={this.IsDescOk()}
                            helperText={this.state.error.desc}
                            id="desc"
                            label="Event Description"
                            helperText={this.state.error.desc}
                            value={this.state.event_desc}
                            onChange={event=>this.setState({event_desc:event.target.value})}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            inputProps={{
                                maxLength: 200,
                            }}
                            fullWidth
                            error={this.IsVenueOk()}
                            helperText={this.state.error.venue}
                            id="venue"
                            label="Event Venue"
                            value={this.state.event_venue}
                            onChange={event=>this.setState({venue:event.target.value})}
                        />
                        </Grid>
                        <Grid item xs={7} style={{paddingTop: 20}}>
                            <FormControl component="fieldset">
                                <FormLabel component="label">Event Type</FormLabel>
                                <RadioGroup 
                                    row 
                                    required
                                    error
                                    name="type" 
                                    value={this.state.event_type} 
                                    onChange={(event)=>{this.setState({event_type:event.target.value});if(event.target.value!='club'){this.setState({club_id:0})}}}>
                                    <FormControlLabel label="Club" value="club" control={<Radio />} />
                                    <FormControlLabel label="Talks" value="talk" control={<Radio />} />
                                    <FormControlLabel label="Workshop" value="workshop" control={<Radio />} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {
                            (this.state.event.event_type == 'club') ? 
                            <Grid item xs={5} align="right">
                                <FormControl >
                                <Box marginTop={2} width={120}>
                                    <InputLabel id="demo-controlled-open-select-label">Select Club</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.club_id}
                                        onChange={event=>{this.setState({club_id:event.target.value})}}
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
                                    <InputLabel id="demo-controlled-open-select-label">Select Club</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.club_id}
                                        disabled
                                        onChange={event=>{this.setState({club_id:event.target.value})}}
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
                            
                                
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker 
                                        disablePast
                                        autoOk
                                        format="dd-MM-yyyy"
                                        value={this.state.start_date2} 
                                        onChange={date => this.setState({start_date2:date,start_date:date.toLocaleDateString('en-GB')})} 
                                    />
                                </MuiPickersUtilsProvider>
                            
                        </Grid>
                        <Grid item xs={6} align="left">
                        <FormLabel component="label">Event End Date</FormLabel>
                            
                                
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker 
                                        disablePast
                                        autoOk
                                        format="dd-MM-yyyy"
                                        value={this.state.end_date2} 
                                        onChange={date => this.setState({end_date2:date,end_date:date.toLocaleDateString('en-GB')})} 
                                    />
                                </MuiPickersUtilsProvider>
                            
                        </Grid>
                        <Grid item xs={6}>
                        <FormLabel component="label">Event Time</FormLabel>
                            
                            
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <TimePicker 
                                    autoOk 
                                    ampm={false}
                                    value={this.state.time2} 
                                    onChange={time=>this.setState({time2:time,time:time.getHours()+':'+time.getMinutes()})} 

                                    />
                            </MuiPickersUtilsProvider>
                        
                        </Grid>
                        <Grid item xs={6}>
                            <FormLabel component="label">Registration Deadline</FormLabel>
                            
                                
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker 
                                        disablePast
                                        autoOk
                                        format="dd-MM-yyyy"
                                        value={this.state.ddate2} 
                                        onChange={date => this.setState({ddate2:date,deadline:date.toLocaleDateString('en-GB')})} 
                                    />
                                </MuiPickersUtilsProvider>
                            
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl component="fieldset">
                                <FormLabel component="label">Paid Event?</FormLabel>
                                <RadioGroup 
                                    row
                                    name="paid" 
                                    value={this.state.event_paid} 
                                    onChange={(event)=>{this.setState({paid:event.target.value})}}>
                                    <FormControlLabel label="Yes" value="true" control={<Radio />} />
                                    <FormControlLabel label="No" value="false" control={<Radio />} />
                                </RadioGroup>
                            </FormControl>
                        
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="seats"
                                type="number"
                                label="Seats Available"
                                value={this.state.event_seats}
                                onChange={event=>this.setState({event_seats:event.target.value.replace(/[^0-9]/g, '')})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="link"
                                label="Registraion Link"
                                helperText={this.state.error.link}
                                value={this.state.event_reg_link}
                                fullWidth
                                onChange={event=>this.setState({link:event.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="posterlink"
                                label="Poster Link"
                                helperText={this.state.error.poster}
                                value={this.state.event_poster}
                                fullWidth
                                onChange={event=>this.setState({poster:event.target.value})}
                            />
                        </Grid>
                        <Grid item style={{ marginTop: 16 }}>
                            <Button
                                type="button"
                                variant="contained"
                                onClick={()=>{this.reset()}}
                            >
                                Reset
                            </Button>
                        </Grid>
                        <Grid item style={{ marginTop: 16 }}>
                            <Button
                                variant="contained"
                                color={this.state.btnColor}
                                onClick={()=>this.SubmitEvent()}
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

export default ModifyEvent;
