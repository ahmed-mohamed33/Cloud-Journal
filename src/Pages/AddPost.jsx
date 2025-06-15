import React, { useState, useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import BotCloud from '../components/BotCloud';
import Home from '../components/Home';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';

const AddPost = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { edit, id } = useParams(); 
  const [isEditMode, setIsEditMode] = useState(edit === 'edit');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      axios.get(`http://localhost:3001/660/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')} `
          
        }
      })
        .then(response => {
          const { title, content, summary, image } = response.data;
          setTitle(title);
          setContent(content);
          setSummary(summary);
          setImage(image);
        })
        .catch(error => {
          console.error('Error fetching post data:', error);
          toast.error('Failed to fetch post data', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
            style: {
              background: "#ff0000",
              color: '#fff'
            },
            draggable: true,
          });
        });
    }
  }, [isEditMode, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = { 
      title, 
      content, 
      summary, 
      image,
      author: localStorage.getItem('userName'),
      userId: localStorage.getItem('userId'),
      createdAt: new Date().toISOString() 
    };

    const url = isEditMode ? `http://localhost:3001/660/posts/${id}` : 'http://localhost:3001/660/posts';
    const method = isEditMode ? 'put' : 'post';

    axios[method](url, postData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        toast.success(isEditMode ? 'Post updated successfully' : 'Post added successfully', {
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
        navigate('/'); 
      })
      .catch(error => {
        console.error('Error submitting post:', error);
        toast.error(error.response?.data?.message || 'Error submitting post', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
          style: {
            background: "#ff0000",
            color: '#fff'
          },
          draggable: true,
        });
      });
  };

  return (
    <>
      <Home/>
      <Box sx={{marginTop: '64px' ,backgroundColor: 'white' ,width: '100%'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h4">{isEditMode ? 'Edit Post' : 'Add New Post'}</Typography>
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
              {isEditMode ? 'Update Post' : 'Submit Post'}
            </Button>
          </form>
        </Box>
      </Box>
      <BotCloud/>
    </>
  );
};

export default AddPost;
