import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Breadcrumbs,
  Typography,
  Button,
  Divider,
  Avatar,
  Rating,
  Grid,
  TextField,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Popover,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { Link, useNavigate, useParams } from "react-router";
import Products from "../components/Products";
import ProductInfo from "../components/ProductInfo";
import { getProducts, getSingleProduct } from "../slices/productSlice";
import { getMyOrders } from "../slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { showSnackbar } from "../slices/snackbarSlice";
import { getReviews } from "../slices/reviewSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ShareLink from "../components/ShareLink";

const SingleProduct = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const baseURL = import.meta.env.VITE_BASEURL;
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = params.id;
  const product = useSelector(
    (state) => state.product.getSingleProduct.product
  );
  const productLoading = useSelector(
    (state) => state.product.getSingleProduct.loading
  );
  const products = useSelector((state) => state.product.getProducts.products)
    .filter((p) => p._id !== id)
    .slice(0, 4);

  const { reviews, loading } = useSelector((state) => state.review.getReviews);
  useEffect(() => {
    dispatch(getSingleProduct(id));
    dispatch(getProducts());
    dispatch(getReviews(id));
  }, [id]);

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
            <Link
              to="/shop"
              style={{ textDecoration: "none", color: "#9F9F9F" }}
            >
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

      {productLoading ? (
        <></>
      ) : (
        <ProductInfo product={product} reviews={reviews} />
      )}
      <Divider sx={{ margin: "40px 0" }} />
      <Box>
        <Typography variant="h5" textAlign="center">
          Reviews
        </Typography>
        <Grid container size={{ xs: 12, sm: 12, md: 6 }} mx={4} mt={5}>
          {loading && (
            <Grid
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Grid>
          )}
          <Swiper
            slidesPerView={reviews.length >= 3 ? 3 : reviews.length}
            spaceBetween={10}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: reviews.length >= 2 ? 2 : reviews.length,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: reviews.length >= 4 ? 4 : reviews.length,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: reviews.length >= 4 ? 4 : reviews.length,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {reviews &&
              reviews?.length > 0 &&
              reviews?.map((review, index) => (
                <SwiperSlide key={index}>
                  <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined" sx={{ maxHeight: "160px" }}>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="center"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Avatar
                            src={
                              review?.userID?.profilePicture &&
                              `${baseURL}/${review.userID.profilePicture}`
                            }
                            sx={{
                              bgcolor: (theme) => theme.palette.primary.main,
                            }}
                            alt="user"
                          >
                            {review?.userID &&
                              review.userID.firstName[0].toUpperCase()}
                          </Avatar>
                          <Typography>{review?.userID?.firstName}</Typography>
                          <Rating
                            name="rating"
                            size="medium"
                            value={review?.ratingScore}
                            precision={0.5}
                            readOnly
                          />
                        </Box>
                        <Box marginTop={1}>
                          <Typography component="div">
                            {review?.description.length > 100 ? (
                              <>
                                {review.description.slice(0, 100)}...
                                <Typography
                                  aria-owns={
                                    open ? "mouse-over-popover" : undefined
                                  }
                                  aria-haspopup="true"
                                  onMouseEnter={handlePopoverOpen}
                                  onMouseLeave={handlePopoverClose}
                                  sx={{
                                    display: "inline",
                                    color: "blue",
                                    cursor: "pointer",
                                  }}
                                >
                                  More
                                </Typography>
                                <Popover
                                  id="mouse-over-popover"
                                  sx={{ pointerEvents: "none" }}
                                  open={open}
                                  anchorEl={anchorEl}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  onClose={handlePopoverClose}
                                  disableRestoreFocus
                                >
                                  <Typography sx={{ p: 1, width: "500px" }}>
                                    {review.description}
                                  </Typography>
                                </Popover>
                              </>
                            ) : (
                              review.description
                            )}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>

                  {/* <Box>
                    <Typography fontSize="19px">
                      
                    </Typography>
                    <Rating
                      name="rating"
                      size="medium"
                      value={review?.ratingScore}
                      precision={0.5}
                      readOnly
                    />
                    <Box maxWidth="650px" marginTop={1}>
                      <Typography>{review?.description}</Typography>
                    </Box>
                    <Typography color="secondary" fontSize="15px">
                      
                    </Typography>
                  </Box> */}
                </SwiperSlide>
              ))}
          </Swiper>

          {!loading && reviews.length === 0 && (
            <Grid
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h6">No Reviews Found.</Typography>
            </Grid>
          )}
        </Grid>
      </Box>
      <Divider sx={{ margin: "50px 0" }} />

      <Box marginBottom="50px">
        <Typography fontWeight={500} fontSize="36px" textAlign="center">
          Related Products
        </Typography>
        <Box>
          <Products products={products} />
        </Box>
        <Box display="flex" justifyContent="center" sx={{ marginTop: "40px" }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/shop")}
          >
            Show More
          </Button>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default SingleProduct;
