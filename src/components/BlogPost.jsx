import React, { useEffect, useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Box, Paper, Stack, TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import Home from './Home';
import BotCloud from './BotCloud';
import { AuthContext } from '../Context/AuthContext';
import Skeleton from '@mui/material/Skeleton';

const BlogPost = ({ theme }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { userName, setUserName, isAuthenticated, userId } = useContext(AuthContext);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));

 
    axios.get(`http://localhost:3001/comments?postId=${id}`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        postId: id,
        content: newComment,
        username: isAuthenticated ? userName : (userName || 'Anonymous'),
        userId: isAuthenticated ? userId : null, 
        isAnonymous: !isAuthenticated && !userName
      };
      axios.post('http://localhost:3001/comments', comment)
        .then(response => {
          setComments([...comments, response.data]);
          setNewComment('');
          setUserName('');
        })
        .catch(error => console.error('Error adding comment:', error));
    }
  };

 if (!post) return (
    <>
    <Home/>
    <Box sx={{ padding: 2 ,backgroundColor: 'white', width: '100%', marginTop: '64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Skeleton variant="text" width={210} height={40} />
      <Skeleton variant="rectangular" width="75%" height={500} sx={{ marginTop: 2, borderRadius: '10px' }} />
      <Skeleton variant="text" width={210} height={40} sx={{justifySelf: 'start',alignSelf: 'start'}} />

      <Skeleton variant="text" width="100%" height={100}  />
    </Box>
    <BotCloud/>
    </>
  );

  return (
   <>
   <Home/>
  <Box sx={{ backgroundColor: 'white', width: '100%', marginTop: '64px' ,marginBottom: 2 ,paddingBottom: '0'}}   >


  <Stack direction="column" spacing={2} sx={{width: '100%', marginTop: '64px' ,marginBottom: 2 ,paddingBottom: '0' ,justifyContent: 'center', alignItems: 'center'}}>

      <Typography variant="h3" gutterBottom>
        {post.title}
      </Typography>
   
      
      <Typography >
      Created By <strong>{post.author}</strong> on {post.createdAt}
      </Typography>
     

      
      <img src={ post.image} onError={() => setImageError(true)} alt="post image"  style={{ width: '75%', borderRadius: '10px',boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',objectFit: 'cover', objectPosition: 'center' ,display: imageError ? 'none' : 'block'}} />
     <Container >
      <Typography variant="body1">
        {post.content}
      </Typography> 
      </Container>
      </Stack>
      <Container >
      <Box sx={{ padding: 2 }}>
 
        <Typography variant="h6">Comments</Typography>
        {comments.map((comment, index) => (
          <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
            <strong>{comment.isAnonymous ? 'Anonymous' : comment.username}:</strong> {comment.content}
          </Typography>
        ))}
        {!isAuthenticated && (
          <TextField
            label="Your Name (optional)"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        )}
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button  variant='contained' size='large'  sx={{ marginTop: 2 ,backgroundColor: 'black', '&:hover': {
                backgroundColor: theme.palette.cloud.main,
              
              } }} onClick={handleAddComment} >
          Submit
        </Button>
          
        
      </Box>
      </Container>
      <BotCloud/>
    </Box>
    </>
  

  );
};

export default BlogPost; 