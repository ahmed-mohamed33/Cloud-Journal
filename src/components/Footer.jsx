import { Box ,Typography} from "@mui/material";
import bottomwave from '../assets/bottomwave.svg';
const Footer = () => (
<Box sx={{ position: 'relative' }}>
<Box  sx={{ marginTop: '10px' ,display: 'flex', flexDirection: 'column',gap: 1 , justifyContent: 'center', alignItems: 'center' ,position: 'absolute', top: 10, width: '100%' ,zIndex: 1000 }}>
        <Typography variant="caption" sx={{color: '#fff'}}>
            Cloud Journal
          © 2025 Ahmed Selim. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
          <a href="/terms" style={{ color: '#fff' }}>Terms of Use</a>
          <a href="/privacy" style={{ color: '#fff' }}>Privacy Policy</a>
          <a href="/code" style={{ color: '#fff' }}>Code of Conduct</a>
        </Box>
      </Box>
     
<Box
                component="img"
                sx={{
           position: 'relative',
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    backgroundColor: '#a0d4ee',
                  
                    borderBottom: 'none',
                    display: "block",
                    m: 0,
                    p: 0,
                }}
                alt="hero image"
                src={bottomwave}
            />
</Box>
);
export default Footer;