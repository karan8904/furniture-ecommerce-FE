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
import { useNavigate } from "react-router";
import { createAddress, getAddresses } from "../slices/addressSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { resetCart } from "../slices/cartSlice";

const CheckoutForm = () => {
  const [addressType, setAddressType] = useState("Home");
  const [currentAddress, setCurrentAddress] = useState({});
  const [paymode, setPayMode] = useState("Bank");
  const [addNewAddress, setAddNewAddress] = useState({
    isEnable: false,
    addressType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalAmount } = useSelector(
    (state) => state.cart.checkoutData.data
  );

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
      setCurrentAddress(homeAddress);
    };
    get();
  }, [user]);

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

  const orderPlaceValidationSchema = Yup.object().shape({
    userID: Yup.string().required("Please Login or Register."),
    products: Yup.array().required("No Products Found."),
    totalAmount: Yup.number().required("Required."),
    address: Yup.object().required("Please select address."),
    paymentMode: Yup.string().required("Please select payment mode.")
  })

  const handleCreateAddress = async () => {
    try {
      await dispatch(createAddress({ addressData: formik.values })).unwrap();
      dispatch(showSnackbar({ message: "Address Saved." }));
      setAddNewAddress({ isEnable: false, addressType: "" });
      setAddressType("Home");
      dispatch(getAddresses(user._id));
    } catch (error) {
      console.log("error:", error);
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      addressName: "",
      addressType: addNewAddress.addressType,
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

  const handlePlaceOrder = async() => {
    try {
      await dispatch(placeOrder(placeOrderForm.values)).unwrap()
      dispatch(showSnackbar({ message: "Order Placed Successfully." }))
      navigate("/")
      dispatch()
    } catch (error) {
      
    }
  }

  const placeOrderForm = useFormik({
    enableReinitialize: true,
    validationSchema: orderPlaceValidationSchema,
    initialValues: {
      userID: user?._id,
      products: products || [],
      totalAmount: totalAmount || 0,
      address: currentAddress || {},
      paymentMode: paymode,
    },
    onSubmit: () => {
      handlePlaceOrder()
    }
  })

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

  const handleOnSelectAddress = (type, address) => {
    setAddressType(type);
    setCurrentAddress(address);
  };

  return (
    <>
      <Box sx={{ marginTop: "30px", marginBottom: "80px" }}>
        <Grid container display="flex" justifyContent="space-evenly">
          <Grid size={styling.firstGridSize} maxHeight="100vh" overflow="auto">
            <Typography fontSize="32px" fontWeight="600">
              Billing Details
            </Typography>
            {!addNewAddress.isEnable && (
              <>
                <Grid marginTop="20px">
                  <FormControl fullWidth>
                    <InputLabel id="otherAddressType">
                      Select Address
                    </InputLabel>
                    <Select
                      labelId="otherAddressType"
                      id="demo-simple-select"
                      name="addressName"
                      label="Select Address"
                      value={addressType}
                    >
                      <MenuItem
                        value="Home"
                        onClick={() =>
                          handleOnSelectAddress("Home", homeAddress)
                        }
                      >
                        Home
                      </MenuItem>
                      <MenuItem
                        value="Office"
                        onClick={() =>
                          handleOnSelectAddress("Office", officeAddress)
                        }
                      >
                        Office
                      </MenuItem>
                      {otherAddresses &&
                        otherAddresses.map((address) => (
                          <MenuItem
                            value={address.addressName}
                            onClick={() =>
                              handleOnSelectAddress(
                                `${address.addressName}`,
                                address
                              )
                            }
                          >
                            {address.addressName}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                {addressType === "Home" && (
                  <Grid container marginTop="20px">
                    <Grid size={12}>
                      <Typography variant="h6" fontWeight="550">
                        Home Address
                      </Typography>
                      {homeAddress ? (
                        <>
                          <Box
                            marginTop="15px"
                            marginLeft="25px"
                            border="1px solid #acb2b1"
                            borderRadius="10px"
                          >
                            <Box margin="10px 15px" sx={{ color: "#acb2b1" }}>
                              <Typography>
                                {homeAddress.firstName} {homeAddress.lastName}
                              </Typography>
                              <Typography>
                                {homeAddress.streetAddress} {homeAddress.city}
                              </Typography>
                              <Typography>
                                {homeAddress.state} {homeAddress.country}
                              </Typography>
                              <Typography>{homeAddress.zipCode}</Typography>
                              <Typography>{homeAddress.email}</Typography>
                              <Typography>{homeAddress.phone}</Typography>
                            </Box>
                          </Box>
                          <Box marginLeft="25px">
                            <Button
                              sx={{ textTransform: "initial", mt: "5px" }}
                            >
                              Change Address
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="center"
                          marginTop="30px"
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setAddNewAddress({
                                isEnable: true,
                                addressType: "Home",
                              })
                            }
                            fullWidth
                          >
                            Add Home Adresss
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                )}
                {addressType === "Office" && (
                  <Grid container marginTop="20px">
                    <Grid size={12}>
                      <Typography variant="h6" fontWeight="550">
                        Office Address
                      </Typography>
                      {officeAddress ? (
                        <>
                          <Box
                            marginTop="15px"
                            marginLeft="25px"
                            border="1px solid #acb2b1"
                            borderRadius="10px"
                          >
                            <Box margin="10px 15px" sx={{ color: "#acb2b1" }}>
                              <Typography>
                                {officeAddress.firstName}{" "}
                                {officeAddress.lastName}
                              </Typography>
                              <Typography>
                                {officeAddress.streetAddress}{" "}
                                {officeAddress.city}
                              </Typography>
                              <Typography>
                                {officeAddress.state} {officeAddress.country}
                              </Typography>
                              <Typography>{officeAddress.zipCode}</Typography>
                              <Typography>{officeAddress.email}</Typography>
                              <Typography>{officeAddress.phone}</Typography>
                            </Box>
                          </Box>
                          <Box marginLeft="25px">
                            <Button
                              sx={{ textTransform: "initial", mt: "5px" }}
                            >
                              Change Address
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box
                          display="flex"
                          justifyContent="center"
                          marginTop="30px"
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setAddNewAddress({
                                isEnable: true,
                                addressType: "Office",
                              })
                            }
                            fullWidth
                          >
                            Add Office Adresss
                          </Button>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                )}
                {addressType !== "Home" && addressType !== "Office" && (
                  <Grid container marginTop="20px">
                    <Grid size={12}>
                      <Typography variant="h6" fontWeight="550">
                        {currentAddress.addressName} Address
                      </Typography>
                      {currentAddress ? (
                        <>
                          <Box
                            marginTop="15px"
                            marginLeft="25px"
                            border="1px solid #acb2b1"
                            borderRadius="10px"
                          >
                            <Box margin="10px 15px" sx={{ color: "#acb2b1" }}>
                              <Typography>
                                {currentAddress.firstName}{" "}
                                {currentAddress.lastName}
                              </Typography>
                              <Typography>
                                {currentAddress.streetAddress}{" "}
                                {currentAddress.city}
                              </Typography>
                              <Typography>
                                {currentAddress.state} {currentAddress.country}
                              </Typography>
                              <Typography>{currentAddress.zipCode}</Typography>
                              <Typography>{currentAddress.email}</Typography>
                              <Typography>{currentAddress.phone}</Typography>
                            </Box>
                          </Box>
                          <Box marginLeft="25px">
                            <Button
                              sx={{ textTransform: "initial", mt: "5px" }}
                            >
                              Change Address
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                )}

                <Grid>
                  <Box display="flex" justifyContent="center" marginTop="30px">
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setAddNewAddress({
                          isEnable: true,
                          addressType: "Other",
                        })
                      }
                      fullWidth
                    >
                      Add New Adresss
                    </Button>
                  </Box>
                </Grid>
              </>
            )}

            {addNewAddress.isEnable && (
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  display="flex"
                  justifyContent="space-between"
                  columnSpacing={2}
                  rowSpacing={2}
                  marginTop="30px"
                >
                  {addNewAddress.addressType === "Other" && (
                    <Grid size={12}>
                      <TextField
                        id="addressName"
                        name="addressName"
                        label="Address Name"
                        variant="outlined"
                        value={formik.values.addressName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.addressName &&
                          formik.errors.addressName
                        }
                        helperText={
                          formik.touched.addressName &&
                          formik.errors.addressName
                            ? formik.errors.addressName
                            : ""
                        }
                        fullWidth
                        slotProps={styling.textFieldBorderRadius}
                      />
                    </Grid>
                  )}
                  <Grid size={6}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstName && formik.errors.firstName
                      }
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
                  <Grid size={12}>
                    <TextField
                      id="streetAddress"
                      name="streetAddress"
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
                  <Grid size={12}>
                    <TextField
                      id="state"
                      name="state"
                      label="State"
                      variant="outlined"
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
                        formik.setFieldValue(
                          "country",
                          newValue ? newValue : ""
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="country-region"
                          name="country"
                          label="Country / Region"
                          variant="outlined"
                          fullWidth
                          error={
                            formik.touched.country && formik.errors.country
                          }
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
                  <Grid size={12}>
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
                  <Grid size={12}>
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
                  <Grid container size={12} columnSpacing={2}>
                    <Button variant="contained" type="submit">
                      Add
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setAddNewAddress({ isEnable: false, addressType: "" })
                      }
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Grid>

          <Grid size={styling.secondGridSize}>
            <Box margin="50px 40px">
              <form onSubmit={placeOrderForm.handleSubmit}>
                {products && (
                  <>
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
                      <Typography
                        fontSize="20px"
                        fontWeight="600"
                        color="primary"
                      >
                        Rs. {totalAmount}
                      </Typography>
                    </Box>
                  </>
                )}
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
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutForm;
