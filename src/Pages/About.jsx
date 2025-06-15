import React from "react";

import { Box, Container, Typography } from "@mui/material";
import Home from "../components/Home";
import BotCloud from "../components/BotCloud";
import { ElectricBolt } from "@mui/icons-material";



const About = () => {
  return (
    <>
    <Home/>
    <Box sx={{marginTop: '64px' ,backgroundColor: 'white' ,width: '100%'}}>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' ,gap: 1}}>
        <Typography variant="h4" sx={{fontWeight: 'bold'}}>About Cloud Journal</Typography>
        <Typography variant="h5">

                Cloud Journal is a platform for sharing your thoughts and ideas with the world.
       
         
        </Typography>
        <Typography variant="body1">Whether you're writing about technology, lifestyle, or personal experiences,
        Cloud Journal gives you the tools to express yourself and connect with readers.</Typography>
        <Typography variant="body1">
              Join our community and start sharing YOUR story <ElectricBolt/>
            </Typography>
        </Container>
    </Box>
    <BotCloud/>
    </>
  )
}

export default About;