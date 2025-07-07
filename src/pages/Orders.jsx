import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, mailInvoice } from "../slices/orderSlice";
import {
  Paper,
  Grid,
  Button,
  Typography,
  Table,
  Chip,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Breadcrumbs, 
  IconButton,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Link } from "react-router";
import { showSnackbar } from "../slices/snackbarSlice";

const Orders = () => {
  const [orderID, setOrderID] = useState(null);
  const baseURL = import.meta.env.VITE_BASEURL;
  const user = useSelector((state) => state.user.getCurrentUser.user);
  const orders = useSelector((state) => state.order.getMyOrders.orders);
  const orderLoading = useSelector((state) => state.order.getMyOrders.loading);
  const loadingIDs = useSelector((state) => state.order.mailInvoice.loadingIDs)

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?._id) dispatch(getMyOrders({ id: user._id }));
  }, [user]);

  const handleCloseDialog = () => {
    setOrderID(null);
  };

  const handleOnGetInvoice = async(id) => {
    try {
      await dispatch(mailInvoice(id)).unwrap()
      dispatch(showSnackbar({ message: "Invoice is sent to your email." }))
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }))
    }
  }

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
          <Typography
            fontSize="16px"
            color="#000"
            fontWeight={500}
            borderLeft="2px solid #9F9F9F"
            paddingLeft="30px"
          >
            My Orders
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container margin="60px 30px" rowSpacing={3}>
        <Grid size={12}>
          <Typography variant="h5" fontWeight="550">
            My Orders
          </Typography>
        </Grid>
        <Grid size={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>OrderID</TableCell>
                  <TableCell>Product Details</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Payment Mode</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Ordered On</TableCell>
                  <TableCell>Get Invoice</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderLoading && (
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {orders &&
                  orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.orderID}</TableCell>
                      <TableCell>
                        <Typography
                          color="primary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => setOrderID(order._id)}
                        >
                          Check Details
                        </Typography>
                        <Dialog
                          open={orderID === order._id}
                          onClose={handleCloseDialog}
                          aria-labelledby="products-dialog-title"
                          aria-describedby="products-dialog-description"
                          maxWidth="lg"
                        >
                          <DialogTitle id="products-dialog-title">
                            <strong>Products Details</strong>
                          </DialogTitle>
                          <DialogContent>
                            <TableContainer component={Paper}>
                              <Table>
                                <TableHead>
                                  <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Color</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Total</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order?.products?.map((product, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>
                                        <img
                                          src={`${baseURL}/${product.productID.images[0]}`}
                                          height="50px"
                                          width="50px"
                                        />
                                      </TableCell>
                                      <TableCell>
                                        {product.productID.name}
                                      </TableCell>
                                      <TableCell>
                                        <Chip label={product.selectedSize} />
                                      </TableCell>
                                      <TableCell align="center">
                                        <CircleIcon
                                          sx={{ fill: product.selectedColor }}
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        {product.quantity}
                                      </TableCell>
                                      <TableCell>₹{product.price}</TableCell>
                                      <TableCell>
                                        ₹{product.price * product.quantity}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleCloseDialog}
                              variant="contained"
                              autoFocus
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell>₹{order.totalAmount}</TableCell>
                      <TableCell>{order.paymentMode}</TableCell>
                      <TableCell>{order.paymentStatus}</TableCell>
                      <TableCell>
                        {order.address.streetAddress}, {order.address.city}-
                        {order.address.zipCode}, {order.address.state},{" "}
                        {order.address.country}
                      </TableCell>
                      <TableCell>{order.orderStatus}</TableCell>
                      <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                      <TableCell align="center">
                        <IconButton loading={loadingIDs.includes(order._id)} onClick={() => handleOnGetInvoice(order._id)}>
                          {!loadingIDs.includes(order._id) ? (<CloudDownloadIcon color="primary" />) : (<></>)}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                {!orderLoading && orders?.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
                      <Typography variant="h6">No Orders Found...</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Orders;
