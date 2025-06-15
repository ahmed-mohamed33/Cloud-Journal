import React, { useEffect, useContext } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
const FloatingPostBtn = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add a post', {
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
      navigate('/signin');
      return;
    }
    navigate('/addpost');
  };

  return (
    <Fab 
      color="primary" 
      aria-label="add" 
      onClick={handleClick}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        backgroundColor: '#171717',
        '&:hover': {
          backgroundColor: '#a0d4ee'
        }
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingPostBtn;
