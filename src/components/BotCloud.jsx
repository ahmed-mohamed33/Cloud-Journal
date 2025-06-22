import { Box } from "@mui/material";
import holdercloudbottom from "../assets/holdercloudbottom.svg";

const BotCloud = () => {
  return (
    <Box>
      <Box
        component="img"
        sx={{
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
          backgroundColor: "#a0d4ee",

          borderBottom: "none",
          display: "block",
          m: 0,
          p: 0,
        }}
        alt="wave"
        src={holdercloudbottom}
      />
    </Box>
  );
};
export default BotCloud;
