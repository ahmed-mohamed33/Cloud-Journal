import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const FloatingPostBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
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
