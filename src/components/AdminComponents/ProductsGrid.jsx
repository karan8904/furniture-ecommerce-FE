import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Box, Button, Divider, Chip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../slices/productSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductsGrid = () => {
  const [deleteId, setDeleteId] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.getProducts.products)
  const deleteLoading = useSelector((state) => state.product.deleteProduct.loading)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const handleOpenDialog = (id) => {
    setDeleteId(id);
  };
  
  const handleCloseDialog = () => {
    setDeleteId(null);
  };

  const handleOnDelete = async() => {
    try {
      await dispatch(deleteProduct(deleteId)).unwrap()
      dispatch(showSnackbar({ message: "Product Deleted Successfully." }))
      await dispatch(getProducts()).unwrap()
      setDeleteId(null)
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }))
      setDeleteId(null)
    }
  }

  return (
    <>
    <Grid container>
        <Grid container size={12}>
          <Grid size={8}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                All Products
              </Typography>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={() => navigate("/admin/add-product")}>Add New Product</Button>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="0 10px">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Images</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Sizes</TableCell>
                  <TableCell align="left">Colors</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="right">
                      <Box display="flex" gap="20px" overflow="auto" maxWidth="180px">
                        {product.images.map((image) => (
                          <img key={image} src={`http://localhost:5000/${image}`} alt="" height="100px" width="85px" />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.category.name}</TableCell>
                    <TableCell align="left">
                      <Box display="flex" gap="2px">
                        {product.sizes.map((size) => (
                          <Chip key={size} label={size} />  
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" gap="2px" maxWidth="110px" overflow="auto">
                        {product.colors.map((color) => (
                          <CircleIcon key={color} sx={{ fill: color }} />                        
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="left">₹{product.price}</TableCell>
                    <TableCell align="left">
                        <IconButton aria-label="delete">
                          <EditIcon color="primary" onClick={() => navigate(`/adming/edit-product/${product._id}`)} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton aria-label="delete">
                          <DeleteIcon color="primary" onClick={() => handleOpenDialog(product._id)} />
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
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button loading={deleteLoading} onClick={() => handleOnDelete() } autoFocus>
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      
    </>
  );
};

export default ProductsGrid;
