import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContactUs from './components/ContactUs'
import Navbar from './components/Navbar'
import BlogPost from './components/BlogPost';
import BlogList from './components/BlogList';
import { CssBaseline, Stack } from '@mui/material';
import Footer from './components/Footer';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { ToastContainer } from 'react-toastify';
import AddPost from './Pages/AddPost';
import FloatingPostBtn from './components/FloatingPostBtn';

const theme = createTheme({
  palette: {
    background: {
      default: '#a0d4ee',
    },
    cloud: {
      main: '#a0d4ee',

    },
  },
  typography: {
    fontFamily: 'wotfard',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::selection': {
          backgroundColor: '#d8b4fe',  
          color: '#fff',               
        },
        '::-webkit-scrollbar': {
          width: '12px',
          
          height: '12px',
          
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: '#fff1f2',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#90caf9',  
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#42a5f5',  
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'custom' },
          style: {
            backgroundColor: '#171717',
            color: '#ffffff',
           
            '&:hover': {
              backgroundColor: '#a0d4ee',
              color: '#171717',
              
              
      
            }
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: '#171717',
            border: '2px solid #171717',
            '&:hover': {
              backgroundColor: '#171717',
              color: '#ffffff',
              border: '2px solid #171717'
            }
          },
        },
      ],
    },
  },

});

function App() {
  return (
    
    <ThemeProvider theme={theme}>
       <CssBaseline/>
    <Router>
     
    <Navbar theme={theme}/>


    <Routes>
  <Route path="/" element={<BlogList   />} />
  <Route path="/post/:id" element={<BlogPost theme={theme} />} />
  <Route path="/signin" element={<SignInPage theme={theme} />} />
  <Route path="/signup" element={<SignUpPage theme={theme} />} />
  <Route path="/addpost" element={<AddPost theme={theme} />} />
</Routes>

<ContactUs theme={theme} />
<FloatingPostBtn /> 
</Router>
<Footer />
<ToastContainer />
</ThemeProvider>



  )
}

export default App
