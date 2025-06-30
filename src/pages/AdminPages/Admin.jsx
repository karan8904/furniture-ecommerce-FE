import React, { useState } from "react";
import {
  Box,
  Grid,
} from "@mui/material";
import Sidebar from "../../components/AdminComponents/Sidebar";
import CategoriesGrid from "../../components/AdminComponents/CategoriesGrid";
import ProductsGrid from "../../components/AdminComponents/ProductsGrid";
import OrdersGrid from "../../components/AdminComponents/OrdersGrid";
import UsersGrid from "../../components/AdminComponents/UsersGrid";
import Dashboard from "../../components/AdminComponents/Dashboard";

const Admin = () => {
  const [currentSection, setCurrentSection] = useState("Dashboard");

  return (
    <>
      <Box>
        <Grid container rowSpacing={3}>
          <Sidebar setCurrentSection={setCurrentSection} currentSection={currentSection} />
          <Grid
            size={10}
            display={currentSection !== "Dashboard" ? "none" : "block"}
            marginTop="15px"
          >
            <Dashboard />
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
          <Grid
            size={10}
            display={currentSection !== "Orders" ? "none" : "block"}
            marginTop="15px"
          >
            <OrdersGrid />
          </Grid>
          <Grid
            size={10}
            display={currentSection !== "Users" ? "none" : "block"}
            marginTop="15px"
          >
            <UsersGrid />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
