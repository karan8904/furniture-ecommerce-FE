import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Breadcrumbs,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { Link, useNavigate, useParams } from "react-router";
import Products from "../components/Products";
import ProductInfo from "../components/ProductInfo";
import { getSingleProduct } from "../slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = params.id
  const product = useSelector((state) => state.product.getSingleProduct.product)
  const productLoading = useSelector((state) => state.product.getSingleProduct.loading)

  useEffect(() => {
    dispatch(getSingleProduct(id))
  }, [id])

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
          <Typography fontWeight={500} fontSize="16px">
            <Link to="/shop" style={{ textDecoration: "none", color: "#9F9F9F" }}>
              Shop
            </Link>
          </Typography>

          <Typography
            fontSize="16px"
            color="#000"
            fontWeight={500}
            borderLeft="2px solid #9F9F9F"
            paddingLeft="30px"
          >
            {product?.name}
          </Typography>
        </Breadcrumbs>
      </Box>

      {productLoading ? (<></>) : (<ProductInfo product={product} />) }
      

      <Divider sx={{ margin: "50px 0" }} />

      <Box marginBottom="50px">
        <Typography fontWeight={500} fontSize="36px" textAlign="center">
          Related Products
        </Typography>
        <Box>
          <Products num={4} />
        </Box>
        <Box display="flex" justifyContent="center" sx={{ marginTop: "40px" }}>
            <Button variant="outlined" size="large" onClick={() => navigate("/shop")}>Show More</Button>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default SingleProduct;
