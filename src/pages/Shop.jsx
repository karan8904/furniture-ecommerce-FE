import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { Box, Pagination } from "@mui/material";

import FilterComponent from "../components/FilterComponent";
import InfoComponent from "../components/InfoComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/productSlice";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [firstProductNumber, setFirstProductNumber] = useState(1)
  const [lastProductNumber, setLastProductNumber] = useState(itemsPerPage)
  const products = useSelector((state) => state.product.getProducts.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      let count = Math.ceil(products.length / itemsPerPage);
      setTotalPages(count);
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      setFirstProductNumber(indexOfFirstItem + 1)
      setLastProductNumber(indexOfLastItem > products.length ? products.length : indexOfLastItem)
      setCurrentProducts(products.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [products, itemsPerPage, currentPage]);

  return (
    <>
      <Navbar />
      <PageTitleComponent pageTitle="Shop" />

      <FilterComponent totalProducts={products.length} firstProductNumber={firstProductNumber} lastProductNumber={lastProductNumber} setItemsPerPage={setItemsPerPage} setCurrentPage={setCurrentPage} />

      <Box margin="70px 0">
        <Products products={currentProducts} />
        <Box margin="70px auto" display="flex" justifyContent="center">
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
      </Box>

      <InfoComponent />

      <Footer />
    </>
  );
};

export default Shop;
