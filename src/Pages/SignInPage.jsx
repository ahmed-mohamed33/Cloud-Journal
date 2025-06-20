import React, { useContext } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import Home from '../components/Home';
import BotCloud from '../components/BotCloud';
import { Link, Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { signInValidationSchema } from '../utils/Validation';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
const SignInPage = ({ theme }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signInValidationSchema),
  });
  const { setIsAuthenticated , isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();
const handleSignIn = (data) => {
  axios.post('http://localhost:3001/signin', {
    email: data.email,
    password: data.password
  })
  .then(response => {
    toast.success('Logged in successfully', {
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
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('userId', response.data.user.id);
    localStorage.setItem('userName', response.data.user.name);
    setIsAuthenticated(true); 
   
  })
  .catch(error => {
    const errorMessage = error.response ? error.response.data : 'An error occurred';
    toast.error('Sign in failed: ' + errorMessage);
  });
}

  

  return (
    isAuthenticated ? <Navigate to="/" /> :
    <>
    <Home/>
    <Box sx={{backgroundColor: 'white', width: '100%', marginTop: '64px' }}>
       
        <Box sx={{  display: 'flex', flexDirection: 'column', gap: 1, maxWidth: '400px', margin: '0 auto' ,justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4"> Cloud Sign In</Typography>
        <Typography variant="body1">Sign in to your account to continue</Typography>
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
            <TextField
              label="Password" type="password"
              variant="outlined"
              fullWidth
              sx={{ backgroundColor: '#ddeef8' }}
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
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
            onClick={handleSubmit(handleSignIn)}
          >
            Login
          </Button>
          <Typography variant="body1">Don't have an account? <Link to="/signup"  style={{color: 'black', fontWeight: 'bold', transition: 'all 0.3s ease', '&:hover': {color: theme.palette.cloud.main}}}>
  {'Sign up'}
</Link>
</Typography>
        </Box>
      
    </Box>
    <BotCloud/>
    </>
  );
};

export default SignInPage; 