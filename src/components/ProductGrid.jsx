import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToWishlist, getFromWishlist, removeFromWishlist } from "../slices/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";

const ProductGrid = ({ products, productsLoading }) => {
  const baseURL = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const wishlistProducts = useSelector(
    (state) => state.wishlist.getFromWishlist.products
  );
  const addWishlistLoadingIDs = useSelector((state) => state.wishlist.addToWishlist.loadingIDs)
  const removeWishlistLoadingIDs = useSelector((state) => state.wishlist.removeFromWishlist.loadingIDs)

  useEffect(() => {
    dispatch(getFromWishlist());
  }, []);

  const productStyling = {
    maxWidth: { xs: 340, sm: 270, md: 240 },
    margin: "0 auto",
    cursor: "pointer",
  };

  const calculateDiscountPrice = (price, discount) => {
    return Math.round((price -= price * (discount / 100)));
  };

  const handleOnAddWishlist = async (e, id) => {
    e.stopPropagation()
    try {
      await dispatch(addToWishlist(id)).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const handleRemoveFromWishlist = async(e, id) => {
    e.stopPropagation()
    try {
      await dispatch(removeFromWishlist(id)).unwrap()
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  }

  return (
    <Grid
      container
      rowSpacing={2}
      columns={{ md: 12, sm: 8, xs: 12 }}
      columnSpacing={{ xs: 1, sm: 1, md: 3 }}
    >
      {productsLoading && (
        <Grid size={12} display="flex" justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {!productsLoading && products?.length === 0 && (
        <Grid size={12}>
          <Typography variant="h5" textAlign="center">
            No Products Found...
          </Typography>
        </Grid>
      )}
      {products ? (
        products.map((product) => {
          if (!product.isVisible) return;
          return (
            <Grid key={product._id} size={{ md: 3, sm: 4, xs: 12 }}>
                <Card sx={productStyling} onClick={() => navigate(`/single-product/${product._id}`)}>
                  <CardMedia
                    sx={{
                      height: "301px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "end",
                    }}
                    image={`${baseURL}/${product.images[0].replace(/\\/g, "/")}`}
                  >
                    {product.discount_percent > 0 ? (
                      <Avatar
                        sx={{
                          backgroundColor: "#e97171",
                          fontSize: "14px",
                          position: "absolute",
                          top: 18,
                          right: 18,
                          textAlign: "center",
                        }}
                        alt="Remy Sharp"
                      >
                        -{product.discount_percent}%
                      </Avatar>
                    ) : (
                      <></>
                    )}
                  </CardMedia>
                  <CardContent sx={{ backgroundColor: "#F4F5F7" }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography
                        gutterBottom
                        variant="h6"
                        fontWeight={600}
                        color="#3a3a3a"
                      >
                        {product.name.length > 8
                          ? product.name.slice(0, 10).trim() + "..."
                          : product.name}
                      </Typography>
                      {wishlistProducts.find((p) => p._id === product._id) ? (
                        <IconButton loading={removeWishlistLoadingIDs.includes(product._id)} onClick={(e) => handleRemoveFromWishlist(e, product._id)}>
                          {!removeWishlistLoadingIDs.includes(product._id) && (<FavoriteIcon sx={{ fill: "red" }} />)}
                        </IconButton>
                      ) : (
                        <IconButton
                          loading={addWishlistLoadingIDs.includes(product._id)}
                          onClick={(e) => handleOnAddWishlist(e, product._id)}
                        >
                          {!addWishlistLoadingIDs.includes(product._id) && (<FavoriteBorderIcon />)}
                        </IconButton>
                      )}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="#898989"
                      fontWeight={500}
                    >
                      {product.category.name}
                    </Typography>
                    {product.discount_percent > 0 ? (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignContent="center"
                      >
                        <Typography
                          variant="body2"
                          color="#3a3a3a"
                          fontWeight={600}
                          fontSize="18px"
                        >
                          ₹
                          {calculateDiscountPrice(
                            product.price,
                            product.discount_percent
                          )}
                          .00
                        </Typography>
                        <Typography
                          variant="body2"
                          color="secondary"
                          fontWeight={400}
                          fontSize="16px"
                        >
                          <del>₹{product.price}.00</del>
                        </Typography>
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        color="#3a3a3a"
                        fontWeight={600}
                        fontSize="20px"
                      >
                        ₹{product.price}.00
                      </Typography>
                    )}
                  </CardContent>
                </Card>
            </Grid>
          );
        })
      ) : (
        <Typography textAlign="center">No Products Found...</Typography>
      )}
    </Grid>
  );
};

export default ProductGrid;
