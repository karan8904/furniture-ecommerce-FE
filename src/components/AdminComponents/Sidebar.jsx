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
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import logo from "../../assets/logo.png";

const Sidebar = ({ setCurrentSection, currentSection }) => {
  const drawerWidth = 200;

  const selectedStyle = {
    "&.Mui-selected": {
      backgroundColor: "#f0f0f0",
      color: "primary.main",
      "& .MuiListItemIcon-root": {
        color: "primary.main",
      },
    },
  };

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
              <ListItemText primary="Dashboard" />
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
              <ListItemText primary="Categories" />
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
                {/* <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="m0 0h32v32h-32z" />

                    <path
                      d="m19 1.73205081 7.8564065 4.53589838c1.8564064 1.07179677 3 3.05255889 3 5.19615241v9.0717968c0 2.1435935-1.1435936 4.1243556-3 5.1961524l-7.8564065 4.5358984c-1.8564065 1.0717968-4.1435935 1.0717968-6 0l-7.85640646-4.5358984c-1.85640646-1.0717968-3-3.0525589-3-5.1961524v-9.0717968c0-2.14359352 1.14359354-4.12435564 3-5.19615241l7.85640646-4.53589838c1.8564065-1.07179677 4.1435935-1.07179677 6 0zm-4.791172 1.6195783-.208828.11247251-7.85640646 4.53589838c-1.17246724.67692428-1.91843145 1.89771701-1.99370617 3.2394348l-.00629383.2246668v9.0717968c0 1.3538485.68425541 2.6102689 1.80857977 3.3463176l.19142023.117784 7.85640646 4.5358984c1.1688485.674835 2.5938608.7123258 3.791172.1124725l.208828-.1124725 7.8564065-4.5358984c1.1724672-.6769243 1.9184314-1.897717 1.9937061-3.2394348l.0062939-.2246668v-9.0717968c0-1.3538485-.6842555-2.61026887-1.8085798-3.34631759l-.1914202-.11778401-7.8564065-4.53589838c-1.1688485-.67483501-2.5938608-.71232584-3.791172-.11247251zm8.8114886 8.20574889c.259282.4876385.0741624 1.0931371-.4134761 1.3524191l-5.6183556 2.9868539.0000413 6.7689186c0 .5522848-.4477152 1-1 1-.5522847 0-1-.4477152-1-1l-.0000413-6.7689186-5.61827304-2.9868539c-.48763849-.259282-.67275801-.8647806-.41347603-1.3524191.25928199-.4876385.86478067-.672758 1.35241917-.4134761l5.6793299 3.0187491 5.6794125-3.0187491c.4876385-.2592819 1.0931372-.0741624 1.3524192.4134761z"
                      fill={currentSection==="Products" ? "#B88E2F" : "#000000"}
                      fillRule="nonzero"
                    />
                  </g>
                </svg> */}
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 121.48 122.88" xmlSpace="preserve"  width="25px"
                  height="25px"><g><path d="M2.74,19.11L59.65,0.16c0.68-0.23,1.39-0.21,2.02,0.01l0-0.01l57.66,19.75c1.42,0.48,2.28,1.86,2.15,3.29 c0.01,0.07,0.01,0.15,0.01,0.23v67.06h-0.01c0,1.16-0.64,2.28-1.75,2.84l-57.25,29.09c-0.48,0.29-1.05,0.46-1.65,0.46 c-0.64,0-1.23-0.19-1.73-0.51L1.72,92.44c-1.08-0.57-1.71-1.67-1.71-2.82H0V22.27C0,20.66,1.19,19.33,2.74,19.11L2.74,19.11z M15.33,68.24c0-1.22,0.99-2.22,2.22-2.22c1.22,0,2.22,0.99,2.22,2.22v9.03c0,0.07,0,0.15-0.01,0.22c0,0.31,0.04,0.56,0.11,0.75 c0.03,0.06,0.06,0.12,0.12,0.16l5.53,2.57c1.11,0.51,1.59,1.83,1.08,2.93c-0.51,1.11-1.82,1.59-2.93,1.08l-5.66-2.63 c-0.1-0.04-0.2-0.09-0.3-0.16c-0.91-0.57-1.54-1.34-1.93-2.29c-0.31-0.76-0.45-1.6-0.44-2.5l0-0.14V68.24L15.33,68.24z M57.64,114.44V50.3L6.38,27.06V87.7L57.64,114.44L57.64,114.44z M115.1,27.82L64.02,50.33v64.17l51.08-25.96V27.82L115.1,27.82z M60.62,6.53L12.14,22.68l48.71,22.09l48.71-21.47L60.62,6.53L60.62,6.53z"
                  fill={currentSection==="Products" ? "#B88E2F" : "#000000"}
                  /></g></svg>
              </ListItemIcon>
              <ListItemText primary="Products" />
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
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.35 122.88" xmlSpace="preserve" height="25px"
                width="25px"><g><path d="M25.27,86.92c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h21.49c1.81,0,3.26,1.46,3.26,3.26s-1.46,3.26-3.26,3.26 H25.27L25.27,86.92L25.27,86.92z M61.1,77.47c-0.96,0-1.78-0.82-1.78-1.82c0-0.96,0.82-1.78,1.78-1.78h4.65c0.04,0,0.14,0,0.18,0 c1.64,0.04,3.1,0.36,4.33,1.14c1.37,0.87,2.37,2.19,2.92,4.15c0,0.04,0,0.09,0.05,0.14l0.46,1.82h39.89c1,0,1.78,0.82,1.78,1.78 c0,0.18-0.05,0.36-0.09,0.55l-4.65,18.74c-0.18,0.82-0.91,1.37-1.73,1.37l0,0l-29.18,0c0.64,2.37,1.28,3.65,2.14,4.24 c1.05,0.68,2.87,0.73,5.93,0.68h0.04l0,0h20.61c1,0,1.78,0.82,1.78,1.78c0,1-0.82,1.78-1.78,1.78H87.81l0,0 c-3.79,0.04-6.11-0.05-7.98-1.28c-1.92-1.28-2.92-3.46-3.92-7.43l0,0L69.8,80.2c0-0.05,0-0.05-0.04-0.09 c-0.27-1-0.73-1.69-1.37-2.05c-0.64-0.41-1.5-0.59-2.51-0.59c-0.05,0-0.09,0-0.14,0H61.1L61.1,77.47L61.1,77.47z M103.09,114.13 c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38s-4.38-1.96-4.38-4.38S100.67,114.13,103.09,114.13L103.09,114.13L103.09,114.13z M83.89,114.13c2.42,0,4.38,1.96,4.38,4.38s-1.96,4.38-4.38,4.38c-2.42,0-4.38-1.96-4.38-4.38S81.48,114.13,83.89,114.13 L83.89,114.13L83.89,114.13z M25.27,33.58c-1.81,0-3.26-1.47-3.26-3.26c0-1.8,1.47-3.26,3.26-3.26h50.52 c1.81,0,3.26,1.46,3.26,3.26c0,1.8-1.46,3.26-3.26,3.26H25.27L25.27,33.58L25.27,33.58z M7.57,0h85.63c2.09,0,3.99,0.85,5.35,2.21 s2.21,3.26,2.21,5.35v59.98h-6.5V7.59c0-0.29-0.12-0.56-0.31-0.76c-0.2-0.19-0.47-0.31-0.76-0.31l0,0H7.57 c-0.29,0-0.56,0.12-0.76,0.31S6.51,7.3,6.51,7.59v98.67c0,0.29,0.12,0.56,0.31,0.76s0.46,0.31,0.76,0.31h55.05 c0.61,2.39,1.3,4.48,2.23,6.47H7.57c-2.09,0-3.99-0.85-5.35-2.21C0.85,110.24,0,108.34,0,106.25V7.57c0-2.09,0.85-4,2.21-5.36 S5.48,0,7.57,0L7.57,0L7.57,0z M25.27,60.25c-1.81,0-3.26-1.46-3.26-3.26s1.47-3.26,3.26-3.26h50.52c1.81,0,3.26,1.46,3.26,3.26 s-1.46,3.26-3.26,3.26H25.27L25.27,60.25L25.27,60.25z"
                fill={currentSection==="Orders" ? "#B88E2F" : "#000000"}
                /></g></svg>
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Grid>
  );
};

export default Sidebar;
