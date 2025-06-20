import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/productSlice.js";
import ProductGrid from "./ProductGrid.jsx";

const Products = ({ num }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.getProducts.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      <Container>
        <Container sx={{ marginTop: "40px" }}>
          <ProductGrid products={products} />
        </Container>
      </Container>
    </>
  );
};

export default Products;
