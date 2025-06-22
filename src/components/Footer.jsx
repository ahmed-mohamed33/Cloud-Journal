import { Box, Typography, Stack } from "@mui/material";
import bottomwave from "../assets/bottomwave.svg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => (
  <Box sx={{ position: "relative" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" sx={{ color: "#fff", fontWeight: "bold" }}>
        Cloud Journal
      </Typography>
      <Typography variant="caption" sx={{ color: "#fff" }}>
        Cloud Journal © 2025 Ahmed Selim. All rights reserved.
      </Typography>
      <Typography variant="body1" sx={{ color: "white" }}>
        Developer: Ahmed Selim
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <a
          href="https://www.linkedin.com/in/ahmed-selim-a80823289/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LinkedInIcon /> LinkedIn
        </a>
        <a
          href="https://github.com/ahmed-mohamed33"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <GitHubIcon /> GitHub
        </a>
        <a
          href="mailto:a7medselim93@gmail.com"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EmailIcon /> Email
        </a>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginTop: "5px",
        }}
      >
        <a href="#" style={{ color: "#fff" }}>
          Terms of Use
        </a>
        <a href="#" style={{ color: "#fff" }}>
          Privacy Policy
        </a>
        <a href="#" style={{ color: "#fff" }}>
          Code of Conduct
        </a>
      </Box>
    </Box>

    <Box
      component="img"
      sx={{
        position: "relative",
        width: "100%",
        objectFit: "cover",
        objectPosition: "center",
        backgroundColor: "#a0d4ee",

        borderBottom: "none",
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
