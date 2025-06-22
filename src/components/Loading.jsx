import { Box } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Home from "./Home";
import BotCloud from "./BotCloud";

const Loading = () => {
    return (
  
        <>
        <Home/>
        <Box sx={{ backgroundColor: 'white', width: '100%', marginTop: '64px' }}>
        <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Skeleton variant="text" width={210} height={40} />
          <Skeleton variant="rectangular" width="75%" height={200} sx={{ marginTop: 2, borderRadius: '10px' }} />
          <Skeleton variant="text" width="100%" height={100} sx={{ marginTop: 2 }} />
        </Box>
        </Box>
        <BotCloud/>
        </>
 
    )
};
export default Loading;