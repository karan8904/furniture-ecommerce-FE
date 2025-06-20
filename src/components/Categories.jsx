import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid, Stack } from "@mui/material";
import { getCategories } from "../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";

const Categories = () => {
  const dispatch = useDispatch()
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
            Browse The Range
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
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 3 }}
            wrap="wrap"
          >
            {categories && categories.map((category) => (
              <Grid size={{ md: 4, sm: 12, xs: 12 }} key={category._id}>
                <Link style={{ textDecoration: "none"}} to={`/category/${category._id}`}>
                  <Stack>
                    <img src={`http://localhost:5000/${category.imageURL}`} alt="" />
                    <Typography
                      sx={{
                        fontWeight: 600,
                        textAlign: "center",
                        fontSize: "18px",
                        margin: "15px 0",
                        color: "#333333",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Stack>
                </Link>
            </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Categories;
