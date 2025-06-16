import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";

import logo from "../assets/logo.png";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CategoriesGrid from "../components/AdminComponents/CategoriesGrid";
import InventoryIcon from "@mui/icons-material/Inventory";
import ProductsGrid from "../components/AdminComponents/ProductsGrid";

const Admin = () => {
  const [currentSection, setCurrentSection] = useState("Categories");
  return (
    <>
      <Box>
        <Grid container rowSpacing={3}>
          <Grid size={12}>
            <Box>
              <Box display="flex" columnGap={2} margin="5px 40px">
                <img src={logo} alt="" height="34px" width="45px" />
                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                  Furniro
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={2} borderRight="1px solid" height="85vh">
            <Stack>
              <Button
                sx={{ color: "#000", marginBottom: "10px" }}
                onClick={() => setCurrentSection("Dashboard")}
              >
                <Typography variant="h6" textAlign="center" fontWeight={550}>
                  Dashboard
                </Typography>
              </Button>
              <Divider />
              <Box>
                <List>
                  <ListItem>
                    <ListItemButton
                      onClick={() => setCurrentSection("Categories")}
                    >
                      <ListItemIcon>
                        <GridViewRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Categories" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemButton
                      onClick={() => setCurrentSection("Products")}
                    >
                      <ListItemIcon>
                        <InventoryIcon />
                      </ListItemIcon>
                      <ListItemText primary="Products" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Stack>
          </Grid>
          <Grid
            size={10}
            display={currentSection === "Dashboard" ? "flex" : "none"}
          >
            <Box>This is dashboard</Box>
          </Grid>
          <Grid
            size={10}
            display={currentSection !== "Categories" ? "none" : "block"}
          >
            <CategoriesGrid />
          </Grid>
          <Grid
            size={10}
            display={currentSection !== "Products" ? "none" : "block"}
          >
            <ProductsGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
