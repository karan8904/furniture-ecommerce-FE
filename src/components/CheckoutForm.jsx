import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Divider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { makePayment, placeOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router";
import { getAddresses } from "../slices/addressSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { resetCart } from "../slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { getCharges } from "../slices/chargesSlice";

const CheckoutForm = () => {
  const [addressType, setAddressType] = useState("Home");
  const [currentAddress, setCurrentAddress] = useState({});
  const stripeLoading = loadStripe(import.meta.env.VITE_STRIPE_KEY);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalAmount } = useSelector(
    (state) => state.cart.checkoutData.data
  );

  const user = useSelector((state) => state.user.getCurrentUser.user);
  const { homeAddress, officeAddress, otherAddresses } = useSelector((state) => state.address.getAddresses.addresses)

  const placeOrderLoading = useSelector((state) => state.order.placeOrder.loading)
  const charges = useSelector((state) => state.charge.getCharges.charges)
  const delivery = charges.find((charge) => charge.name === "Delivery Charge" )
  const deliveryChargePercent = delivery?.chargePercent > 0 ? delivery.chargePercent : 0
  useEffect(() => {
    const get = async () => {
      if (user?._id) {
        const result = await dispatch(getAddresses(user._id)).unwrap();
        setCurrentAddress(result.homeAddress);
        placeOrderForm.setFieldValue("address", result.homeAddress);
        dispatch(getCharges())
      }
    };
    get();
  }, [user]);

  const orderPlaceValidationSchema = Yup.object().shape({
    userID: Yup.string().required("Please Login or Register."),
    products: Yup.array().min(1).required("No Products Found."),
    totalAmount: Yup.number().required("Required."),
    address: Yup.object().required("Please select address."),
    paymentMode: Yup.string().required("Please select payment mode."),
  });

  const initiatePayment = async ({ orderID, products, platformCharges, totalAmount }) => {
    try {
      const stripe = await stripeLoading;
      localStorage.setItem("type", "order")
      const result = await dispatch(makePayment({ orderID, platformCharges, products, totalAmount })).unwrap();
      await stripe.redirectToCheckout({
        sessionId: result.id,
      });
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: "Payment Failed." }));
      navigate("/");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      if (placeOrderForm.values.paymentMode !== "COD") {
        const result = await dispatch(placeOrder(placeOrderForm.values)).unwrap()
        const { orderID, platformCharges, totalAmount } = result.order
        initiatePayment({ orderID, products, platformCharges, totalAmount });
      }
      else {
        await dispatch(placeOrder(placeOrderForm.values)).unwrap()
        dispatch(showSnackbar({ message: "Order placed successfully." }))
        dispatch(resetCart())
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      dispatch(showSnackbar({ message: "Cannot place the order. Try again." }));
    }
  };

  const placeOrderForm = useFormik({
    enableReinitialize: true,
    // validationSchema: orderPlaceValidationSchema,
    initialValues: {
      userID: user?._id,
      products: products || [],
      totalAmount: totalAmount || 0,
      address: currentAddress || {},
      paymentMode: "Bank",
      paymentID: "",
      paymentStatus: "Pending",
    },
    onSubmit: (values) => {
      try {
        if (!values.address || Object.keys(values.address).length === 0)
          dispatch(
            showSnackbar({
              severity: "error",
              message: "Please add address to place order",
            })
          );
        else if (values.products?.length === 0 || !values.userID)
          dispatch(
            showSnackbar({
              severity: "error",
              message: "Cannot place order. Try again later",
            })
          );
        else handlePlaceOrder();
      } catch (error) {
        console.log(error);
        dispatch(
          showSnackbar({
            severity: "error",
            message: "Cannot place order. Try again later",
          })
        );
      }
    },
  });

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

  const handleOnSelectAddress = (type, address) => {
    setAddressType(type);
    setCurrentAddress(address);
    placeOrderForm.setValues("address", address);
  };

  return (
    <>
      <Box sx={{ marginTop: "30px", marginBottom: "80px" }}>
        <Grid container display="flex" justifyContent="space-evenly">
          <Grid size={styling.firstGridSize} maxHeight="100vh" overflow="auto">
            <Typography fontSize="32px" fontWeight="600">
              Billing Details
            </Typography>
            <Grid marginTop="20px">
              <FormControl fullWidth>
                <InputLabel id="otherAddressType">Select Address</InputLabel>
                <Select
                  labelId="otherAddressType"
                  id="demo-simple-select"
                  name="addressName"
                  label="Select Address"
                  value={addressType}
                >
                  <MenuItem
                    value="Home"
                    onClick={() => handleOnSelectAddress("Home", homeAddress)}
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
                          onClick={() => navigate("/profile")}
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
                        onClick={() => navigate("/profile")}
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
                            {officeAddress.firstName} {officeAddress.lastName}
                          </Typography>
                          <Typography>
                            {officeAddress.streetAddress} {officeAddress.city}
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
                          onClick={() => navigate("/profile")}
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
                        onClick={() => navigate("/profile")}
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
                            {currentAddress.firstName} {currentAddress.lastName}
                          </Typography>
                          <Typography>
                            {currentAddress.streetAddress} {currentAddress.city}
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
                          onClick={() => navigate("/profile")}
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
                            Rs. {product.price * product.quantity}.00
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
                        Rs. {totalAmount}.00
                      </Typography>
                    </Box> */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop="20px"
                    >
                      <Typography fontSize="14px" fontWeight="400">
                        CGST(9%)
                      </Typography>
                      <Typography fontSize="14px" fontWeight="300">
                        Rs. {Math.round(totalAmount * 9 / 100)}.00
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop="20px"
                    >
                      <Typography fontSize="14px" fontWeight="400">
                        SGST(9%)
                      </Typography>
                      <Typography fontSize="14px" fontWeight="300">
                        Rs. {Math.round(totalAmount * 9 / 100)}.00
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop="20px"
                    >
                      <Typography fontSize="14px" fontWeight="400">
                        Delivery Charges
                      </Typography>
                      <Typography fontSize="14px" fontWeight="300">
                        {deliveryChargePercent > 0 ? `Rs. ${Math.round(totalAmount * deliveryChargePercent/100)}.00` : "Free Delivery"}
                      </Typography>
                    </Box>
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
                        Rs. {Math.round(totalAmount + (totalAmount * 18 / 100))}.00
                      </Typography>
                    </Box>
                  </>
                )}
                <Divider sx={{ margin: "20px 0" }} />
                <Box>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="payment-methods"
                      value={placeOrderForm.values.paymentMode || "Bank"}
                      name="paymentMode"
                      onChange={(e) => {
                        placeOrderForm.setFieldValue(
                          "paymentMode",
                          e.target.value
                        );
                      }}
                    >
                      <FormControlLabel
                        value="Bank"
                        control={<Radio />}
                        label="Direct Bank Transfer"
                      />
                      {placeOrderForm.values.paymentMode === "Bank" ? (
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
                        value="COD"
                        control={<Radio />}
                        label="Cash on Delivery"
                      />
                      {placeOrderForm.values.paymentMode === "COD" ? (
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
                        control={<Radio />}
                        label="Other"
                      />
                      {placeOrderForm.values.paymentMode === "Other" ? (
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
                    loading={placeOrderLoading}
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
