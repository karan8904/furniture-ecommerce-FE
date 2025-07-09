import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router";
import SubscriptionCards from "../components/SubscriptionCard";

const Subscriptions = () => {
  return (
    <>
      <Navbar />
      <Box
        padding="30px"
        sx={{ backgroundColor: (style) => style.palette.custom.bannerColor }}
      >
        <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />}>
          <Typography fontWeight={500} fontSize="16px">
            <Link to="/" style={{ textDecoration: "none", color: "#9F9F9F" }}>
              Home
            </Link>
          </Typography>
          <Typography
            fontSize="16px"
            color="#000"
            fontWeight={500}
            borderLeft="2px solid #9F9F9F"
            paddingLeft="30px"
          >
            Subscriptions
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container margin="60px 30px" columnSpacing={5} rowSpacing={3}>
        <Grid size={12}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Subscriptions
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center">
          <SubscriptionCards />
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center">
          <SubscriptionCards />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} display="flex" justifyContent="center" >
          <SubscriptionCards />
        </Grid> */}
      </Grid>
      <Footer />
    </>
  );
};

export default Subscriptions;
