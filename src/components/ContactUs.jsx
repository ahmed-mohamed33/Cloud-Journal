import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import CustomWave from './Footer';
import bottomwave from '../assets/bottomwave.svg';

const ContactUs = ({ theme }) => {
  return (
    <Box sx={{ position: 'relative' ,display: 'flex', flexDirection: 'column', gap: 1 , justifyContent: 'center', alignItems: 'center' }}>
    <Box sx={{  padding: '10px', color: '#fff', textAlign: 'center' ,width: '100%' }}>
    
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '3rem' }}>
        Cloud Journal
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
  );
};

export default ContactUs; 