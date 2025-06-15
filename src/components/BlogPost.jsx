import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { Box, Paper, Stack, TextField, Button, Container } from '@mui/material';
import axios from 'axios';
import Home from './Home';
import BotCloud from './BotCloud';

const BlogPost = ({ theme }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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
        username: isLoggedIn ? 'LoggedUser' : username || 'Anonymous',
        userId: isLoggedIn ? 1 : null, 
        isAnonymous: !isLoggedIn && !username
      };
      axios.post('http://localhost:3001/comments', comment)
        .then(response => {
          setComments([...comments, response.data]);
          setNewComment('');
          setUsername('');
        })
        .catch(error => console.error('Error adding comment:', error));
    }
  };

  if (!post) return <Typography variant="h6">Post not found</Typography>;

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
     

      
      <img src={post.image}  alt="post image"  style={{ width: '75%', borderRadius: '10px',boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',objectFit: 'cover', objectPosition: 'center'}} />
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
        {!isLoggedIn && (
          <TextField
            label="Your Name (optional)"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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