import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Home from '../components/Home';
import BotCloud from '../components/BotCloud';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpValidationSchema } from '../utils/Validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SignUpPage = ({ theme }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });
  const navigate = useNavigate();
  const handleSignUp = (data) => {
    axios.post('http://localhost:3001/signup', {
      name: data.name,
      email: data.email,
      password: data.password
      
    })
    .then(response => {
      toast.success('Sign up successful', {
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
      navigate ('/signin');
    })
    .catch(error => {
      toast.error('Sign up failed '+error.response.data, {
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
    })
  };

  return (
    <>
    <Home/>
    <Box sx={{backgroundColor: 'white', width: '100%', marginTop: '64px' }}>
       
        <Box sx={{  display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto' ,justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4"> Cloud Sign Up</Typography>
        <Typography variant="body1">Register a new account </Typography>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
              />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField type="password"
            label="Password"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <TextField type="password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            sx={{ backgroundColor: '#ddeef8' }}
            {...field}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            />
          )}
        />
         
          <Button 
            variant="contained" 
            sx={{ width:"100%",
              backgroundColor: 'black',
              '&:hover': {
                backgroundColor: theme.palette.cloud.main
              }
            }}
            onClick={handleSubmit(handleSignUp)}
          >
                Sign Up
          </Button>
          <Typography variant="body1">Already have an account? <Link to="/signin"  style={{color: 'black', fontWeight: 'bold', transition: 'all 0.3s ease', '&:hover': {color: theme.palette.cloud.main}}}>
  {'Sign in'}
</Link>
</Typography>
        </Box>
      
    </Box>
    <BotCloud/>
    </>
  );
};

export default SignUpPage; 