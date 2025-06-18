import React from "react";
import {
  Grid,
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router";

const Sidebar = ({setCurrentSection}) => {
  const navigate = useNavigate();
  const drawerWidth = 200;
  return (
    <Grid size={2}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box display="flex" columnGap={2} margin="20px auto">
          <img src={logo} alt="" height="34px" width="45px" />
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            Furniro
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton onClick={() => setCurrentSection("Dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => setCurrentSection("Categories")}>
              <ListItemIcon>
                <GridViewRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={() => setCurrentSection("Products")}>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Grid>
  );
};

export default Sidebar;
