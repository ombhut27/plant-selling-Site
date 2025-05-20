import { NavLink } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Tooltip,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assets } from '../assets/assets';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { to: "/add", label: "Add Items", icon: assets.add_product },
    { to: "/list", label: "List Items", icon: assets.list_product },
    { to: "/orders", label: "Orders", icon: assets.orders },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 70 : 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 70 : 240,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          zIndex: (theme) => theme.zIndex.appBar + 1,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          p: 2,
        }}
      >
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </IconButton>
      </Box>

      <List sx={{ mt: 8 }}>
        {menuItems.map((item, index) => (
          <Tooltip
            key={index}
            title={isCollapsed ? item.label : ''}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.to === "/list"}
              sx={{
                pl: 2,
                mt: 3,
                textDecoration: 'none',
                '&.active': {
                  bgcolor: 'rgba(25, 118, 210, 0.1)',
                  borderLeft: '4px solid #1976d2',
                  color: '#1976d2',
                },
                borderLeft: '4px solid transparent',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={item.icon}
                  alt={item.label}
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText primary={item.label} sx={{ ml: 2 }} />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
