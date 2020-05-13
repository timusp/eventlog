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
import login from './images/login.jpg';
import CardMedia from '@material-ui/core/CardMedia';

import { TextField, Radio, Select } from 'final-form-material-ui';
import Image from 'material-ui-image';
import { Typography, Paper, Link, Grid, CssBaseline, RadioGroup, MenuItem, FormGroup, FormControl, FormControlLabel,
} from '@material-ui/core';


class Test extends React.Component{
    constructor(props) {
        super(props);
        this.state={
          int:"",
          fname:null,
          lname:null,
          email:"",
          resp:[{id:null,name:null,email:null}],
          isAuth:false,
          cur_user:0,
          isNew:false,
          isOrg:false,
          logged:false,
        }
      }

    render() {
        return(
            <ContainerPanel>
            <TopBar />
        
                <div style={{ paddingTop: "5%", margin: 'auto', maxWidth: 900, minHeight: "100vh" }}>
                    <CssBaseline />

                    <Paper style={{ padding: 50, minHeight: "89vh" }}>

                        <Grid container alignItems="flex-start" spacing={2} minHeight="800px" style={{padding: "12% 0 7% 0"}}>

                    
                            <Grid item xs={6}>
                                    <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    maxHeight="200"
                                    padding="20"
                                    style={{width: 400, height: "400%"}}
                                    image={login}
                                    title="Contemplative Reptile"
                                    />  
                                
                            </Grid>

                            <Grid item xs={6} align="center">
                            <Box marginTop={10}>
                                <FormLabel><h4>Welcome to AU Eventlog</h4></FormLabel>

                                <Box marginTop={10}>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" ref="gButton">
                                    Login with Google</Button>
                                </Grid>
                                    
                                    <Grid item xs={6}>{this.state.int}</Grid>
                                </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                    
            </ContainerPanel>
        )


    }

    postAPI(){
        
        const reqs={email:this.state.email,name:this.state.fname+' '+this.state.lname};
        //console.log(reqs);

        fetch('http://localhost:8000/api/userauth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reqs)
            })
            .then((res) => res.json())
            .then((data) =>  {
              console.log(data)
              this.setState({cur_user:data.id})
              this.setState({isNew:data.isNew})
              this.setState({isOrg:data.isOrg})
              this.setState({logged:data.logged})

              if(data.id!=0){
                this.setState({isAuth:true})
              }
              this.props.onLogin(this.state.cur_user,this.state.isNew,this.state.isAuth,this.state.isOrg);
              
            })

            .catch((err)=>console.log(err))
            
    }
    googleSDK() {
   
          window['googleSDKLoaded'] = () => {
            window['gapi'].load('auth2', () => {
              this.auth2 = window['gapi'].auth2.init({
                client_id: '21903730875-hql4p4h91bni869f4gevmutn5bta7v1t.apps.googleusercontent.com',  //ext
                //client_id: '413833473817-2mvctgjlcfp6015mqh8df3p3bd60757d.apps.googleusercontent.com', //au_internal
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
                prompt: 'select_account'
              });
              this.prepareLoginButton();
            });
          }
         
          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'google-jssdk'));
    }
    componentDidMount() {
        this.googleSDK();
        //this.postAPI();
    }
  
    prepareLoginButton = () => {
   
          //console.log(this.refs.gButton);
          this.auth2.attachClickHandler(this.refs.gButton, {},
            (googleUser) => {
           
              let profile = googleUser.getBasicProfile();
              //console.log('Token || ' + googleUser.getAuthResponse().id_token);
              //console.log('ID: ' + profile.getId());
              //console.log('Image URL: ' + profile.getImageUrl());
              //console.log('firstName: ' + profile.getGivenName());
              //console.log('lastName: ' + profile.getFamilyName());
              //console.log('Email: ' + profile.getEmail());
              this.setState({fname: profile.getGivenName()});
              this.setState({lname: profile.getFamilyName()});
              this.setState({email: profile.getEmail()});
              if(!profile.getEmail().includes('@ahduni.edu.in')){
                this.setState({int:'Please Login with University Mail to continue'})
              }
              else{
                this.setState({int:''})
                this.postAPI();
              }
              //YOUR CODE HERE
              //console.log("logged in!");
              //this.props.history.push("/dashboard");
              
              
            }, (error) => {
              
          });

    }
  

}

export default Test;