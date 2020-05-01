import React from 'react';
import './index.css';
import {Button,Box,Grid} from '@material-ui/core/';

class GLogin extends React.Component{
    constructor() {
      super();
      this.state={
        int:"",
        fname:null,
        lname:null,
        email:"",
        resp:[{id:null,name:null,email:null}]
      }
    }
    render(){
          return(
                <Grid container
                  spacing={0}
                  align="center"
                  justify="center"
                  alignItems="center">

                
                    <Button variant="contained" color="primary" ref="gButton">
                      Login with Google</Button>
                    <p>{this.state.int}  </p>
                </Grid>
              
            
          );
      }
      testgetAPI(){
        fetch("http://localhost:8000/api/users")
          .then(res=>res.json())
          .then(res=>{
            //console.log(res.data);
            this.setState({resp:res.data})
          })
          
          .catch(err=>err);
        
      }

      testpostAPI(){
        
        const tes={name:"sumit",email:"asda"};
        console.log(tes);

        fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tes)
            }).then(console.log(tes))
            .then((res) => res.json())
            .then((data) =>  console.log(data))
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
        //this.testgetAPI();
        //this.testpostAPI();
      }
  
      prepareLoginButton = () => {
   
          console.log(this.refs.gButton);
           
          this.auth2.attachClickHandler(this.refs.gButton, {},
            (googleUser) => {
           
              let profile = googleUser.getBasicProfile();
              //console.log('Token || ' + googleUser.getAuthResponse().id_token);
              //console.log('ID: ' + profile.getId());
              //console.log('Image URL: ' + profile.getImageUrl());
              console.log('firstName: ' + profile.getGivenName());
              console.log('lastName: ' + profile.getFamilyName());
              console.log('Email: ' + profile.getEmail());
              this.setState({fname: profile.getGivenName()});
              this.setState({lname: profile.getFamilyName()});
              this.setState({email: profile.getEmail()});
              if(!profile.getEmail().includes('@ahduni.edu.in')){
                this.setState({int:'Please Login with University Mail'})
              }
              //YOUR CODE HERE
              //console.log("logged in!");
              
           
           
              }, (error) => {
              alert(JSON.stringify(error, undefined, 2));
            });
           
        }
  
  
  }


  export default GLogin;