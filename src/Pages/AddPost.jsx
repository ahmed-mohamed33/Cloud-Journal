import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BotCloud from '../components/BotCloud';
import Home from '../components/Home';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPost = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');
  // Redirect to login if not logged in
  if (!isLoggedIn) {
    // navigate('/signin');
  }

const handleSubmit = (e) => {
  e.preventDefault();
  const postData = { 
    title, 
    content, 
    summary, 
    image,
    author: 'Ahmed Selim', // TODO: Get from auth context
    createdAt: new Date().toISOString() 
  };    
  
  axios.post('http://localhost:3001/posts', postData)
    .then(response => {
      toast.success('Post submitted successfully');
      navigate('/'); // Navigate back to posts list
    })
    .catch(error => {
      console.error('Error submitting post:', error);
      toast.error(error.response?.data?.message || 'Error submitting post');
    });
};

  return (
    <>
   <Home/>
   <Box sx={{marginTop: '64px' ,backgroundColor: 'white' ,width: '100%'}}>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <Typography variant="h4">Add New Post</Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
        />
        <TextField
          label="Summary"
          variant="outlined"
          fullWidth
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
        />
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
        />
        <Button 
          type="submit"
          variant="contained" 
          sx={{ 
            width: "100%",
            backgroundColor: '#171717',
            '&:hover': {
              backgroundColor: '#a0d4ee'
            }
          }}
        >
          Submit Post
        </Button>
      </form>
    </Box>
    </Box>
    <BotCloud/>
    </>
  );
};

export default AddPost;
