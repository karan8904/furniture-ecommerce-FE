import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
  TextField,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import sofa from "../assets/sofa.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  getCartProducts,
  increaseQuantity,
} from "../slices/cartSlice";
import CircleIcon from "@mui/icons-material/Circle";
import { showSnackbar } from "../slices/snackbarSlice";
import { getCheckoutData, removeFromCart } from "../slices/cartSlice";

const CartTable = () => {
  const [qty, setQty] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.getCurrentUser.user);
  const products = useSelector((state) => state.cart.getCartProducts.products);
  const productsLoading = useSelector(
    (state) => state.cart.getCartProducts.loading
  );
  const deleteLoading = useSelector(
    (state) => state.cart.removeFromCart.loading
  );

  const baseURL = import.meta.env.VITE_BASEURL;

  useEffect(() => {
    if (user._id) dispatch(getCartProducts(user._id));
  }, [user]);

  useEffect(() => {
    let amount = 0;
    products.map((product) => {
      amount += product.price * product.quantity;
    });
    setTotalAmount(amount);
  }, [products]);

  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: "40px",
  };

  const handleIncreaseQuantity = async (productID) => {
    try {
      const userID = user._id;
      await dispatch(increaseQuantity({ userID, productID })).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const handleDecreaseQuantity = async (productID) => {
    try {
      const userID = user._id;
      await dispatch(decreaseQuantity({ userID, productID })).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const handleCheckout = () => {
    dispatch(getCheckoutData({ products, totalAmount: totalAmount }));
    navigate("/checkout");
  };

  const handleOpenDialog = (id) => {
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
  };

  const handleOnDelete = async () => {
    try {
      await dispatch(removeFromCart(deleteId)).unwrap();
      dispatch(showSnackbar({ message: "Product Removed From Cart." }));
      setDeleteId(null);
      await dispatch(getCartProducts(user._id)).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
      setDeleteId(null);
    }
  };

  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={2}>
        <Grid
          size={{ sm: 12, md: 9 }}
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: (theme) => theme.palette.custom.bannerColor,
                }}
              >
                <TableRow>
                  <TableCell align="center">Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsLoading && (
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {products &&
                  products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box
                            sx={{
                              backgroundColor: (theme) =>
                                theme.palette.custom.bannerColor,
                              maxWidth: "110px",
                              marginRight: "30px",
                              borderRadius: "10px",
                            }}
                          >
                            {product.productID?.images?.length > 0 && (
                              <img
                                src={`${baseURL}/${product.productID.images[0]}`}
                                alt={product.productID.name}
                                height="100"
                                width="105"
                              />
                            )}
                          </Box>
                          <Typography color="secondary" fontSize="16px">
                            {product.productID.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography color="secondary">
                          Rs. {product.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex">
                          <IconButton
                            onClick={() =>
                              handleDecreaseQuantity(product.productID._id)
                            }
                            disabled={product.quantity < 2}
                          >
                            -
                          </IconButton>
                          <TextField
                            sx={numberFieldStyling}
                            type="number"
                            value={product.quantity}
                          ></TextField>
                          <IconButton
                            onClick={() =>
                              handleIncreaseQuantity(product.productID._id)
                            }
                            disabled={product.quantity > 9}
                          >
                            +
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={product.selectedSize} />
                      </TableCell>
                      <TableCell>
                        <CircleIcon sx={{ fill: product.selectedColor }} />
                      </TableCell>
                      <TableCell>
                        <Typography>
                          Rs. {product.price * product.quantity}.00
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDialog(product._id)}
                        >
                          <DeleteIcon color="primary" />
                        </IconButton>
                        <Dialog
                          open={deleteId === product._id}
                          onClose={handleCloseDialog}
                          aria-labelledby="delete-dialog-title"
                          aria-describedby="delete-dialog-description"
                        >
                          <DialogTitle id="delete-dialog-title">
                            <strong>Remove Product</strong>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="delete-dialog-description">
                              Are you sure you want to remove this product?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCloseDialog}
                              variant="outlined"
                            >
                              Cancel
                            </Button>
                            <Button
                              loading={deleteLoading}
                              onClick={() => handleOnDelete()}
                              variant="contained"
                              autoFocus
                            >
                              Remove
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                {!productsLoading && products.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      <Typography variant="h6">Cart is Empty...</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }} display={{ md: "none", lg: "none" }}>
          <TableContainer>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: (theme) => theme.palette.custom.bannerColor,
                }}
              >
                <TableRow>
                  <TableCell colSpan={4}>Product Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.custom.bannerColor,
                          maxWidth: "110px",
                          marginRight: "30px",
                          borderRadius: "10px",
                        }}
                      >
                        <img src={sofa} alt="" height="100" width="105" />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="secondary"
                      fontSize={{ sm: "18px", md: "16px" }}
                    >
                      Asgard Sofa
                    </Typography>
                    <Typography color="secondary">Rs. 250,000.00</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <IconButton
                        onClick={() => setQty(qty - 1)}
                        disabled={qty < 2}
                      >
                        -
                      </IconButton>
                      <TextField
                        sx={numberFieldStyling}
                        type="number"
                        value={qty}
                      ></TextField>
                      <IconButton
                        onClick={() => setQty(qty + 1)}
                        disabled={qty > 4}
                      >
                        +
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center">
                      <IconButton>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.custom.bannerColor,
            }}
            padding="30px 0"
          >
            <Box>
              <Typography
                textAlign="center"
                fontSize={{ sm: "20px", md: "24px", lg: "28px" }}
                fontWeight="600"
              >
                Cart Totals
              </Typography>
            </Box>
            {products &&
              !products.loading &&
              products.map((product) => (
                <Box
                  key={product._id}
                  display="flex"
                  justifyContent="space-around"
                  paddingTop="10px"
                >
                  <Box display="flex" columnGap={2}>
                    <Typography>{product.productID.name}</Typography>
                    <Typography>x{product.quantity}</Typography>
                  </Box>
                  <Typography
                    fontWeight="400"
                    fontSize={{ md: "14px", lg: "17px" }}
                    color="secondary"
                  >
                    Rs. {product.price}.00
                  </Typography>
                </Box>
              ))}
            <Box display="flex" justifyContent="space-around" paddingTop="20px">
              <Typography>Total</Typography>
              <Typography
                color="primary"
                fontSize={{ md: "15px", lg: "20px" }}
                fontWeight="500"
              >
                Rs. {totalAmount}.00
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" paddingTop="30px">
              <Button
                disabled={products?.length === 0}
                variant="outlined"
                color="#000"
                sx={{ borderRadius: "10px" }}
                onClick={handleCheckout}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CartTable;
