import React from 'react';
import Home from '../components/Home';
import { Box, Typography } from '@mui/material';
import BotCloud from '../components/BotCloud';
import { Engineering } from '@mui/icons-material';
    
const Projects = () => {
    return (
   <>
   <Home/>
   <Box sx={{marginTop: '64px' ,backgroundColor: 'white' ,width: '100%', height: '50vh'}}>
   <Typography variant="h4" component="h1" align="center" gutterBottom>Coming Soon</Typography>
   <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' ,gap: 1 ,color: 'black'}}>

   <Engineering sx={{fontSize: '200px', color:'#a0d4ee'}}/>
   </Box>
   </Box>
   <BotCloud/>
   </>
    )
}

export default Projects;