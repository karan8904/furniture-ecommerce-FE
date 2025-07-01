import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { showSnackbar } from "../../slices/snackbarSlice";

const Sidebar = ({ open, setOpen, setCurrentSection, currentSection, user }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const drawerWidth = open ? 200 : 60;
  const selectedStyle = {
    "&.Mui-selected": {
      backgroundColor: "#f0f0f0",
      color: "primary.main",
      "& .MuiListItemIcon-root": {
        color: "primary.main",
      },
    },
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate("/");
      dispatch(showSnackbar({ message: "Logout successfully." }));
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error,
          message: "Cannot logout. Try again...",
        })
      );
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={open ? "space-evenly" : "center"}
        mt={1}
        py={2}
      >
        {open && (
          <>
            <img src={logo} alt="logo" height="34px" width="45px" />
            <Typography variant="h6" sx={{ fontWeight: "600" }}>
              Furniro
            </Typography>
          </>
        )}
        <IconButton onClick={() => setOpen(!open)}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column" height="100%">
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentSection("Dashboard")}
              selected={currentSection === "Dashboard"}
              sx={selectedStyle}
            >
              <ListItemIcon>
                <DashboardOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentSection("Categories")}
              selected={currentSection === "Categories"}
              sx={selectedStyle}
            >
              <ListItemIcon>
                <GridViewOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Categories" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentSection("Products")}
              selected={currentSection === "Products"}
              sx={selectedStyle}
            >
              <ListItemIcon>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 121.48 122.88"
                  xmlSpace="preserve"
                  width="25px"
                  height="25px"
                >
                  <g>
                    <path
                      d="M2.74,19.11L59.65,0.16c0.68-0.23,1.39-0.21,2.02,0.01l0-0.01l57.66,19.75c1.42,0.48,2.28,1.86,2.15,3.29 c0.01,0.07,0.01,0.15,0.01,0.23v67.06h-0.01c0,1.16-0.64,2.28-1.75,2.84l-57.25,29.09c-0.48,0.29-1.05,0.46-1.65,0.46 c-0.64,0-1.23-0.19-1.73-0.51L1.72,92.44c-1.08-0.57-1.71-1.67-1.71-2.82H0V22.27C0,20.66,1.19,19.33,2.74,19.11L2.74,19.11z M15.33,68.24c0-1.22,0.99-2.22,2.22-2.22c1.22,0,2.22,0.99,2.22,2.22v9.03c0,0.07,0,0.15-0.01,0.22c0,0.31,0.04,0.56,0.11,0.75 c0.03,0.06,0.06,0.12,0.12,0.16l5.53,2.57c1.11,0.51,1.59,1.83,1.08,2.93c-0.51,1.11-1.82,1.59-2.93,1.08l-5.66-2.63 c-0.1-0.04-0.2-0.09-0.3-0.16c-0.91-0.57-1.54-1.34-1.93-2.29c-0.31-0.76-0.45-1.6-0.44-2.5l0-0.14V68.24L15.33,68.24z M57.64,114.44V50.3L6.38,27.06V87.7L57.64,114.44L57.64,114.44z M115.1,27.82L64.02,50.33v64.17l51.08-25.96V27.82L115.1,27.82z M60.62,6.53L12.14,22.68l48.71,22.09l48.71-21.47L60.62,6.53L60.62,6.53z"
                      fill={currentSection === "Products" ? "#B88E2F" : "#000000"}
                    />
                  </g>
                </svg>
              </ListItemIcon>
              {open && <ListItemText primary="Products" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentSection("Orders")}
              selected={currentSection === "Orders"}
              sx={selectedStyle}
            >
              <ListItemIcon>
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 115.35 122.88"
                  xmlSpace="preserve"
                  height="25px"
                  width="25px"
                >
                  <g>
                    <path
                      d="M25.27,86.92c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h21.49c1.81,0,3.26,1.46,3.26,3.26s-1.46,3.26-3.26,3.26 H25.27L25.27,86.92L25.27,86.92z M61.1,77.47c-0.96,0-1.78-0.82-1.78-1.82c0-0.96,0.82-1.78,1.78-1.78h4.65c0.04,0,0.14,0,0.18,0 c1.64,0.04,3.1,0.36,4.33,1.14c1.37,0.87,2.37,2.19,2.92,4.15c0,0.04,0,0.09,0.05,0.14l0.46,1.82h39.89c1,0,1.78,0.82,1.78,1.78 c0,0.18-0.05,0.36-0.09,0.55l-4.65,18.74c-0.18,0.82-0.91,1.37-1.73,1.37l0,0l-29.18,0c0.64,2.37,1.28,3.65,2.14,4.24 c1.05,0.68,2.87,0.73,5.93,0.68h0.04l0,0h20.61c1,0,1.78,0.82,1.78,1.78c0,1-0.82,1.78-1.78,1.78H87.81l0,0 c-3.79,0.04-6.11-0.05-7.98-1.28c-1.92-1.28-2.92-3.46-3.92-7.43l0,0L69.8,80.2c0-0.05,0-0.05-0.04-0.09 c-0.27-1-0.73-1.69-1.37-2.05c-0.64-0.41-1.5-0.59-2.51-0.59c-0.05,0-0.09,0-0.14,0H61.1L61.1,77.47L61.1,77.47z M103.09,114.13 c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38s-4.38-1.96-4.38-4.38S100.67,114.13,103.09,114.13L103.09,114.13L103.09,114.13z M83.89,114.13c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38c-2.42,0-4.38-1.96-4.38-4.38S81.48,114.13,83.89,114.13 L83.89,114.13L83.89,114.13z M25.27,33.58c-1.81,0-3.26-1.47-3.26-3.26c0-1.8,1.47-3.26,3.26-3.26h50.52 c1.81,0,3.26,1.46,3.26,3.26c0,1.8-1.46,3.26-3.26,3.26H25.27L25.27,33.58L25.27,33.58z M7.57,0h85.63c2.09,0,3.99,0.85,5.35,2.21 s2.21,3.26,2.21,5.35v59.98h-6.5V7.59c0-0.29-0.12-0.56-0.31-0.76c-0.2-0.19-0.47-0.31-0.76-0.31l0,0H7.57 c-0.29,0-0.56,0.12-0.76,0.31S6.51,7.3,6.51,7.59v98.67c0,0.29,0.12,0.56,0.31,0.76s0.46,0.31,0.76,0.31h55.05 c0.61,2.39,1.3,4.48,2.23,6.47H7.57c-2.09,0-3.99-0.85-5.35-2.21C0.85,110.24,0,108.34,0,106.25V7.57c0-2.09,0.85-4,2.21-5.36 S5.48,0,7.57,0L7.57,0L7.57,0z M25.27,60.25c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h50.52c1.81,0,3.26,1.46,3.26,3.26 s-1.46,3.26-3.26,3.26H25.27L25.27,60.25L25.27,60.25z"
                      fill={currentSection === "Orders" ? "#B88E2F" : "#000000"}
                    />
                  </g>
                </svg>
              </ListItemIcon>
              {open && <ListItemText primary="Orders" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setCurrentSection("Users")}
              selected={currentSection === "Users"}
              sx={selectedStyle}
            >
              <ListItemIcon>
                <GroupOutlinedIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Users" />}
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
        <List sx={{ mt: "auto" }} disablePadding>
          <Divider />
          <ListItem sx={{ paddingLeft: "12px", py: "12px" }}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    bgcolor: (theme) => theme.palette.primary.main,
                    height: "30px",
                    width: "30px",
                  }}
                >
                  {user?.firstName[0].toUpperCase()}
                </Avatar>
              </ListItemIcon>
              {open && (
                <>
                  <ListItemText primary={user?.firstName} />
                  <ListItemIcon>
                  <ListItemButton onClick={() => setOpenDialog(true)}>
                    <LogoutIcon />
                  </ListItemButton>
                  </ListItemIcon>
                </>
                )}
          </ListItem>
        </List>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;
