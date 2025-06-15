import React, { useState, useEffect, useRef, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoginIcon from '@mui/icons-material/Login';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../Context/AuthContext';

const Navbar = ({ theme }) => {
    const navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState(true);
    const lastScrollTop = useRef(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const muiTheme = useTheme();
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setShowNavbar(true);
            lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop; 
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const menuItems = [
        { text: 'Posts', path: '/' },
        { text: 'Projects', path: '/projects' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' }
    ];

    const drawer = ( 
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button onClick={() => isAuthenticated ? logout() : navigate('/signin')}>
                    <ListItemText primary={isAuthenticated ? 'Logout' : 'Login'} />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" sx={{ width: '100%', boxShadow: 'none', backgroundColor: '#f5f5f500', backdropFilter: 'blur(8px)', transition: 'top 0.3s', top: showNavbar ? '0' : '-64px' }}>
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
                            fontSize: { xs: '0.9rem', flexShrink: 0, sm: '1.5rem' },
                        }}
                    >
                        Cloud Journal
                    </Typography>
                    
                    {!isMobile ? (
                        <>
                            <Box padding={2} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 2, color: '#171717' }}>
                                {menuItems.map((item) => (
                                    <Button 
                                        key={item.text}
                                        color="inherit" 
                                        onClick={() => navigate(item.path)}
                                    >
                                        {item.text}
                                    </Button>
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2, color: '#171717' }}>
                                <IconButton color="inherit">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="inherit">
                                    <NotificationsIcon />
                                </IconButton>
                                <Button 
                                    variant="text"
                                    onClick={() => isAuthenticated ? logout() : navigate('/signin')}
                                    startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
                                    sx={{ color: '#171717', border: 'none' }}
                                >
                                    {isAuthenticated ? 'Logout' : 'Login'}
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={toggleDrawer(true)}
                            sx={{ marginLeft: 'auto' }}
                        >
                            <MenuIcon sx={{ color: '#171717' }} />
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
