import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../../components/AdminComponents/Sidebar";
import CategoriesGrid from "../../components/AdminComponents/CategoriesGrid";
import ProductsGrid from "../../components/AdminComponents/ProductsGrid";
import OrdersGrid from "../../components/AdminComponents/OrdersGrid";
import UsersGrid from "../../components/AdminComponents/UsersGrid";
import Dashboard from "../../components/AdminComponents/Dashboard";
import { useSelector } from "react-redux";

const Admin = () => {
  const [currentSection, setCurrentSection] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const user = useSelector((state) => state.user.getCurrentUser.user)
  return (
    <>
      <Box>
        <Grid container rowSpacing={3}>
          <Grid size={open ? 2 : 1} padding="0">
            <Sidebar
              open={open}
              setOpen={setOpen}
              setCurrentSection={setCurrentSection}
              currentSection={currentSection}
              user={user}
            />
          </Grid>
          <Grid
            size={open ? 10 : 11}
            display={currentSection !== "Dashboard" ? "none" : "block"}
            marginTop="15px"
          >
            <Dashboard />
          </Grid>
          <Grid
            size={open ? 10 : 11}
            display={currentSection !== "Categories" ? "none" : "block"}
            marginTop="15px"
          >
            <CategoriesGrid />
          </Grid>
          <Grid
            size={open ? 10 : 11}
            display={currentSection !== "Products" ? "none" : "block"}
            marginTop="15px"
          >
            <ProductsGrid />
          </Grid>
          <Grid
            size={open ? 10 : 11}
            display={currentSection !== "Orders" ? "none" : "block"}
            marginTop="15px"
          >
            <OrdersGrid />
          </Grid>
          <Grid
            size={open ? 10 : 11}
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
