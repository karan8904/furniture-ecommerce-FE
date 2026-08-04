import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid, Stack, Pagination } from "@mui/material";
import { getCategories } from "../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { CategorySkeleton } from "./SkeletonLoading/OtherSkeletons";

const CategoryComponent = ({limit, isCategoryPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = limit || 6;
  const dispatch = useDispatch();
  const { categories, loading, pagination } = useSelector((state) => state.category.getCategories);

  useEffect(() => {
    dispatch(getCategories({ page: limit ? 1 : currentPage, itemsPerPage }));
  }, [dispatch, limit, isCategoryPage, currentPage]);

  const totalPages = pagination?.totalPages || 1;

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
            {loading && (
              <CategorySkeleton count={isCategoryPage ? 6 : 3} />
            )}
            {!loading && categories && categories.map((category) => (
              <Grid size={{ md: 4, sm: 6, xs: 12 }} key={category._id}>
                <Link style={{ textDecoration: "none"}} to={`/category/${category._id}`}>
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" justifyContent="center">
                      <img src={category.imageURL} alt="" height="350px" width="270px" style={{ borderRadius: "10px" }} />
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
          {isCategoryPage && totalPages > 1 && (
            <Box margin="50px auto 20px" display="flex" justifyContent="center">
              <Pagination
                size="large"
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }}
                shape="rounded"
                color="primary"
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default CategoryComponent;
