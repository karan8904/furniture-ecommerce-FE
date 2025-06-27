import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Footer from "../components/Footer";
import InfoComponent from "../components/InfoComponent";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { showSnackbar } from "../slices/snackbarSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../slices/userSlice";
import { createAddress, deleteAddress, getAddresses } from "../slices/addressSlice";
import { Link, useNavigate } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

const UserProfile = () => {
  const [showAddress, setShowAddress] = useState("Home");
  const [deleteId, setDeleteId] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteAddressLoading = useSelector((state) => state.address.deleteAddress.loading)
  const user = useSelector((state) => state.user.getCurrentUser.user);

  const homeAddress = useSelector(
    (state) => state.address.getAddresses.addresses.homeAddress
  );
  const officeAddress = useSelector(
    (state) => state.address.getAddresses.addresses.officeAddress
  );
  const otherAddresses = useSelector(
    (state) => state.address.getAddresses.addresses.otherAddresses
  );

  useEffect(() => {
    const get = async () => {
      if (user._id) await dispatch(getAddresses(user._id)).unwrap();
    };
    get();
  }, [user]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    phone: Yup.number()
      .typeError("Phone must be in number")
      .required("This field is required."),
  });

  const handleOnSubmit = async () => {
    try {
      await dispatch(editUser(formik.values)).unwrap();
      dispatch(showSnackbar({ message: "Details updated successfully." }));
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema,
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
    onSubmit: () => {
      handleOnSubmit();
    },
  });
  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  };

  const handleOnDelete = async() => {
    try {
      await dispatch(deleteAddress(deleteId)).unwrap()
      await dispatch(getAddresses(user._id)).unwrap()
      setDeleteId(null)
      dispatch(showSnackbar({ message: "Address Deleted Successfully." }))
    } catch (error) {
      
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
            Profile
          </Typography>
        </Breadcrumbs>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container margin="60px 30px" rowSpacing={3}>
          <Grid size={12}>
            <Typography variant="h5" fontWeight="550" textAlign={"center"}>
              Manage Your Profile
            </Typography>
          </Grid>
          <Grid
            container
            size={12}
            display="flex"
            justifyContent="center"
            columnSpacing={5}
          >
            <Grid size={4}>
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                error={formik.touched.firstName && formik.errors.firstName}
                helperText={
                  formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : ""
                }
                fullWidth
              />
            </Grid>
            <Grid size={4}>
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                error={formik.touched.lastName && formik.errors.lastName}
                helperText={
                  formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : ""
                }
                fullWidth
              />
            </Grid>
            <Grid size={8}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
                disabled
                fullWidth
              />
            </Grid>
            <Grid size={8}>
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phone}
                sx={numberFieldStyling}
                type="number"
                error={formik.touched.phone && formik.errors.phone}
                helperText={
                  formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ""
                }
                fullWidth
              />
            </Grid>
            <Grid size={8}>
              <Button variant="contained" type="submit">
                Save Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Grid container margin="60px 30px" rowSpacing={3}>
        <Grid size={12}>
          <Typography variant="h5" fontWeight="550">
            Addresses
          </Typography>
        </Grid>
        <Grid
          container
          size={12}
          columnSpacing={1}
          display="flex"
          justifyContent="center"
        >
          <Grid size={12}>
            <Box display="flex" alignItems="center" columnGap={1}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="Home"
                  control={
                    <Radio
                      onClick={() => setShowAddress("Home")}
                      checked={showAddress === "Home"}
                    />
                  }
                  label="Home"
                />
                <FormControlLabel
                  value="Office"
                  control={
                    <Radio
                      onClick={() => setShowAddress("Office")}
                      checked={showAddress === "Office"}
                    />
                  }
                  label="Office"
                />
                <FormControlLabel
                  value="Other"
                  control={
                    <Radio
                      onClick={() => setShowAddress("Other")}
                      checked={showAddress === "Other"}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
            </Box>
          </Grid>
          <Grid size={12} display={showAddress === "Home" ? "flex" : "none"}>
            {showAddress === "Home" &&
              (homeAddress ? (
                <Box>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <HomeIcon />
                    <Typography variant="h6">Home Address</Typography>
                  </Box>
                  <Box
                    marginTop="15px"
                    border="1px solid #acb2b1"
                    borderRadius="10px"
                    width="200px"
                  >
                    <Box margin="10px 15px">
                      <Typography fontSize="18px">
                        {homeAddress.firstName} {homeAddress.lastName}
                      </Typography>
                      <Typography fontSize="18px">
                        {homeAddress.streetAddress} {homeAddress.city}
                      </Typography>
                      <Typography fontSize="18px">
                        {homeAddress.state} {homeAddress.country}
                      </Typography>
                      <Typography fontSize="18px">
                        {homeAddress.zipCode}
                      </Typography>
                      <Typography fontSize="18px">
                        {homeAddress.email}
                      </Typography>
                      <Typography fontSize="18px">
                        {homeAddress.phone}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() =>
                          navigate(`/edit-address/${homeAddress._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() => setDeleteId(homeAddress._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" marginTop="30px">
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate("/add-address/1")
                    }
                  >
                    Add Home Adresss
                  </Button>
                </Box>
              ))}
          </Grid>
          <Grid size={12} display={showAddress === "Office" ? "flex" : "none"}>
            {showAddress === "Office" &&
              (officeAddress ? (
                <Box>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <BusinessIcon />
                    <Typography variant="h6">Office Address</Typography>
                  </Box>
                  <Box
                    marginTop="15px"
                    border="1px solid #acb2b1"
                    borderRadius="10px"
                    width="200px"
                  >
                    <Box margin="10px 15px">
                      <Typography fontSize="18px">
                        {officeAddress.firstName} {officeAddress.lastName}
                      </Typography>
                      <Typography fontSize="18px">
                        {officeAddress.streetAddress} {officeAddress.city}
                      </Typography>
                      <Typography fontSize="18px">
                        {officeAddress.state} {officeAddress.country}
                      </Typography>
                      <Typography fontSize="18px">
                        {officeAddress.zipCode}
                      </Typography>
                      <Typography fontSize="18px">
                        {officeAddress.email}
                      </Typography>
                      <Typography fontSize="18px">
                        {officeAddress.phone}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() =>
                          navigate(`/edit-address/${officeAddress._id}`)
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() => setDeleteId(officeAddress._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box display="flex" justifyContent="center" marginTop="30px">
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/add-address/2")}
                  >
                    Add Office Adresss
                  </Button>
                </Box>
              ))}
          </Grid>
          <Grid
            container
            size={12}
            display={showAddress === "Other" ? "flex" : "none"}
          >
            {showAddress === "Other" &&
              otherAddresses &&
              Object.keys(otherAddresses).length > 0 &&
              otherAddresses.map((address) => (
                <Box key={address._id}>
                  <Box display="flex" alignItems="center" columnGap={1}>
                    <OtherHousesIcon />
                    <Typography variant="h6">
                      {address.addressName} Address
                    </Typography>
                  </Box>
                  <Box
                    marginTop="15px"
                    border="1px solid #acb2b1"
                    borderRadius="10px"
                    width="200px"
                  >
                    <Box margin="10px 15px">
                      <Typography fontSize="18px">
                        {address.firstName} {address.lastName}
                      </Typography>
                      <Typography fontSize="18px">
                        {address.streetAddress} {address.city}
                      </Typography>
                      <Typography fontSize="18px">
                        {address.state} {address.country}
                      </Typography>
                      <Typography fontSize="18px">{address.zipCode}</Typography>
                      <Typography fontSize="18px">{address.email}</Typography>
                      <Typography fontSize="18px">{address.phone}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() => navigate(`/edit-address/${address._id}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        sx={{ textTransform: "initial", mt: "5px" }}
                        onClick={() => setDeleteId(address._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            <Dialog
              open={deleteId}
              onClose={() => setDeleteId(null)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                <strong>Delete Address</strong>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this address?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteId(null)} variant="outlined">
                  Cancel
                </Button>
                <Button
                  loading={deleteAddressLoading}
                  onClick={() => handleOnDelete()}
                  variant="contained"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default UserProfile;
