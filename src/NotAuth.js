import React from 'react';
import {Box} from '@material-ui/core';
import TopBar from './TopBar';

const NotAuth=()=>{
    return(
        <div>
            <TopBar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >    
            yo
            </Box>
        </div>
    )
}
export default NotAuth;