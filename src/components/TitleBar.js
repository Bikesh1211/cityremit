import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const SIDEBAR_WIDTH = 240; // Sidebar width

const TitleBar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const userName = "John Doe"; // Replace with dynamic user name if needed
  const profileImage = "/path/to/profile-image.jpg"; // Replace with path to your static profile image

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        marginLeft: `${SIDEBAR_WIDTH}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      variant="elevation"
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {userName}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <Avatar src={profileImage} alt="Profile" />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => alert("Profile clicked")}>
              Profile
            </MenuItem>
            <MenuItem onClick={onLogout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
