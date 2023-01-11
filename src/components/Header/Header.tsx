import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const Header = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link href='/' style={{textDecoration: 'none'}}>
      <Typography variant="h6" sx={{ my: 2 }} style={{fontFamily: 'Ubuntu', color: '#f4217f'}}>
          Heatable - Pokemon
        </Typography>
      </Link>
      <Divider />
    </Box>
  );

  return (
    <>
      <AppBar component="nav" className='header'>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href='/' style={{textDecoration: 'none'}}>
              <Typography
                variant="h6"
                style={{fontFamily: 'Ubuntu', color: '#f4217f'}}
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Heatable - Pokemon
              </Typography>
            </Link>
          </Toolbar>
      </AppBar>
      <Box component="nav" className='header'>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default Header;
