import React from "react";
import product from "../assets/product.png";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const Products = ({ num }) => {
  const productStyling = {
    maxWidth: { xs: 340, sm: 270, md: 240 },
    margin: "0 auto",
  };

  const items = [];

  for (let i = 0; i < num; i++) {
    items.push(
      <Grid key={i} size={{ md: 3, sm: 4, xs: 12 }}>
        <Card sx={productStyling}>
          <CardMedia
            sx={{
              height: "301px",
              position: "relative",
              display: "flex",
              justifyContent: "end",
            }}
            image={product}
          >
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
              -50%
            </Avatar>
          </CardMedia>
          <CardContent sx={{ backgroundColor: "#F4F5F7" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={600}
              color="#3a3a3a"
            >
              Syltherine
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              color="#898989"
              fontWeight={500}
            >
              Stylish cafe chair
            </Typography>
            <Typography
              variant="body2"
              color="#3a3a3a"
              fontWeight={600}
              fontSize="20px"
            >
              Rs 2,500.000
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <Container>
        <Container sx={{ marginTop: "40px" }}>
          <Grid
            container
            rowSpacing={2}
            columns={{ md: 12, sm: 8, xs: 12 }}
            columnSpacing={{ xs: 1, sm: 1, md: 3 }}
          >
            {items}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

export default Products;
