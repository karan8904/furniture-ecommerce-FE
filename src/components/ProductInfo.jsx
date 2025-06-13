import React, { useState } from "react";
import product_pv1 from "../assets/product_pv1.png";
import product_pv2 from "../assets/product_pv2.png";
import product_pv3 from "../assets/product_pv3.png";
import product_pv4 from "../assets/product_pv4.png";
import sofaImg from "../assets/sofa.png";
import {
  Box,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  Rating,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const ProductInfo = () => {
  const [qty, setQty] = useState(1);
  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: "120px",
  };

  const pv_images = [product_pv1, product_pv2, product_pv3, product_pv4];
  return (
    <Box marginTop={2}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid
          size={{ sm: 12, md: 6 }}
          display="flex"
          justifyContent={{ sm: "center", md: "space-evenly" }}
        >
          <Box>
            <ImageList sx={{ width: "76px", height: "416px" }} cols={1}>
              {pv_images.map((img) => (
                <Box
                  key={img}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.custom.bannerColor,
                    borderRadius: "10px",
                    height: "76px",
                    width: "73px",
                    overflow: "hidden",
                  }}
                >
                  <ImageListItem>
                    <img
                      srcSet={img}
                      src={img}
                      alt={img}
                      style={{ height: "70px", width: "70px" }}
                      loading="lazy"
                    />
                  </ImageListItem>
                </Box>
              ))}
            </ImageList>
          </Box>

          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.custom.bannerColor,
              width: { xs: "100%", sm: "80%", md: "390px", lg: "423px" },
              maxHeight: { xs: "380px", sm: "390px", md: "400px" },
            }}
            marginTop="16px"
            borderRadius="10px"
            display={{ sm: "flex" }}
            justifyContent={{ sm: "center" }}
            overflow="hidden"
          >
            <img src={sofaImg} width="100%" alt="" />
          </Box>
        </Grid>

        <Grid
          size={{ sm: 12, md: 6 }}
          padding="0 20px"
          display="flex"
          justifyContent={{ sm: "start", md: "center" }}
        >
          <Box marginTop="15px">
            <Typography fontSize="38px">Asgard sofa</Typography>
            <Typography fontSize="19px" color="secondary" fontWeight={500}>
              Rs. 250,000.00
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              marginTop="10px"
              width={{ xs: "220px", sm: "230px", md: "250px" }}
            >
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  console.log(newValue);
                }}
                defaultValue={4}
                size="small"
              />
              <Box borderRight="2px solid #9F9F9F" />

              <Typography fontSize="13px" color="secondary">
                5 Customer Reviews
              </Typography>
            </Box>
            <Box
              sx={{ maxWidth: { xs: "424px", sm: "600px" } }}
              marginTop="5px"
            >
              <Typography fontSize="14px">
                Setting the bar as one of the loudest speakers in its class, the
                Kilburn is a compact, stout-hearted hero with a well-balanced
                audio which boasts a clear midrange and extended highs for a
                sound.
              </Typography>
            </Box>
            <Box marginTop="14px">
              <Typography fontSize="14px" color="secondary">
                Size
              </Typography>
              <Box marginTop="5px">
                <Button
                  variant="contained"
                  sx={{ minWidth: "50px", marginRight: "10px" }}
                >
                  L
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "50px",
                    marginRight: "10px",
                    backgroundColor: (style) =>
                      style.palette.custom.bannerColor,
                    color: "#000",
                  }}
                >
                  XL
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "50px",
                    marginRight: "10px",
                    backgroundColor: (style) =>
                      style.palette.custom.bannerColor,
                    color: "#000",
                  }}
                >
                  XS
                </Button>
              </Box>
            </Box>
            <Box marginTop="20px">
              <Typography fontSize="14px" color="secondary">
                Color
              </Typography>
              <Box>
                <IconButton size="small">
                  <CircleIcon sx={{ color: "#816DFA", fontSize: "40px" }} />
                </IconButton>
                <IconButton size="small">
                  <CircleIcon sx={{ color: "#000", fontSize: "40px" }} />
                </IconButton>
                <IconButton size="small">
                  <CircleIcon color="primary" sx={{ fontSize: "40px" }} />
                </IconButton>
              </Box>
            </Box>
            <Box marginTop="20px" display="flex">
              <TextField
                sx={numberFieldStyling}
                type="number"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={() => setQty(qty - 1)}
                          disabled={qty < 2}
                        >
                          -
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setQty(qty + 1)}
                          disabled={qty > 9}
                        >
                          +
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: "10px",
                    },
                  },
                }}
                value={qty}
              ></TextField>
              <Button
                variant="outlined"
                sx={{ margin: "0 20px", borderRadius: "15px" }}
              >
                Add to cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductInfo;
