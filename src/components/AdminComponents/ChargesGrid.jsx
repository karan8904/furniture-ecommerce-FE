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
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderStatus,
  filterOrders,
  getOrders,
  searchOrders,
} from "../../slices/orderSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CircleIcon from "@mui/icons-material/Circle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import { addCharge, deleteCharge, editCharge, getCharges } from "../../slices/chargesSlice";
import * as Yup from "yup";
import { useFormik } from "formik";

const ChargesGrid = () => {
  const [addNewCharge, setAddNewCharge] = useState(false);
  const [editChargeId, setEditChargeId] = useState(null);
  const [deleteId, setDeleteId] = useState(null)
  const dispatch = useDispatch();
  const { charges, loading } = useSelector((state) => state.charge.getCharges);
  const addChargeLoading = useSelector(
    (state) => state.charge.addCharge.loading
  );
  const editChargeLoading = useSelector(
    (state) => state.charge.editCharge.loading
  );
  const deleteLoading = useSelector((state) => state.charge.deleteCharge.loading)
  useEffect(() => {
    dispatch(getCharges());
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is requied."),
    chargePercent: Yup.number().min(0).max(15, "Maximum charge is 15%"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      name: "",
      chargePercent: 0,
    },
    onSubmit: async () => {
      try {
        await dispatch(addCharge(formik.values)).unwrap();
        dispatch(showSnackbar({ message: "Charge Added Successfully." }));
        setAddNewCharge(false);
      } catch (error) {
        dispatch(showSnackbar({ severity: "error", message: error }));
      }
    },
  });

  const editFormik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      id: "",
      name: "",
      chargePercent: 0,
    },
    onSubmit: async () => {
      try {
        await dispatch(editCharge(editFormik.values)).unwrap();
        dispatch(showSnackbar({ message: "Charge Edited Successfully." }));
        setEditChargeId(null);
      } catch (error) {
        dispatch(showSnackbar({ severity: "error", message: error }));
      }
    },
  });

  const handleOnDelete = async() => {
    try {
      await dispatch(deleteCharge(deleteId)).unwrap()
      dispatch(showSnackbar({ message: "Charge Deleted Successfully." }))
      setDeleteId(null)
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }))
    }
  }

  return (
    <Grid container>
      <Grid container size={12}>
        <Grid size={8}>
          <Box display="flex">
            <Typography fontSize="25px" fontWeight="550">
              All Charges
            </Typography>
          </Box>
        </Grid>
        <Grid size={4}>
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={() => setAddNewCharge(true)}>
              Add New Charge
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid size={12} margin="17px 0">
        <Divider />
      </Grid>
      <Grid size={12} margin="0 10px">
        <TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Charge(%)</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {charges?.length !== 0 &&
                charges?.map((charge, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{charge.name}</TableCell>
                    <TableCell>{charge.chargePercent}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setEditChargeId(charge._id);
                          editFormik.setFieldValue("id", charge._id);
                          editFormik.setFieldValue("name", charge.name);
                          editFormik.setFieldValue(
                            "chargePercent",
                            charge.chargePercent
                          );
                        }}
                      >
                        <EditIcon color="primary" />
                        {/* EDIT CHARGE DIALOG */}
                      </IconButton>
                      <Dialog
                        open={editChargeId === charge._id}
                        onClose={() => setEditChargeId(null)}
                        aria-labelledby="edit-charge-dialog-title"
                        aria-describedby="edit-charge-dialog-description"
                        maxWidth="lg"
                      >
                        <DialogTitle id="edit-charge-dialog-title">
                          <strong>Edit Charge</strong>
                        </DialogTitle>
                        <form onSubmit={editFormik.handleSubmit}>
                          <DialogContent>
                            <Box display="flex" justifyContent="center">
                              <Box>
                                <Stack
                                  width={{ xs: 320, sm: 350, md: 400 }}
                                  rowGap={2}
                                >
                                  <TextField
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    color="primary"
                                    value={editFormik.values.name}
                                    onChange={editFormik.handleChange}
                                    error={
                                      editFormik.touched.name &&
                                      editFormik.errors.name
                                    }
                                    helperText={
                                      editFormik.touched.name &&
                                      editFormik.errors.name
                                        ? editFormik.errors.name
                                        : ""
                                    }
                                  />
                                  <TextField
                                    id="chargePercent"
                                    label="Charge Percent"
                                    variant="outlined"
                                    type="number"
                                    onChange={editFormik.handleChange}
                                    value={editFormik.values.chargePercent}
                                    error={
                                      editFormik.touched.chargePercent &&
                                      editFormik.errors.chargePercent
                                    }
                                    helperText={
                                      editFormik.touched.chargePercent &&
                                      editFormik.errors.chargePercent
                                        ? editFormik.errors.chargePercent
                                        : ""
                                    }
                                  />
                                </Stack>
                              </Box>
                            </Box>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              loading={editChargeLoading}
                              variant="contained"
                              type="submit"
                              autoFocus
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => setEditChargeId(null)}
                              variant="outlined"
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </form>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => setDeleteId(charge._id)}>
                        <DeleteIcon color="primary" />
                      </IconButton>
                      <Dialog
                        open={deleteId === charge._id}
                        onClose={() => setDeleteId(null)}
                        aria-labelledby="delete-dialog-title"
                        aria-describedby="delete-dialog-description"
                      >
                        <DialogTitle id="delete-dialog-title">
                          <strong>Delete Charge</strong>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="delete-dialog-description">
                            Are you sure you want to delete this charge?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={() => setDeleteId(null)}
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
              {!loading && charges?.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <Typography variant="h6">No Charges Found...</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* ADD CHARGE DIALOG */}
      <Dialog
        open={addNewCharge}
        onClose={() => setAddNewCharge(!addNewCharge)}
        aria-labelledby="add-charge-dialog-title"
        aria-describedby="add-charge-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="add-charge-dialog-title">
          <strong>Add New Charge</strong>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box display="flex" justifyContent="center">
              <Box>
                <Stack width={{ xs: 320, sm: 350, md: 400 }} rowGap={2}>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    color="primary"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                    helperText={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : ""
                    }
                  />
                  <TextField
                    id="chargePercent"
                    label="Charge Percent"
                    variant="outlined"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.chargePercent}
                    error={
                      formik.touched.chargePercent &&
                      formik.errors.chargePercent
                    }
                    helperText={
                      formik.touched.chargePercent &&
                      formik.errors.chargePercent
                        ? formik.errors.chargePercent
                        : ""
                    }
                  />
                </Stack>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              loading={addChargeLoading}
              variant="contained"
              type="submit"
              autoFocus
            >
              Add
            </Button>
            <Button onClick={() => setAddNewCharge(false)} variant="outlined">
              Close
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  );
};

export default ChargesGrid;
