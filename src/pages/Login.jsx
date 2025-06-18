import React, { useState, useEffect } from "react";
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
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/userSlice";
import { showSnackbar } from "../slices/snackbarSlice";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loading = useSelector((state) => state.user.loading)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textFieldStyling = {
    marginTop: "13px",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("This field is required."),
    password: Yup.string().required("This field is required."),
  });

  const handleOnSubmit = async (values) => {
    try {
      const data = await dispatch(
        loginUser({ email: values.email, password: values.password })
      ).unwrap();
      
      dispatch(
        showSnackbar({ message: "Loggin Successful..." })
      );
      data.user.isAdmin ? navigate("/admin") : navigate("/")
      formik.resetForm();
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleOnSubmit(values);
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
          Log into your account
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
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Stack width={{ xs: 320, sm: 350, md: 400 }}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    color="primary"
                    sx={textFieldStyling}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                    helperText={
                      formik.touched.email && formik.errors.email
                        ? formik.errors.email
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

                  <Box marginTop="10px" display="flex" justifyContent="end">
                    <Typography fontSize="14px">
                      <Link
                        to="/forgot-password"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Typography>
                  </Box>

                  <Button
                    loading = {loading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "15px" }}
                  >
                    Login
                  </Button>

                  <Box marginTop="20px" display="flex" justifyContent="center">
                    <Typography fontSize="18px">
                      Not a user?{" "}
                      <Link
                        to="/register"
                        style={{
                          color: "#B88E2F",
                          textDecoration: "none",
                        }}
                      >
                        Register
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

export default Login;
