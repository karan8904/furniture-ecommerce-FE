import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../slices/categorySlice";
import * as Yup from "yup";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useNavigate } from "react-router";

const AddCategory = () => {
  const loading = useSelector((state) => state.category.addCategory.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .required("Image is required.")
      .test("filetype", "Only image files are allowed.", (value) => {
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
  });

  const handleOnSubmit = async () => {
    try {
      await dispatch(
        addCategory({
          name: formik.values.categoryName,
          description: formik.values.description,
          image: formik.values.image,
        })
      ).unwrap();
      dispatch(showSnackbar({ message: "Category added successfully." }))
      formik.resetForm()
      navigate("/admin")
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }))
    }
  };

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
      image: "",
    },
    validationSchema,
    onSubmit: () => {
      handleOnSubmit();
    },
  });

  return (
    <>
      <Grid container marginTop="20px">
        <Grid container size={12}>
          <Grid size={12}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                Add New Category
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="0 10px">
          <form onSubmit={formik.handleSubmit}>
            <Grid size={6} margin="10px auto">
              <TextField
                id="categoryName"
                label="Category Name"
                variant="outlined"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                fullWidth
                error={
                  formik.touched.categoryName && formik.errors.categoryName
                }
                helperText={
                  formik.touched.categoryName && formik.errors.categoryName
                    ? formik.errors.categoryName
                    : ""
                }
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.description && formik.errors.description}
                helperText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ""
                }
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <VisuallyHiddenInput
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.currentTarget.files[0])
                  }
                />
              </Button>
              {formik.errors.image && formik.touched.image && (
                <Typography fontSize="13px" color="error" margin="2px 10px">
                  {formik.errors.image}
                </Typography>
              )}
              {formik.values.image && (
                <Typography fontSize="13px" margin="2px 10px">
                  {formik.values.image.name}
                </Typography>
              )}
            </Grid>
            <Grid container size={6} margin="30px auto">
              <Grid container size={12} columnSpacing={2}>
                <Button variant="contained" type="submit" loading={loading}>
                  Add
                </Button>
                <Button variant="outlined" onClick={() => navigate("/admin")}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
