import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Footer from "../components/Footer";
import {
  Box,
  Container,
  Pagination,
} from "@mui/material";
import FilterComponent from "../components/FilterComponent";
import InfoComponent from "../components/InfoComponent";
import { useDispatch, useSelector } from "react-redux";
import { getFromCategory } from "../slices/productSlice";
import { useParams } from "react-router";
import ProductGrid from "../components/ProductGrid";

const ProductsFromCategory = () => {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const products = useSelector(
    (state) => state.product.getFromCategory.products
  );
  const productsLoading = useSelector(
    (state) => state.product.getProducts.loading
  );

  useEffect(() => {
    window.scrollTo(0,0)
    dispatch(getFromCategory(id));
  }, [params]);

  useEffect(() => {
    if (products && products.length > 0) {
      setCategory(products[0].category?.name || "");
    }
  }, [products]);

  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle={category} />
      <Box margin="70px 0">
        <Container>
          <Container sx={{ marginTop: "40px" }}>
            <ProductGrid products={products} productsLoading={productsLoading} />
          </Container>
        </Container>
      </Box>

      <InfoComponent />

      <Footer />
    </>
  );
};

export default ProductsFromCategory;
