import React, { useEffect, useState } from "react";
import PageTitleComponent from "../components/PageTitleComponent";
import InfoComponent from "../components/InfoComponent";
import { useDispatch, useSelector } from "react-redux";
import { getFromWishlist } from "../slices/wishlistSlice";
import { Container } from "@mui/material";
import ProductGrid from "../components/ProductGrid";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {products, loading} = useSelector((state) => state.wishlist.getFromWishlist);
  const user = useSelector((state) => state.user.getCurrentUser.user);

  useEffect(() => {
    if(user?._id){
      dispatch(getFromWishlist());
    }
  }, [user]);

  return (
    <>
      <PageTitleComponent pageTitle="Wishlist" />
          <Container sx={{ marginY: "40px" }}>
            <ProductGrid
              products={products}
              productsLoading={loading}
            />
          </Container>
      <InfoComponent />
    </>
  );
};

export default Wishlist;
