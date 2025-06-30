import React, { useEffect } from 'react'
import Navbar from "../components/Navbar";
import PageTitleComponent from "../components/PageTitleComponent";
import Footer from "../components/Footer";
import InfoComponent from "../components/InfoComponent";
import { Box, Breadcrumbs, Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useNavigate } from 'react-router';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { saveEmailPreference } from '../slices/userSlice';
import { showSnackbar } from '../slices/snackbarSlice';
import { getEmailPreference } from '../slices/userSlice';

const Settings = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { orderStatus, newProducts, offers } = useSelector((state) => state.user.getEmailPreference.preference)
  const loading = useSelector((state) => state.user.saveEmailPreference.loading)

  useEffect(() => {
    dispatch(getEmailPreference())
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      orderStatus: orderStatus,
      newProducts: newProducts,
      offers: offers,
    },
    onSubmit: () => {
      handleSaveButtonClick()
    }
  })

  const handleSaveButtonClick = async() => {
    try {
      await dispatch(saveEmailPreference(formik.values)).unwrap()
      dispatch(showSnackbar({ message: "Email preference saved." }))
      navigate("/")
    } catch (error) {
      dispatch(showSnackbar({ severity: "Error", message: "Cannot save the preference. Try again." }))
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
      <Grid container margin="60px 30px" rowSpacing={3}>
          <Grid size={12}>
            <Typography variant="h5" fontWeight="550">
              Settings
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant='h6'>Mail Preference</Typography>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={formik.values.orderStatus} onChange={() => formik.setFieldValue("orderStatus", !formik.values.orderStatus)} />
                  }
                  label="Receive mails about delivery status"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formik.values.newProducts} onChange={() => formik.setFieldValue("newProducts", !formik.values.newProducts)} />
                  }
                  label="Receive mails for new products"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={formik.values.offers} onChange={() => formik.setFieldValue("offers", !formik.values.offers)} />
                  }
                  label="Receive mails for discount and offers"
                />
              </FormGroup>
            <Box marginTop="30px">
              <Button type='submit' loading={loading} variant='contained'>Save Preference</Button>
            </Box>
            </form>
          </Grid>
        </Grid>
      <Footer />
    </>
  )
}

export default Settings