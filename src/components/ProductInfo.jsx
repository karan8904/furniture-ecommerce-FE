import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router";

const ProductInfo = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [pvImages, setPvImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
      let pv_imgs = product.images.slice(1);
      setPvImages(pv_imgs);
    }
  }, [product]);

  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: "120px",
  };

  const handleImages = (img, index) => {
    let currentMainImg = mainImage;
    setMainImage(img);
    let currentPvImages = pvImages;
    currentPvImages[index] = currentMainImg;
    setPvImages(currentPvImages);
  };

  const calculateDiscountPrice = (price, discount) => {
    return (price -= price * (discount / 100));
  };

  const handleOnAddingCart = () => {
    
  }

  return (
    <Box marginTop={2}>
      <Grid container columnSpacing={2} rowSpacing={1}>
        <Grid
          size={{ xs: 12, sm: 12, md: 6 }}
          display="flex"
          justifyContent={{
            xs: "space-around",
            sm: "space-around",
            md: "space-evenly",
          }}
        >
          <Box>
            <ImageList sx={{ width: "76px" }} gap="20px" cols={1}>
              {pvImages.map((img, index) => (
                <Box
                  key={img}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.custom.bannerColor,
                    borderRadius: "10px",
                    height: "76px",
                    width: "73px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImages(img, index)}
                >
                  <ImageListItem>
                    <img
                      srcSet={`http://localhost:5000/${img}`}
                      src={img}
                      alt={img}
                      style={{ height: "76px", width: "73px" }}
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
              width: { xs: "230px", sm: "400px", md: "390px", lg: "423px" },
              maxHeight: { xs: "300px", sm: "390px", md: "400px" },
            }}
            marginTop="16px"
            borderRadius="10px"
            display={{ sm: "flex" }}
            justifyContent={{ sm: "center" }}
            overflow="hidden"
          >
            <img
              src={`http://localhost:5000/${mainImage}`}
              width="100%"
              alt=""
            />
          </Box>
        </Grid>

        <Grid size={{ sm: 12, md: 6 }} padding="0 20px" display="flex">
          <Box marginTop="15px">
            <Typography fontSize="38px">{product.name}</Typography>
            {product.discount_percent > 0 ? (
              <Box display="flex" gap="30px" alignContent="center">
                <Typography
                  variant="body2"
                  color="#3a3a3a"
                  fontWeight={550}
                  fontSize="18px"
                >
                  ₹{" "}
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
                  fontSize="18px"
                >
                  <del>₹ {product.price}.00</del>
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
              <Typography fontSize="14px">{product.description}</Typography>
            </Box>
            <Box marginTop="14px">
              <Typography fontSize="14px" color="secondary">
                Size
              </Typography>
              <Box marginTop="5px">
                {product.sizes?.map((size) => (
                  <Button
                    key={size}
                    variant="contained"
                    sx={{
                      minWidth: "50px",
                      marginRight: "10px",
                      backgroundColor:
                        selectedSize === size
                          ? (theme) => theme.palette.primary.main
                          : (theme) => theme.palette.custom.bannerColor,
                      color: selectedSize === size ? "#fff" : "#000",
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box marginTop="20px">
              <Typography fontSize="14px" color="secondary">
                Color
              </Typography>
              <Box>
                {product.colors?.map((color) => (
                  <IconButton
                    size="small"
                    key={color}
                    onClick={() => setSelectedColor(color)}
                  >
                    <CircleIcon
                      sx={{
                        color: color,
                        fontSize: "40px",
                        outline:
                          selectedColor === color ? "1px solid" : "none",
                        borderRadius: "50%",
                      }}
                    />
                  </IconButton>
                ))}
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
                onClick={handleOnAddingCart}
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
