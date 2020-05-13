import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import GLogin from './GLogin';
import SelectClub from './SelectClub';
import MainPage from './MainPage';
import NotAuth from './NotAuth';

export const ProtectedRoute=({component:Component, ...rest})=>{
    
    return(
        <Route 
            {...rest}
            render={
                ()=>{
                    console.log(rest)
                    if(rest.isAuth){
                        return <Component {...rest} />
                    }
                    else{
                        return <Redirect to={{pathname: "/",}} />
                    }
                
                }
            }
        />
    )
}

/*
export const ProtectedRoute=({component:Component, ...rest})=>{
    return(
        <Route {...rest} render={
            props=>{
               if(props.isAuth){
                return <Component {...rest} />
               }
            }
        } />
    )
}

*/