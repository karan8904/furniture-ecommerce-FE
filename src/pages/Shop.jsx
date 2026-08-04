import React, { useEffect, useState } from "react";
import PageTitleComponent from "../components/PageTitleComponent";
import Products from "../components/Products";
import { Box, Pagination } from "@mui/material";

import FilterComponent from "../components/FilterComponent";
import InfoComponent from "../components/InfoComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../slices/productSlice";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("default");
  const dispatch = useDispatch();

  const { products, pagination } = useSelector((state) => state.product.getProducts);

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, itemsPerPage, filter }));
  }, [dispatch, currentPage, itemsPerPage, filter]);

  const totalItems = pagination?.totalItems ?? products?.length ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const firstProductNumber = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const lastProductNumber = totalItems > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  return (
    <>
      <PageTitleComponent pageTitle="Shop" />

      <FilterComponent
        totalProducts={totalItems}
        firstProductNumber={firstProductNumber}
        lastProductNumber={lastProductNumber}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        filter={filter}
        setFilter={setFilter}
      />

      <Box margin="70px 0">
        <Products products={products} />
        {totalPages > 1 && (
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
        )}
      </Box>

      <InfoComponent />
    </>
  );
};

export default Shop;
