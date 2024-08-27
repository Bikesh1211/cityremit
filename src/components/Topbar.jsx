import React from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function TopBar({setSearchText,searchText}) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1,  color: '#333' }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          <TextField
            variant="outlined"
            placeholder="Search Full Name...."
            size="small"
            sx={{ borderRadius: '4px', '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
