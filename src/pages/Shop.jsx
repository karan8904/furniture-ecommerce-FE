import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { Box, Pagination } from "@mui/material";

import FilterComponent from "../components/FilterComponent";
import InfoComponent from "../components/InfoComponent";

const Shop = () => {
  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle="Shop" />

      <FilterComponent />

      <Box margin="70px 0">
        <Products num={16} />
        <Box margin="70px auto" display="flex" justifyContent="center">
          <Pagination count={3} shape="rounded" color="primary" size="large" />
        </Box>
      </Box>

      <InfoComponent />

      <Footer />
    </>
  );
};

export default Shop;
