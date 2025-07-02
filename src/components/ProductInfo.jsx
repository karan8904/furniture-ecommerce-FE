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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import { addToCart } from "../slices/cartSlice";
import * as Yup from "yup";
import { getCurrentUser, loginUser } from "../slices/userSlice";

const ProductInfo = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [pvImages, setPvImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [finalPrice, setFinalPrice] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const baseURL = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading)
  const user = useSelector((state) => state.user.getCurrentUser.user);
  
  
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setMainImage(product.images[0]);
      let pv_imgs = product.images.slice(1);
      setPvImages(pv_imgs);
    }
    const price =
    product?.discount_percent > 0
    ? calculateDiscountPrice(product.price, product.discount_percent)
    : product.price;
    setFinalPrice(price);
  }, [product, user]);
  
  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: "120px",
  };
  const textFieldStyling = {
    marginTop: "13px",
  };

  const handleOnAddingCart = async () => {
    try {
      console.log(formik.values);
      await dispatch(addToCart(formik.values)).unwrap();
      dispatch(showSnackbar({ message: "Product added to cart." }));
    } catch (error) {
      dispatch(
        showSnackbar({ severity: "error", message: "Product added to cart." })
      );
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userID: user?._id,
      productID: product?._id,
      selectedSize: selectedSize,
      quantity: qty,
      selectedColor: selectedColor,
      finalPrice: finalPrice,
    },
    onSubmit: () => {
      if (!formik.values.userID) {
        setOpenDialog(true);
      } else if (formik.values.selectedSize && formik.values.selectedColor) {
        handleOnAddingCart();
      } else
        dispatch(
          showSnackbar({
            severity: "error",
            message: "Please select both size and color.",
          })
        );
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    password: Yup.string().required("This field is required."),
  });

  const handleOnSubmit = async() => {
    try {
      await dispatch(
        loginUser({ email: formikLogin.values.email, password: formikLogin.values.password })
      ).unwrap();
      dispatch(
        showSnackbar({ message: "Logged in Successful..." })
      );
      setOpenDialog(false)
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  }

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
  })

  const handleImages = (img, index) => {
    let currentMainImg = mainImage;
    setMainImage(img);
    let currentPvImages = pvImages;
    currentPvImages[index] = currentMainImg;
    setPvImages(currentPvImages);
  };

  const calculateDiscountPrice = (price, discount) => {
    return Math.round(price -= price * (discount / 100));
  };

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
                      srcSet={`${baseURL}/${img}`}
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
            <img src={`${baseURL}/${mainImage}`} width="100%" alt="" />
          </Box>
        </Grid>

        <Grid size={{ sm: 12, md: 6 }} padding="0 20px" display="flex">
          <Box marginTop="15px">
            <form onSubmit={formik.handleSubmit}>
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
                {product.stock > 0 ? (
                  <Button
                    variant="outlined"
                    sx={{ margin: "0 20px", borderRadius: "15px" }}
                    type="submit"
                  >
                    Add to cart
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{ margin: "0 20px", borderRadius: "15px" }}
                    disabled
                  >
                    OUT OF STOCK
                  </Button>
                )}
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <form onSubmit={formikLogin.handleSubmit}>
        <DialogTitle id="alert-dialog-title">
          Login to your account
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Box>
                <Stack width={{ xs: 320, sm: 350, md: 400 }}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    sx={textFieldStyling}
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    error={
                      formikLogin.touched.email && formikLogin.errors.email
                    }
                    helperText={
                      formikLogin.touched.email && formikLogin.errors.email
                        ? formikLogin.errors.email
                        : ""
                    }
                  />

                  <TextField
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.password}
                    sx={textFieldStyling}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setIsPasswordVisible(
                                  !isPasswordVisible
                                )
                              }
                              edge="end"
                            >
                              {isPasswordVisible ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    error={
                      formikLogin.touched.password &&
                      formikLogin.errors.password
                    }
                    helperText={
                      formikLogin.touched.password &&
                      formikLogin.errors.password
                        ? formikLogin.errors.password
                        : ""
                    }
                  />

                  <Box
                    marginTop="10px"
                    display="flex"
                    justifyContent="end"
                  >
                    <Typography fontSize="14px">
                      <Link
                        to="/forgot-password"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Typography>
                  </Box> 

                  <Box
                    marginTop="20px"
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography fontSize="18px">
                      Not a user?{" "}
                      <Link
                        to="/register"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Register
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDialog(false)}
            >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            autoFocus
            >
            Login
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ProductInfo;
