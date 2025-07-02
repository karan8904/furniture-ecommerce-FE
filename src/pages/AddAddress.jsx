import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  Autocomplete,
  FormLabel,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/orderSlice";
import { useNavigate, useParams } from "react-router";
import {
  createAddress,
  editAddress,
  getAddresses,
  getSingleAddress,
} from "../slices/addressSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { resetCart } from "../slices/cartSlice";

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const addressType = params.addressType;
  const user = useSelector((state) => state.user.getCurrentUser.user);

  useEffect(() => {
    if (addressType) {
      if (addressType == 1) formik.setFieldValue("addressType", "Home");
      if (addressType == 2) formik.setFieldValue("addressType", "Office");
      if (addressType == 3) formik.setFieldValue("addressType", "Other");
    }
  }, [addressType]);

  const validationSchema = Yup.object().shape({
    addressName: Yup.string().when("addressType", {
      is: (value) => value === "Other",
      then: () => Yup.string().required("This field is required."),
      otherwise: () => Yup.string().notRequired(),
    }),
    addressType: Yup.string().required("This field is required."),
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    country: Yup.string().required("This field is required"),
    streetAddress: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    zipCode: Yup.number().required("This field is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    phone: Yup.number()
      .typeError("Phone must be in number")
      .required("This field is required."),
  });

  const handleCreateAddress = async () => {
    try {
      await dispatch(createAddress({ addressData: formik.values })).unwrap();
      dispatch(showSnackbar({ message: "Address Saved." }));
      navigate("/profile");
    } catch (error) {
      console.log("error:", error);
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      addressName: "",
      addressType: addressType || "",
      userID: user?._id,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
    validationSchema,
    onSubmit: () => {
      handleCreateAddress();
    },
  });

  const countries = ["India", "Japan", "USA"];
  const styling = {
    firstGridSize: { xs: 10, sm: 4, md: 3 },
    secondGridSize: { xs: 12, sm: 6, md: 5 },
    textFieldBorderRadius: {
      input: {
        style: {
          borderRadius: "10px",
        },
      },
    },
    buttonStyle: { borderRadius: "15px", padding: "14px 45px" },
  };
  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  };

  return (
    <>
      <Grid container marginTop="20px">
        <Grid container size={12}>
          <Grid size={12}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                Edit Address
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="10px 10px">
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              display="flex"
              justifyContent="center"
              columnSpacing={2}
              rowSpacing={2}
              marginTop="30px"
            >
              <Grid size={5}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && formik.errors.firstName}
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && formik.errors.lastName}
                  helperText={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              {formik.values.addressType && formik.values.addressType === "Other" && (
                <Grid size={10}>
                  <TextField
                    id="addressName"
                    name="addressName"
                    label="Address Name"
                    variant="outlined"
                    value={formik.values.addressName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.addressName && formik.errors.addressName
                    }
                    helperText={
                      formik.touched.addressName && formik.errors.addressName
                        ? formik.errors.addressName
                        : ""
                    }
                    fullWidth
                    slotProps={styling.textFieldBorderRadius}
                  />
                </Grid>
              )}
              <Grid size={5}>
                <TextField
                  id="streetAddress"
                  name="streetAddress"
                  label="Street Address"
                  variant="outlined"
                  value={formik.values.streetAddress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.streetAddress && formik.errors.streetAddress
                  }
                  helperText={
                    formik.touched.streetAddress && formik.errors.streetAddress
                      ? formik.errors.streetAddress
                      : ""
                  }
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="city"
                  name="city"
                  label="Town / City"
                  variant="outlined"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && formik.errors.city}
                  helperText={
                    formik.touched.city && formik.errors.city
                      ? formik.errors.city
                      : ""
                  }
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              <Grid size={4}>
                <TextField
                  id="state"
                  name="state"
                  label="State"
                  variant="outlined"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && formik.errors.state}
                  helperText={
                    formik.touched.state && formik.errors.state
                      ? formik.errors.state
                      : ""
                  }
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid size={4}>
                <Autocomplete
                  disablePortal
                  options={countries}
                  value={
                    countries.find(
                      (option) => option === formik.values.country
                    ) || null
                  }
                  onChange={(event, newValue) => {
                    formik.setFieldValue("country", newValue ? newValue : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="country-region"
                      name="country"
                      label="Country / Region"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.country && formik.errors.country}
                      helperText={
                        formik.touched.country && formik.errors.country
                          ? formik.errors.country
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={2}>
                <TextField
                  id="zipCode"
                  name="zipCode"
                  label="ZIP Code"
                  type="number"
                  variant="outlined"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={formik.touched.zipCode && formik.errors.zipCode}
                  helperText={
                    formik.touched.zipCode && formik.errors.zipCode
                      ? formik.errors.zipCode
                      : ""
                  }
                  sx={numberFieldStyling}
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="number"
                  variant="outlined"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && formik.errors.phone}
                  helperText={
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : ""
                  }
                  sx={numberFieldStyling}
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              <Grid size={5}>
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && formik.errors.email}
                  helperText={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                  fullWidth
                  slotProps={styling.textFieldBorderRadius}
                />
              </Grid>
              {/* <Grid size={12}>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Default Address"
                    />
                  </Grid> */}
              <Grid container size={10} columnSpacing={2}>
                <Button variant="contained" type="submit">
                  Add
                </Button>
                <Button variant="outlined" onClick={() => navigate("/profile")}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddAddress;
