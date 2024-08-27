import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import TitleBar from "./TitleBar";

const SIDEBAR_WIDTH = 240;

function Layout({ children }) {
  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Sidebar />
      <TitleBar onLogout={handleLogout} />
      <Box
        sx={{
          flexGrow: 1,
          marginTop: "64px",
          marginLeft: `${SIDEBAR_WIDTH}px`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          height: "calc(100vh - 64px)",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
