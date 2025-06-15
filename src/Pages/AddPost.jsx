import React, { useContext, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import BotCloud from '../components/BotCloud';
import Home from '../components/Home';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addPostValidationSchema } from '../utils/Validation';



const AddPost = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { edit, id } = useParams(); 
  const isEditMode = edit === 'edit';

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(addPostValidationSchema),
  });

  useEffect(() => {
    if (isEditMode && id) {
      axios.get(`http://localhost:3001/660/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')} `
        }
      })
        .then(response => {
          const { title, content, summary, image } = response.data;
          setValue('title', title);
          setValue('content', content);
          setValue('summary', summary);
          setValue('image', image);
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
  }, [isEditMode, id, setValue]);

  const onSubmit = (data) => {
    const postData = { 
      ...data,
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

  return ( isAuthenticated ? (
    <>
      <Home/>
      <Box sx={{marginTop: '64px' ,backgroundColor: 'white' ,width: '100%'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <Typography variant="h4">{isEditMode ? 'Edit Post' : 'Add New Post'}</Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
            />
            <TextField
              label="Content"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              {...register('content')}
              error={!!errors.content}
              helperText={errors.content?.message}
              sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
            />
            <TextField
              label="Summary"
              variant="outlined"
              fullWidth
              {...register('summary')}
              error={!!errors.summary}
              helperText={errors.summary?.message}
              sx={{ backgroundColor: '#ddeef8', marginBottom: '10px' }}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              {...register('image')}
              error={!!errors.image}
              helperText={errors.image?.message}
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
  ) : navigate('/signin')
  
  );
};

export default AddPost;
