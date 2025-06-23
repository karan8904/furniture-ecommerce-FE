import React, { useState, useEffect } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../slices/categorySlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router";
import { deleteCategory } from "../../slices/categorySlice";
import { showSnackbar } from "../../slices/snackbarSlice";

const CategoriesGrid = () => {
  const [deleteId, setDeleteId] = useState(null);
  const baseURL = import.meta.env.VITE_BASEURL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(
    (state) => state.category.getCategories.categories
  );

  const categoriesLoading = useSelector(
    (state) => state.category.getCategories.loading
  );
  const deleteLoading = useSelector(
    (state) => state.category.deleteCategory.loading
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleOpenDialog = (id) => {
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setDeleteId(null);
  };

  const handleOnDelete = async () => {
    try {
      await dispatch(deleteCategory(deleteId)).unwrap();
      dispatch(showSnackbar({ message: "Category Deleted Successfully." }));
      setDeleteId(null);
      await dispatch(getCategories()).unwrap();
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
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                All Categories
              </Typography>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => navigate("/admin/add-category")}
              >
                Add New Category
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="20px 10px">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoriesLoading && (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                )}
                {categories &&
                  categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">
                        <img
                          src={`${baseURL}/${category.imageURL}`}
                          height="120px"
                          width="100px"
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="right">{category.name}</TableCell>
                      <TableCell>
                        {category.description}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete">
                          <EditIcon
                            color="primary"
                            onClick={() =>
                              navigate(`/admin/edit-category/${category._id}`)
                            }
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="delete">
                          <DeleteIcon
                            color="primary"
                            onClick={() => handleOpenDialog(category._id)}
                          />
                        </IconButton>
                        <Dialog
                          open={deleteId === category._id}
                          onClose={handleCloseDialog}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            <strong>Delete Category</strong>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete this category?
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
                {!categoriesLoading && categories.length === 0 && (
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      No Categories Found...
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

export default CategoriesGrid;
