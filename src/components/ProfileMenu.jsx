import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";

export default function ProfileMenu() {
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Typography fontWeight={"bold"} color={"Highlight"}>
          Tony Stark
        </Typography>
        <Tooltip title="Profile Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {/* <Avatar alt="Tony Stank" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg9PINHF3-L0a2s8SregKwFPIIBh0UrZ9Yk-04ljnDGttrcJ0rFQtMMLNSas9Y2RztRYDowwpNFC2TeC93ysIEYjgb6lXpgoVgXggayC3t09OFXZqW-uCUlEcYH3hpa6hyGMOYTbomeL1m9/s1600/Tony+Stark.jpg" /> */}
            <Avatar
              alt="Tony Stank"
              src="https://www.jiomart.com/images/product/original/rv3jnpppl2/tony-stark-iron-man-avengers-infinity-war-men-s-sunglasses-spectacle-frames-silver-blue-product-images-rv3jnpppl2-3-202207021924.jpg?im=Resize=(500,630)"
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
