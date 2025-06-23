import React, { useState } from "react";
import {
  Box,
  Grid,
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
          <Sidebar setCurrentSection={setCurrentSection} currentSection={currentSection} />
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
            <CategoriesGrid currentSection={currentSection} />
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
