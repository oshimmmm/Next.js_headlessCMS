import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Image from "next/image";
import Link from "next/link";
import { Typography, Drawer, IconButton, List, ListItem } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import LinkCustom from "./LinkCustom";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    minWidth: "auto",
    padding: "8px",
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const renderButtons = () => (
    <>
      <LinkCustom href="/about" color="inherit">
        <Button color="inherit" sx={commonButtonStyles}>
          <PetsIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          <Typography color="inherit" component="span" sx={{ fontSize: { xs: 10, sm: 12 } }}>
            事業概要
          </Typography>
        </Button>
      </LinkCustom>
      <LinkCustom href="/blog/bloglist/1" color="inherit">
        <Button color="inherit" sx={commonButtonStyles}>
          <EditIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          <Typography color="inherit" component="span" sx={{ fontSize: { xs: 10, sm: 12 } }}>
            ブログ一覧
          </Typography>
        </Button>
      </LinkCustom>
      <LinkCustom href="/news/newslist/1" color="inherit">
        <Button color="inherit" sx={commonButtonStyles}>
          <ArticleIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          <Typography color="inherit" component="span" sx={{ fontSize: { xs: 10, sm: 12 } }}>
            お知らせ一覧
          </Typography>
        </Button>
      </LinkCustom>
      <LinkCustom href="/contact" color="inherit">
        <Button color="inherit" sx={commonButtonStyles}>
          <MailIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
          <Typography color="inherit" component="span" sx={{ fontSize: { xs: 10, sm: 12 } }}>
            お問い合わせ
          </Typography>
        </Button>
      </LinkCustom>
      <Button component="a" href="tel:000-0000-0000" color="inherit" sx={commonButtonStyles}>
        <PhoneIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
        <Typography color="inherit" component="span" sx={{ fontSize: { xs: 10, sm: 12 } }}>
          ご予約
        </Typography>
      </Button>
    </>
  );

  return (
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <Box sx={{ flexGrow: 1, pt: 2 }}>
          <Link href="/" passHref>
            <Image src="/logo.jpg" alt="Logo" width={60} height={60} />
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{renderButtons()}</Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{ '& .MuiDrawer-paper': { backgroundColor: 'primary.main', color: '#fff', width: 'auto' } }} // ドロワーの幅をアイコンに合わせる
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            {renderButtons()}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
