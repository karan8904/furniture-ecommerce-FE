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
  Drawer,
  Toolbar,
} from "@mui/material";
import Sidebar from "../../components/AdminComponents/Sidebar";
import CategoriesGrid from "../../components/AdminComponents/CategoriesGrid";
import ProductsGrid from "../../components/AdminComponents/ProductsGrid";

const Admin = () => {
  const [currentSection, setCurrentSection] = useState("Categories");

  return (
    <>
      <Box>
        <Grid container rowSpacing={3}>
          <Sidebar setCurrentSection={setCurrentSection} />
          <Grid
            size={10}
            display={currentSection === "Dashboard" ? "flex" : "none"}
            marginTop="15px"
          >
            <Box>This is dashboard</Box>
          </Grid>
          <Grid
            size={10}
            display={currentSection !== "Categories" ? "none" : "block"}
            marginTop="15px"
          >
            <CategoriesGrid />
          </Grid>
          <Grid
            size={10}
            display={currentSection !== "Products" ? "none" : "block"}
            marginTop="15px"
          >
            <ProductsGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
