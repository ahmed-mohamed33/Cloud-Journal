import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, IconButton, Avatar } from '@mui/material';
import postCloud from '../assets/Postcloud.svg';
import { toast ,ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
const PostCard = (props) => {
  const { title, content, summary, image ,id ,author} = props;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/post/${id}`);
      toast.success('Link copied to clipboard', {
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
    } catch (err) {
      toast.error('Failed to copy link', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        draggable: true,
      });
    }
  };
  const handleEdit = () => {
    navigate(`/edit/${id}`);  
  };
  const handleDelete = () => {

    navigate(`/delete/${id}`);
  };
  return (
    <Card 
      sx={{
        minWidth: 550,
        margin: '20px auto',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt="Blog post image"
        sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography> 
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
        
      </CardContent>
      <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to={`/post/${id}`}><Button size="small"  sx={{color: 'black' ,fontWeight: 'bold'}} >Read More</Button></Link>
        <Button size="small"  sx={{color: 'black' ,fontWeight: 'bold'}} onClick={handleShare}>Share</Button>
        <IconButton onClick={handleEdit} sx={{color: 'black'}}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete} sx={{color: 'black'}}>
          <DeleteIcon />
        </IconButton>
        <Typography variant="body2" color="black">
          <HistoryEduIcon />
          {author}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default PostCard; 