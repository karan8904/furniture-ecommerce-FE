import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid, Stack } from "@mui/material";
import { getCategories } from "../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const CategoryComponent = ({limit}) => {
  const dispatch = useDispatch()
  const baseURL = import.meta.env.VITE_BASEURL
  const categories = useSelector((state) => state.category.getCategories.categories)

  useEffect(() => {
    dispatch(getCategories())
  }, [])
  return (
    <>
      <Container sx={{ marginTop: "60px" }}>
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: "32px", textAlign: "center" }}
          >
            Browse Categories
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "20px",
              textAlign: "center",
              color: "#666666",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        <Box sx={{ marginTop: "70px" }}>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 1, md: 3 }}
            wrap="wrap"
          >
            {categories && categories.slice(0, limit || categories.length).map((category) => (
              <Grid size={{ md: 4, sm: 6, xs: 12 }} key={category._id}>
                <Link style={{ textDecoration: "none"}} to={`/category/${category._id}`}>
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="center">
                      <img src={`${baseURL}/${category.imageURL}`} alt="" height="350px" width="270px" style={{ borderRadius: "10px" }} />
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          margin: "15px 0",
                          color: "#333333",
                        }}
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
            </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CategoryComponent;
