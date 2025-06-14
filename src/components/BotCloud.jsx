import { Box } from "@mui/material";
import react from '../assets/react.svg'

const BotCloud = () => {
    return (
        <Box>
<Box
                component="img"
                sx={{
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    backgroundColor: '#a0d4ee',
                    borderRadius: 2,
                    borderBottom: 'none',
                    display: "block",
                    m: 0,
                    p: 0,
                    
                }}
                alt='wave'
                src={react}
            />
    </Box>
    );
};
export default BotCloud;