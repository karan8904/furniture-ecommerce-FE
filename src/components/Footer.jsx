import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Divider, Box, Stack, TextField, Button } from "@mui/material";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import { setEmailSubscription } from "../slices/userSlice";

const Footer = () => {
  const dispatch = useDispatch()
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
  });

  const handleSubmit = async() => {
    try {
      await dispatch(setEmailSubscription(formik.values)).unwrap()
      dispatch(showSnackbar({ message: "Thanks for subscribing." }))
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  }
  
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: () => {
      handleSubmit()
    },
  });
  const linkStyle = { textDecoration: "none", color: "#000" };
  return (
    <>
      <Container sx={{ padding: "30px 0" }}>
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }} rowSpacing={5}>
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Typography fontSize={24} fontWeight={700}>
              Funiro.
            </Typography>
            <Box sx={{ marginTop: "50px", color: "#9F9F9F" }}>
              <Typography>
                400 University Drive Suite 200 Coral Gables,
              </Typography>
              <Typography>FL 33134 USA</Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 4, sm: 4, md: 4 }} paddingLeft={7}>
            <Box display="flex" justifyContent="space-between">
              <Stack>
                <Typography color="#9F9F9F">Links</Typography>
                <Typography marginTop="25px">
                  <Link to="/" style={linkStyle}>
                    Home
                  </Link>
                </Typography>
                <Typography marginTop="25px">
                  <Link to="/shop" style={linkStyle}>
                    Shop
                  </Link>
                </Typography>
                <Typography marginTop="25px">
                  <Link to="/categories" style={linkStyle}>
                    Categories
                  </Link>
                </Typography>
                <Typography marginTop="25px">
                  <Link to="/contact" style={linkStyle}>
                    Contact
                  </Link>
                </Typography>
              </Stack>

              <Stack>
                <Typography color="#9F9F9F">Help</Typography>
                <Typography marginTop="25px">Payment Options</Typography>
                <Typography marginTop="25px">Returns</Typography>
                <Typography marginTop="25px">Privary Policies</Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Box display="flex" justifyContent="center">
              <Stack>
                <Typography color="#9F9F9F">Newsletter</Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Box display="flex" marginTop="25px">
                    <TextField
                      id="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      variant="standard"
                      error={formik.touched.email && formik.errors.email}
                      helperText={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                    />
                    <Button
                      type="submit"
                      sx={{
                        borderBottom: "1px solid black",
                        borderRadius: 0,
                        margin: "0 5px",
                        maxHeight: "48px",
                        color: "black",
                        paddingBottom: 0,
                      }}
                    >
                      SUBSCRIBE
                    </Button>
                  </Box>
                </form>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "30px 0", borderWidth: "1px" }} />
        <Typography>2023 furino. All rights reverved</Typography>
      </Container>
    </>
  );
};

export default Footer;
