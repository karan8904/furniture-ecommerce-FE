import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeOrderStatus, getOrders } from "../../slices/orderSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";

const OrdersGrid = () => {
  const [orderID, setOrderID] = useState(null);
  const [paginationDetails, setPaginationDetails] = useState({
    itemsPerPage: 5,
    totalItems: 0,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [query, setQuery] = useState("")
  const orders = useSelector((state) => state.order.getOrders.orders);
  const orderLoading = useSelector((state) => state.order.getOrders.loading);
  const changeStatusLoading = useSelector(
    (state) => state.order.changeStatus.loadingIDs
  );
  const baseURL = import.meta.env.VITE_BASEURL;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    if (orders?.length > 0) {
      setPaginationDetails({
        ...paginationDetails,
        totalItems: orders.length,
      });
      let count = Math.ceil(
        orders.length / paginationDetails.itemsPerPage
      );
      setTotalPages(count);
      const indexOfLastItem = currentPage * paginationDetails.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - paginationDetails.itemsPerPage;
      setCurrentOrders(orders.slice(indexOfFirstItem, indexOfLastItem));
    }
  }, [orders, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(query === "")
        dispatch(getOrders())
      if(query){
        setCurrentPage(1)
        dispatch(searchOrders(query))
      }
    }, 500)

    return () => clearTimeout(timer) 
  }, [query])

  const handleCloseDialog = () => {
    setOrderID(null);
  };

  const handleOnStatusChange = async (id, status) => {
    console.log(id, status);
    dispatch(changeOrderStatus({ id: id, status: status }));
  };

  return (
    <Grid container>
      <Grid container size={12}>
        <Grid size={12}>
          <Box display="flex">
            <Typography fontSize="25px" fontWeight="550">
              All Orders
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid size={12} margin="17px 0">
        <Divider />
      </Grid>
      <Grid container size={12} margin="0 10px 17px 10px">
          <Grid size={3}>
            <Box>
              <TextField
                id="search"
                placeholder="Search Order (Using OrderID)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    style: {
                      borderRadius: "15px",
                    },
                  },
                }}
                fullWidth
              />
            </Box>
          </Grid>
          <Grid size={6}></Grid>
        </Grid>
      <Grid size={12} margin="0 10px">
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>OrderID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Details</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Payment Mode</TableCell>
                <TableCell>PaymentID</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderLoading && (
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {currentOrders &&
                currentOrders?.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {index +
                        1 +
                        paginationDetails.itemsPerPage * (currentPage - 1)}
                    </TableCell>
                    <TableCell>{order.orderID}</TableCell>
                    <TableCell>
                      {order.address.firstName} {order.address.lastName}
                    </TableCell>
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
                    <TableCell>{order?.paymentID ?? "None"}</TableCell>
                    <TableCell>
                      {order.address.streetAddress}, {order.address.city}-
                      {order.address.zipCode}, {order.address.state},{" "}
                      {order.address.country}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ minWidth: 120 }}>
                        {!changeStatusLoading.includes(order._id) ? (
                          <Select
                            labelId="Order Status"
                            id="Order Status"
                            value={order.orderStatus}
                            onChange={(e) =>
                              handleOnStatusChange(order._id, e.target.value)
                            }
                          >
                            <MenuItem value="Placed">Placed</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Out for Delivery">
                              Out for Delivery
                            </MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                          </Select>
                        ) : (
                          <CircularProgress />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              {orders?.length > paginationDetails.itemsPerPage && (
                <TableRow>
                  <TableCell colSpan={9}>
                  <Box display="flex" justifyContent="center">
                      <Pagination
                        size="large"
                        count={totalPages}
                        page={currentPage}
                        onChange={(e, page) => {
                          setCurrentPage(page);
                          window.tableContainer.scrollTo(0, 0);
                        }}
                        shape="rounded"
                        color="primary"
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!orderLoading && orders.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={11}>
                    <Typography variant="h6">No Orders Found...</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default OrdersGrid;
