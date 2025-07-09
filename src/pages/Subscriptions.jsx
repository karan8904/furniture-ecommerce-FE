import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SubscriptionCards from "../components/SubscriptionCard";
import { cancelSubscription, getSubscriptionDetails } from "../slices/subscriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { showSnackbar } from "../slices/snackbarSlice";
import { Link } from "react-router";

const Subscriptions = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useDispatch();
  const id = "price_1RiYwyQRKo1um7bTHcTvfFND";
  const subscriptionDetails = useSelector(
    (state) => state.subscription.getSubscriptionDetails.details
  );
  const cancelSubscriptionLoading = useSelector((state) => state.subscription.cancelSubscription.loading)
  useEffect(() => {
    const get = async () => {
      const result = await dispatch(getSubscriptionDetails(id)).unwrap();
      formatDate(result.subscription.startDate);
    };
    get();
  }, []);

  const handleCancelSubscription = async() => {
    try {
      await dispatch(cancelSubscription(id)).unwrap()
      dispatch(showSnackbar({ message: "Subscription Cancelled Successfully." }))
      setOpenDialog(false)
    } catch (error) {
      dispatch(showSnackbar({ severity: "error",message: "Cannot cancel the subscription." }))
    }
  }

  const formatDate = (startDate) => {
    const date = new Date(startDate);
    setStartDate(
      `${date.getDate()} ${date.toLocaleString("default", { month: "long" })}, ${date.getFullYear()}`
    );
    setEndDate(
      `${date.getDate() + 1} ${date.toLocaleString("default", { month: "long" })}, ${date.getFullYear()}`
    );
  };
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
            Subscriptions
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container margin="60px 30px" columnSpacing={5} rowSpacing={3}>
        <Grid size={12}>
          <Typography variant="h5" fontWeight="550" textAlign="center">
            Subscriptions
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 4 }}
          display="flex"
          justifyContent="center"
        >
          <SubscriptionCards
            subscriptionDetails={subscriptionDetails}
            id={id}
          />
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6, md: 4 }} display="flex" justifyContent="center">
          <SubscriptionCards />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} display="flex" justifyContent="center" >
          <SubscriptionCards />
        </Grid> */}
      </Grid>
      {subscriptionDetails && subscriptionDetails?.status === "active" && (
        <Grid container margin="60px 30px" rowSpacing={3}>
          <Grid size={12}>
            <Typography variant="h5" fontWeight="550">
              Active Subscription
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 8, lg: 5 }}
            bgcolor="#f3f3f3"
            borderRadius="15px"
            px="20px"
            py="25px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="h6" fontWeight="550">
                  Basic Plan
                </Typography>
                <Chip
                  label="Active"
                  color="primary"
                  sx={{ fontWeight: "550" }}
                />
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                <Typography
                  component="a"
                  href={subscriptionDetails?.invoiceUrl}
                  color="primary"
                  sx={{ textDecoration: "none" }}
                >
                  Get Invoice
                </Typography>
                <OpenInNewIcon color="primary" />
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  disabled={subscriptionDetails.cancelAtPeriodEnd}
                  sx={{ textTransform: "initial", fontWeight: 550 }}
                  onClick={() => setOpenDialog(true)}
                >
                  {subscriptionDetails.cancelAtPeriodEnd
                    ? "Cancelled"
                    : "Cancel Subscription"}
                </Button>
              </Box>
            </Box>
            <Box display="flex" mt={3} columnGap={4} flexWrap="wrap">
              <Box>
                <Typography color="secondary" fontSize="13px" fontWeight={550}>
                  Start Date
                </Typography>
                <Typography fontSize="16px">{startDate}</Typography>
              </Box>
              <Box>
                <Typography color="secondary" fontSize="13px" fontWeight={550}>
                  Valid Until
                </Typography>
                <Typography fontSize="16px">{endDate}</Typography>
              </Box>
              <Box>
                <Typography color="secondary" fontSize="13px" fontWeight={550}>
                  Renew On
                </Typography>
                <Typography fontSize="16px">
                  {subscriptionDetails.cancelAtPeriodEnd
                    ? "Cancelled"
                    : endDate}
                </Typography>
              </Box>
              <Box>
                <Typography color="secondary" fontSize="13px" fontWeight={550}>
                  Next Billing Amount
                </Typography>
                <Typography fontSize="16px">
                  {subscriptionDetails.cancelAtPeriodEnd
                    ? "Cancelled"
                    : "₹10 / day"}
                </Typography>
              </Box>
              {subscriptionDetails.cancelAtPeriodEnd && (
                <Box mt={2}>
                  <Typography fontSize="13px" color="secondary">
                    Your current plan will be ended after validity and will not
                    be renewed.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <strong>Cancel Subscription</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel the subscription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Keep
          </Button>
          <Button
            loading={cancelSubscriptionLoading}
            onClick={handleCancelSubscription}
            variant="contained"
            autoFocus
          >
            Cancel Subscription
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
};

export default Subscriptions;
