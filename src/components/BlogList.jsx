import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import react from '../assets/react.svg'
import { Box, Container, Grid, Stack } from '@mui/material';
import PostCard from './PostCard';
import axios from 'axios';
import cloud from '../assets/cloud.svg'
import Home from './Home';
import Header from './Header';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3001/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <>
    <Home/>
    
    <List sx={{backgroundColor: 'white', width: '100%', marginTop: '64px' ,marginBottom: '0' ,paddingBottom: '0'}}>
    <Header/>
      <Container>
    <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
      {posts.map((post) => (
        
          <PostCard 
            key={post.id} 
            title={post.title} 
            summary={post.summary} 
            author={post.author}
            image={post.image} 
            content={post.content.length >  80 ? post.content.substring(0, 80) + '...' : post.content}
            id={post.id}
          />
       
        
      ))}
       </Grid>
       </Container>
        <Box
                component="img"
                sx={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    backgroundColor: '#a0d4ee',
                    
                    borderBottom: 'none',
                    display: "block",
                    m: 0,
                    p: 0,
                    
                }}
                alt='wave'
                src={react}
            />
           
    </List>
    </>
  );
};

export default BlogList; 