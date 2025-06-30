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
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../slices/productSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsGrid = () => {
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASEURL;
  const products = useSelector((state) => state.product.getProducts.products);
  const productsLoading = useSelector(
    (state) => state.product.getProducts.loading
  );
  const deleteLoading = useSelector(
    (state) => state.product.deleteProduct.loading
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleOpenDialog = (id) => {
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
  };

  const handleOnDelete = async () => {
    try {
      await dispatch(deleteProduct(deleteId)).unwrap();
      dispatch(showSnackbar({ message: "Product Deleted Successfully." }));
      setDeleteId(null);
      await dispatch(getProducts()).unwrap();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
      setDeleteId(null);
    }
  };

  return (
    <>
      <Grid container>
        <Grid container size={12}>
          <Grid size={8}>
            <Box display="flex">
              <Typography fontSize="25px" fontWeight="550">
                All Products
              </Typography>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => navigate("/admin/add-product")}
              >
                Add New Product
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="0 10px">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Images</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Sizes</TableCell>
                  <TableCell>Colors</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount(%)</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Is Visible?</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productsLoading && (
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {products &&
                  products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          src={`${baseURL}/${product.images[0]}`}
                          alt=""
                          height="100px"
                          width="85px"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>
                        <Box display="flex" gap="2px">
                          {product.sizes.map((size) => (
                            <Chip key={size} label={size} />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          gap="2px"
                          maxWidth="110px"
                          overflow="auto"
                        >
                          {product.colors.map((color) => (
                            <CircleIcon key={color} sx={{ fill: color }} />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        {product.discount_percent > 0
                          ? `${product.discount_percent}%`
                          : "None"}
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{product.isVisible ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() =>
                            navigate(`/admin/edit-product/${product._id}`)
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenDialog(product._id)}
                        >
                          <DeleteIcon color="primary" />
                        </IconButton>
                        <Dialog
                          open={deleteId === product._id}
                          onClose={handleCloseDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            <strong>Delete Product</strong>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete this product?
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
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                {!productsLoading && products.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={12}>
                      <Typography variant="h6">No Products Found...</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductsGrid;
