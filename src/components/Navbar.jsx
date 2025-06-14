import React, { useState, useEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';


import LoginIcon from '@mui/icons-material/Login';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ theme }) => {
    const navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollTop = useRef(0);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            // Always show navbar regardless of scroll direction
            setShowNavbar(true);
            lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; 
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <AppBar position="fixed" sx={{ width: '100%',boxShadow: 'none', backgroundColor: '#f5f5f500', backdropFilter: 'blur(8px)', transition: 'top 0.3s', top: showNavbar ? '0' : '-64px' }}>
           <Container>  
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/"
                    sx={{ 
                        color: '#171717', 
                        fontWeight: 'bold', 
                        textDecoration: 'none', 
                        fontSize: '1.5rem',
                    }}
                >
                    Cloud Journal
                </Typography>
                <Box padding={2} sx={{ display: 'flex', alignItems: 'center',flexGrow: 1, gap: 2 ,color: '#171717' }}>
                    <Button color="inherit">Posts</Button>
                    <Button color="inherit">Projects</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                 
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 ,color: '#171717' }}>
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => navigate('/signin')}>
                        <LoginIcon />
                    </IconButton>
                    </Box>
            </Toolbar>
            </Container>
            
            
        </AppBar>
    );
};

export default Navbar;
