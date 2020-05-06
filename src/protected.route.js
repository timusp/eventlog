import React from 'react';
import {Route} from 'react-router-dom'
import GLogin from './GLogin';
import SelectClub from './SelectClub';
import MainPage from './MainPage';

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