import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';
import Home from '../components/Home';
import BotCloud from '../components/BotCloud';


import { toast } from 'react-toastify';

const ContactUs = ({ theme }) => {
  const handleSendMessage = () => {
        toast.success('Message sent successfully!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
          style: {
            background: "#a0d4ee",
            color: '#fff'
          },
          draggable: true,
        });
  }
  return ( 
    <>
    <Box sx={{backgroundColor: 'white ' ,width: '100%', height: '100px' }}/>
   <BotCloud/>
    <Box sx={{ position: 'relative' ,display: 'flex', flexDirection: 'column', gap: 1 , justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{  padding: '10px', color: '#fff', textAlign: 'center' ,width: '100%' }}>
    
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
        Contact Us
      </Typography>
      <Typography variant="body1">
        The world needs more real words.
      </Typography>
      <Box sx={{ marginTop: '10px' }}>
        <Typography variant="body2">
          Want to get in touch? Send me an email
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
          />
          <Button 
            onClick={handleSendMessage}
            variant="contained" 
            sx={{ 
              backgroundColor: '#171717',
              '&:hover': {
                backgroundColor: theme.palette.cloud.main
              }
            }}
          >
            Send Message
          </Button>
          
        </Box>
      </Box>
      
    </Box>
    </Box>
    </>
  );
};

export default ContactUs; 