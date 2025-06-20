import React from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createContact } from "../slices/contactSlice";
import { showSnackbar } from "../slices/snackbarSlice";
import { useNavigate } from "react-router";

const ContactForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    subject: Yup.string().required("This field is required"),
    message: Yup.string().required("This field is required"),
  });

  const handleSubmit = async() => {
    try {
      await dispatch(createContact(formik.values)).unwrap()
      dispatch(showSnackbar({ message: "Thank you for reaching out to us. We will contact you soon."}))
      formik.resetForm()
      navigate("/")
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }))
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit()
    },
  });

  const styling = {
    firstGridSize: {
      xs: 12,
      sm: 10,
      md: 5,
    },
    secondGridSize: {
      xs: 12,
      sm: 12,
      md: 6,
    },
    formGridSize: {
      xs: 12,
      sm: 9,
      md: 8,
    },
    textFieldBorderRadius: {
      input: {
        style: {
          borderRadius: "10px",
        },
      },
    },
  };
  return (
    <>
      <Box margin="30px 0 100px">
        <Box maxWidth="600px" margin="0 auto" textAlign="center">
          <Typography fontSize="30px" fontWeight="550">
            Get In Touch With Us
          </Typography>
          <Typography fontSize="16px" color="secondary" marginTop="10px">
            For More Information About Our Product & Services. Please Feel Free
            To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
            Not Hesitate!
          </Typography>
        </Box>
        <Box margin={{ xs: "30px 40px", md: "30px 60px" }}>
          <Grid container spacing={5}>
            <Grid size={styling.firstGridSize}>
              <Box
                display="flex"
                justifyContent="space-evenly"
                marginTop="10px"
              >
                <Box>
                  <PlaceIcon fontSize="large" />
                </Box>
                <Box maxWidth="230px">
                  <Typography fontSize="24px" fontWeight="550">
                    Address
                  </Typography>
                  <Typography>
                    236 5th SE Avenue, New York NY10000, United States
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-evenly"
                marginTop="10px"
              >
                <Box>
                  <CallIcon fontSize="large" />
                </Box>
                <Box maxWidth="230px">
                  <Typography fontSize="24px" fontWeight="550">
                    Phone
                  </Typography>
                  <Typography>
                    236 5th SE Avenue, New York NY10000, United States
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="space-evenly"
                marginTop="10px"
              >
                <Box>
                  <AccessTimeFilledIcon fontSize="large" />
                </Box>
                <Box maxWidth="230px">
                  <Typography fontSize="24px" fontWeight="550">
                    WorkingTime
                  </Typography>
                  <Typography>
                    Monday-Friday: 9:00 - 22:00 Saturday-Sunday: 9:00 - 21:00
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={styling.secondGridSize}>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  container
                  rowSpacing={2}
                  marginTop="30px"
                  display="flex"
                  justifyContent="center"
                >
                  <Grid size={styling.formGridSize}>
                    <TextField
                      id="name"
                      label="Your Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && formik.errors.name}
                      helperText={
                        formik.touched.name && formik.errors.name
                          ? formik.errors.name
                          : ""
                      }
                      fullWidth
                      slotProps={styling.textFieldBorderRadius}
                    />
                  </Grid>

                  <Grid size={styling.formGridSize}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && formik.errors.email}
                      helperText={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                      slotProps={styling.textFieldBorderRadius}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={styling.formGridSize}>
                    <TextField
                      id="subject"
                      label="Subject"
                      variant="outlined"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      error={formik.touched.subject && formik.errors.subject}
                      helperText={
                        formik.touched.subject && formik.errors.subject
                          ? formik.errors.subject
                          : ""
                      }
                      slotProps={styling.textFieldBorderRadius}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={styling.formGridSize}>
                    <TextField
                      id="message"
                      label="Message"
                      variant="outlined"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={formik.touched.message && formik.errors.message}
                      helperText={
                        formik.touched.message && formik.errors.message
                          ? formik.errors.message
                          : ""
                      }
                      multiline
                      rows={4}
                      slotProps={styling.textFieldBorderRadius}
                      fullWidth
                    />
                  </Grid>

                  <Grid size={styling.formGridSize}>
                    <Button type="submit" variant="contained" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ContactForm;
