import { Box, Container } from "@mui/material"
import Header from "./Header"
import React from "react";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header />
            <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;