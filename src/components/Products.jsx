import React, { useEffect } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/productSlice.js";
import ProductGrid from "./ProductGrid.jsx";

const Products = ({ num }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.getProducts.products);
  const productsLoading = useSelector(
    (state) => state.product.getProducts.loading
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Container>
        <Container sx={{ marginTop: "40px" }}>
          
          <ProductGrid products={products} productsLoading={productsLoading} />
        </Container>
      </Container>
    </>
  );
};

export default Products;
