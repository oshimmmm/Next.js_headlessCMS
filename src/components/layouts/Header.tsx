import { Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PetsIcon from "@mui/icons-material/Pets";
import LinkCustom from "./LinkCustom";
import AppBar from "@mui/material/AppBar";

const Header = () => {
    const commonButtonStyles = {
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background-color 0.4s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
        color: "#fff",
    };

    return (
        <AppBar color="primary" position="sticky">
            <Toolbar>
                <Box
                    sx={{
                        flexGrow: 1,
                        pt: 2,
                    }}
                >
                    <Link href="/" passHref>
                        <Image src="/logo.png" alt="Logo" width={60} height={60} />
                    </Link>
                </Box>
                <LinkCustom href="/about" color="inherit">
                    <Button
                        color="inherit"
                        sx={{
                            fontWeight: "bold",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            transition: "background-color 0.4s ease",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.1)",
                            },
                            color: "#fff",
                        }}
                    >
                        <PetsIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                        <Typography
                            color="inherit"
                            component="span"
                            sx={{ fontSize: { xs: 10, sm: 12 } }}
                        >
                            事業概要
                        </Typography>
                    </Button>
                </LinkCustom>

            </Toolbar>
        </AppBar>
    );
};

export default Header;