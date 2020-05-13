import React from 'react';
import './index.css';
import {Button,Box,Checkbox,FormLabel} from '@material-ui/core/';
import TopBar from './TopBar';
import {
    Redirect
  } from "react-router-dom";
import PosterComponent from './PosterComponent';
import ContainerPanel from './base/ContainerPanel';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import image from './images/clubpage.png';

import { TextField, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, CssBaseline, RadioGroup, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';


class SelectClubs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            cur_user:5,
            //cur_user:this.props.cur_user,
            clubs:[{
                club_id:0,
                club_name:"",
                isChecked:false
            }],
            red:null
        }
    }
    
    componentDidMount(){
        this.getClubs();
    //    this.getSelected();
    }
    getClubs(){
        //get clublist

        fetch("http://localhost:8000/api/getclubs")
        .then(res=>res.json())
        .then(res=>{
            let clubs=[];
            res.data.map((club,index)=>{
                clubs.push({club_id:club.club_id,club_name:club.club_name,isChecked:false})
            })
            this.setState({clubs});
        })
        .catch(err=>err);
    }

    getSelected(){
        fetch("http://localhost:8000/api/getinterest?user_id="+this.state.cur_user)
            .then(res=>res.json())
            .then(res=>{
                let copy=this.state.clubs;
                res.data.map((item)=>{
                    //console.log(item)
                    copy.map((club)=>{
                        if(club.club_id===item.club_id){
                            club.isChecked=true
                        }
                    })
                })
                this.setState({clubs:copy})

            })
            .catch(err=>err);
    }


    submitClub(){
        let req=[];
        this.state.clubs.map((club)=>{
            if(club.isChecked===true){
                req.push({cur_user:this.state.cur_user,club_id:club.club_id})
            }
        })
        
        fetch('http://localhost:8000/api/submitclub', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(req)
            })
            .then((res) => res.json())
            //.then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
            this.setState({red:<Redirect to={{pathname: "/dashboard",}} />})
    }
  
    handleCheck(id){
        let copy=this.state.clubs;
        copy.map((club)=>{
            if(club.club_id===id){
                club.isChecked=!club.isChecked;
            }
        })
        this.setState({clubs:copy});
    }

    render() {
        return(
            <ContainerPanel>
            <TopBar />
        
            {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            > */}
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900 }}>
                    <CssBaseline />

                    <Paper style={{ padding: 50}}>

                        <Grid container alignItems="flex-start" spacing={2} style={{padding: "12% 0 7% 0"}}>

                    
                            <Grid item xs={6}>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    padding="20"
                                    style={{width: 400, height: "400%"}}
                                    image={image}
                                    title="Contemplative Reptile"
                                    />  
                                
                            </Grid>

                            <Grid item xs={6} align="center">
                                
                                    <form
                                        id="club-select"
                                        action={this.props.action}
                                        method={this.props.method}
                                        onSubmit={this.onSubmit}
                                    >
                                    <Box margin={2}>
                                        <FormLabel><h4>Select your preferred Clubs </h4></FormLabel>
                                    </Box>
                                        
                                        {
                                            //console.log(this.state.clubs)
                                            this.state.clubs.map((club, index) => (
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    marginLeft={5}
                                                    key={index}
                                                >
                                                    <Checkbox

                                                        value={club.isChecked}
                                                        
                                                        key={index}
                                                        onChange={()=>{this.handleCheck(club.club_id)}}
                                                    ></Checkbox>
                                                    
                                                    <Box marginTop={0.5}><FormLabel>{club.club_name}</FormLabel></Box>
                                                </Box>                            
                                            ))
                                            
                                        }
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            margin={5}
                                        >
                                            <Button variant="contained" color="primary" 
                                                
                                                onClick={()=>{this.submitClub()}}
                                            >
                                                Submit
                                            </Button>
                                            </Box>   
                                    </form>
                                
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                    
                {this.state.red}
            
       
            </ContainerPanel>
        )


  }
}


export default SelectClubs;