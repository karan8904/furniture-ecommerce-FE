import React, { useEffect } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch } from "react-redux";
import { getSubscription } from "../slices/subscriptionSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { useNavigate } from "react-router";

const SubscriptionCards = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // useEffect(() => {

  // }, [])
  const handleOnGetPlan = async() => {
    try {
        const id = "price_1RiYwyQRKo1um7bTHcTvfFND"
        localStorage.setItem("type", "subscription")
        const response = await dispatch(getSubscription(id)).unwrap()
        window.location.href = response.url
    } catch (error) {
        dispatch(showSnackbar({ severity: "error", message: "Subscription Failed. Try again." }))
        console.log(error)
    }
  };
  return (
    <Box bgcolor="#f3f3f3" borderRadius="20px" pt={3} px={3} maxWidth="400px">
      <Box>
        <Chip color="primary" label="Most Popular" sx={{ fontWeight: "550" }} />
      </Box>
      <Box mt={3}>
        <Typography fontSize="25px" fontWeight="550">
          Basic Plan
        </Typography>
        <Typography>Best for new customers</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography component="h5" fontSize="35px" fontWeight="550">
            ₹10.00
          </Typography>
          <Typography color="secondary">/day</Typography>
        </Box>
        <Typography color="secondary" fontSize="13px">
          Cancel any time.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        rowGap={3}
        bgcolor="#fdfdfd"
        borderRadius="20px"
        p={2}
        mb={2}
      >
        <Box display="flex" columnGap={2}>
          <DoneIcon color="success" />
          <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <DoneIcon color="success" />
          <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <DoneIcon color="success" />
          <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <DoneIcon color="success" />
          <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
        </Box>
        <Box display="flex" columnGap={2}>
          <DoneIcon color="success" />
          <Typography>Lorem ipsum dolor sit amet consectetur</Typography>
        </Box>
        <Box>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOnGetPlan}
            sx={{ borderRadius: "20px" }}
            fullWidth
          >
            Upgrade Plan
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionCards;
