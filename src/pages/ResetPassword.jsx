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
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../slices/userSlice";

const ResetPassword = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfPasswordVisible, setIsConfPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const textFieldStyling = {
    marginTop: "13px",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required("This field is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
        let userId = params.userId
        let token = params.token   
        dispatch(resetPassword({newPassword: values.password, userId: userId, token: token}))
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
          Reset Your Password
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
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    label="New Password"
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
                    label="Confirm New Password"
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
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "15px" }}
                  >
                    Reset Password
                  </Button>
                </Stack>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ResetPassword;