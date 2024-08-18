import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        mt: "auto",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
        {/* <IconButton
          component="a"
          href="https://twitter.com/your_twitter_account"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit" }}
        >
          <XIcon />
        </IconButton> */}
        <IconButton
          component="a"
          href="https://www.instagram.com/marumaru.house?igsh=M2FueHVjMXNqNDgw&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "inherit" }}
        >
          <InstagramIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} marumaru house. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
