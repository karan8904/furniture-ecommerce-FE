import React, { useState } from "react";
import bgimg from "../assets/bgimg.jpg";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { createUser } from "../slices/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textFieldStyling = {
    marginTop: "13px",
  };

  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    marginTop: "13px",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    password: Yup.string()
      .min(8, "Password length must be minimum 8 characters")
      .required("This field is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required"),
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    phone: Yup.number()
      .typeError("Phone must be in number")
      .required("This field is required."),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createUser({
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          email: values.email,
          phone: values.phone,
        })
      );
      formik.resetForm();
      navigate("/login");
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
          Register User
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
          <Grid size={{ xs: 4, sm: 5, md: 6 }}>
            <Box display="flex" justifyContent="center">
              <form onSubmit={formik.handleSubmit}>
                <Stack width={{ xs: 320, sm: 350, md: 400 }}>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    sx={textFieldStyling}
                    error={formik.touched.firstName && formik.errors.firstName}
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                        ? formik.errors.firstName
                        : ""
                    }
                  />

                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    sx={textFieldStyling}
                    error={formik.touched.lastName && formik.errors.lastName}
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                        ? formik.errors.lastName
                        : ""
                    }
                  />

                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    sx={textFieldStyling}
                    error={formik.touched.email && formik.errors.email}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : ""
                    }
                  />

                  <TextField
                    id="phone"
                    label="Phone"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    sx={numberFieldStyling}
                    type="number"
                    error={formik.touched.phone && formik.errors.phone}
                    helperText={
                      formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : ""
                    }
                  />

                  <TextField
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    sx={textFieldStyling}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                              edge="end"
                            >
                              {isPasswordVisible ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    error={formik.touched.password && formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : ""
                    }
                  />
                  <TextField
                    id="confirmPassword"
                    type={isConfPasswordVisible ? "text" : "password"}
                    label="Confirm Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    sx={textFieldStyling}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setIsConfPasswordVisible(!isConfPasswordVisible)
                              }
                              edge="end"
                            >
                              {isConfPasswordVisible ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : ""
                    }
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ marginTop: "15px" }}
                  >
                    Register
                  </Button>
                  <Box marginTop="20px" display="flex" justifyContent="center">
                    <Typography fontSize="18px">
                      Already a user?{" "}
                      <Link
                        to="/login"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Login
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

export default Register;
