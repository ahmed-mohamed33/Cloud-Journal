import React from "react";
import { Box } from "@mui/material";
import cloud from "../assets/cloud.svg";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        marginTop: "64px",
        height: "10vh",
      }}
    >
      <Box
        component="img"
        sx={{
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
          backgroundColor: "#a0d4ee",
          borderRadius: 2,
          borderBottom: "none",
          display: "block",
          m: 0,
          p: 0,
        }}
        alt="hero image"
        src={cloud}
      />
    </Box>
  );
};

export default Home;
