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
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router";

const CheckoutForm = () => {
  const [paymode, setPayMode] = useState("Bank");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalAmount } = useSelector((state) => state.cart.checkoutData.data)
  const user = useSelector((state) => state.user.getCurrentUser.user)

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    companyName: Yup.string(),
    country: Yup.string().required("This field is required"),
    streetAddress: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    province: Yup.string().required("This field is required"),
    zipCode: Yup.number().required("This field is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    phone: Yup.number()
      .typeError("Phone must be in number")
      .required("This field is required."),
    additionalInfo: Yup.string(),
    payMode: Yup.string().required("This field is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      companyName: "",
      country: "",
      streetAddress: "",
      city: "",
      province: "",
      zipCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
      payMode: paymode,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(placeOrder(values));
      formik.resetForm();
      navigate("/");
    },
  });

  const countries = ["India", "Japan", "USA"];
  const provinces = [
    "Northern Province",
    "Eastern Province",
    "Western Province",
    "Southern Province",
  ];
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
      <Box sx={{ marginTop: "30px", marginBottom: "80px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container display="flex" justifyContent="space-evenly">
            <Grid size={styling.firstGridSize}>
              <Typography fontSize="32px" fontWeight="600">
                Billing Details
              </Typography>
              <Grid
                container
                display="flex"
                justifyContent="space-between"
                columnSpacing={2}
                rowSpacing={2}
                marginTop="30px"
              >
                <Grid size={6}>
                  <TextField
                    id="firstName"
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
                <Grid size={6}>
                  <TextField
                    id="lastName"
                    label="Last Name"
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
                <Grid size={12}>
                  <TextField
                    id="companyName"
                    label="Company Name (Optional)"
                    variant="outlined"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    fullWidth
                    slotProps={styling.textFieldBorderRadius}
                  />
                </Grid>
                <Grid size={12}>
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
                <Grid size={12}>
                  <TextField
                    id="streetAddress"
                    label="Street Address"
                    variant="outlined"
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.streetAddress &&
                      formik.errors.streetAddress
                    }
                    helperText={
                      formik.touched.streetAddress &&
                      formik.errors.streetAddress
                        ? formik.errors.streetAddress
                        : ""
                    }
                    fullWidth
                    slotProps={styling.textFieldBorderRadius}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="city"
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
                <Grid size={12}>
                  <Autocomplete
                    disablePortal
                    options={provinces}
                    value={
                      provinces.find(
                        (option) => option === formik.values.province
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      formik.setFieldValue(
                        "province",
                        newValue ? newValue : ""
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="province"
                        label="Province"
                        variant="outlined"
                        error={
                          formik.touched.province && formik.errors.province
                        }
                        helperText={
                          formik.touched.province && formik.errors.province
                            ? formik.errors.province
                            : ""
                        }
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "12px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    id="zipCode"
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
                <Grid size={12}>
                  <TextField
                    id="phone"
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
                <Grid size={12}>
                  <TextField
                    id="email"
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
                <Grid size={12}>
                  <TextField
                    id="additionalInfo"
                    label="Additional Info"
                    variant="outlined"
                    value={formik.values.additionalInfo}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.additionalInfo &&
                      formik.errors.additionalInfo
                    }
                    helperText={
                      formik.touched.additionalInfo &&
                      formik.errors.additionalInfo
                        ? formik.errors.additionalInfo
                        : ""
                    }
                    fullWidth
                    slotProps={styling.textFieldBorderRadius}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={styling.secondGridSize}>
              <Box margin="50px 40px">
                {products && (<>
                                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop="20px"
                >
                  <Typography fontSize="24px" fontWeight="550">
                    Product
                  </Typography>
                  <Typography fontSize="24px" fontWeight="550">
                    Subtotal
                  </Typography>
                </Box>
                {products &&
                  products.map((product) => (
                    <Box
                      key={product._id}
                      display="flex"
                      justifyContent="space-between"
                      marginTop="20px"
                    >
                      <Box display="flex">
                        <Typography
                          fontSize="14px"
                          color="secondary"
                          fontWeight="400"
                        >
                          {product.productID.name}
                        </Typography>
                        <Typography fontSize="14px" marginLeft={2}>
                          x {product.quantity}
                        </Typography>
                      </Box>
                      <Typography fontSize="14px" fontWeight="300">
                        Rs. {product.price * product.quantity}
                      </Typography>
                    </Box>
                  ))}

                {/* <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop="20px"
                >
                  <Typography fontSize="14px" fontWeight="400">
                    Subtotal
                  </Typography>
                  <Typography fontSize="14px" fontWeight="300">
                    Rs. 250,000.00
                  </Typography>
                </Box> */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop="20px"
                >
                  <Typography fontSize="16px">Total</Typography>
                  <Typography fontSize="20px" fontWeight="600" color="primary">
                    Rs. {totalAmount}
                  </Typography>
                </Box>
                </>)}
                <Divider sx={{ margin: "20px 0" }} />
                <Box>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-methods"
                      defaultValue="direct-bank-transfer"
                      name="payment-methods"
                    >
                      <FormControlLabel
                        value="direct-bank-transfer"
                        control={<Radio onClick={() => setPayMode("Bank")} />}
                        label="Direct Bank Transfer"
                      />
                      {paymode === "Bank" ? (
                        <Typography fontSize="14px" color="secondary">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <FormControlLabel
                        value="cash-on-delivery"
                        control={<Radio onClick={() => setPayMode("COD")} />}
                        label="Cash on Delivery"
                      />
                      {paymode === "COD" ? (
                        <Typography fontSize="14px" color="secondary">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </Typography>
                      ) : (
                        <></>
                      )}
                      <FormControlLabel
                        value="Other"
                        control={<Radio onClick={() => setPayMode("Other")} />}
                        label="Other"
                      />
                      {paymode === "Other" ? (
                        <Typography fontSize="14px" color="secondary">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </Typography>
                      ) : (
                        <></>
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box>
                  <Typography>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our{" "}
                    <strong>privacy policy</strong>.
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" marginTop="30px">
                  <Button
                    type="submit"
                    variant="outlined"
                    color="#000"
                    sx={styling.buttonStyle}
                  >
                    Place Order
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
};

export default CheckoutForm;
