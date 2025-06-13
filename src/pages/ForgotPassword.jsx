import React from "react";
import bgimg from "../assets/bgimg.jpg";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      
    },
  });

  return (
    <>
      <Container>
        <Typography
          variant="h4"
          marginTop={5}
          fontWeight={600}
          textAlign="center"
        >
          Forgot your password?
        </Typography>
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          columnSpacing={2}
          rowSpacing={5}
          padding="50px 0"
        >
          <Grid size={{ xs: 4, sm: 3, md: 6 }}>
            <Box
              sx={{
                background: `url(${bgimg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: { xs: "0px", sm: "450px", md: "500px" },
                borderRadius: "15px",
              }}
            ></Box>
          </Grid>
          <Grid
            size={{ xs: 4, sm: 5, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Stack width={{ xs: 320, sm: 350, md: 400 }}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "100%",
                      height: { md: "45px", sm: "45px", xs: "40px" },
                      marginTop: "10px",
                    }}
                  >
                    Reset Password
                  </Button>

                  <Box marginTop="20px" display="flex" justifyContent="center">
                    <Typography fontSize="18px">
                      <Link
                        to="/login"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Back to login
                      </Link>
                    </Typography>
                  </Box>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ForgotPassword;
