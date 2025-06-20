import { Avatar, Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router";

const ProductGrid = ({products}) => {
  const baseURL = import.meta.env.VITE_BASEURL
  const productStyling = {
    maxWidth: { xs: 340, sm: 270, md: 240 },
    margin: "0 auto",
    cursor: "pointer",
  };

  const calculateDiscountPrice = (price, discount) => {
    return (price -= price * (discount / 100));
  };

  return (
    <Grid
      container
      rowSpacing={2}
      columns={{ md: 12, sm: 8, xs: 12 }}
      columnSpacing={{ xs: 1, sm: 1, md: 3 }}
    >
      {products ? (
        products.map((product) => {
          if (!product.isVisible) return;
          return (
            <Grid key={product._id} size={{ md: 3, sm: 4, xs: 12 }}>
              <Link
                to={`/single-product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={productStyling}>
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      fontWeight={600}
                      color="#3a3a3a"
                    >
                      {product.name}
                    </Typography>
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
              </Link>
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
