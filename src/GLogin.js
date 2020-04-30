import React from 'react';
import './index.css';


class GLogin extends React.Component{
    constructor() {
      super();
      this.state={
        fname:null,
        lname:null,
        email:null,
        resp:[{id:null,name:null,email:null}]
      }
    }
  
    render(){
          return(
            <div className="container">
              <div className="brandContainer">
                <h2 className="brand">EventLog</h2>
              </div>
              <div className="btnContainer">
                <button className="gButton" ref="gButton">Login with Google</button>
              </div>
              <div className="profileinfo">
                {this.state.fname}
                {this.state.lname}
                {this.state.email}
              </div>
              <br />
              <br />
              <div>
                <ol>
                  {this.state.resp.map(item => {
                    //console.log(item);
                    //return (<li key={item.userId}>{item.name +` : `+ item.mailId}</li>);
                  })}
                </ol>
              </div>
            </div>
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
                //client_id: '21903730875-hql4p4h91bni869f4gevmutn5bta7v1t.apps.googleusercontent.com',  //ext
                client_id: '413833473817-2mvctgjlcfp6015mqh8df3p3bd60757d.apps.googleusercontent.com', //au_internal
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
              //YOUR CODE HERE
              console.log("logged in!");
              
           
           
              }, (error) => {
              alert(JSON.stringify(error, undefined, 2));
            });
           
        }
  
  
  }


  export default GLogin;