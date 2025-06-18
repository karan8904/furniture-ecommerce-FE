import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  Chip,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../slices/categorySlice";
import { useNavigate } from "react-router";
import { addProduct } from "../../slices/productSlice";
import { showSnackbar } from "../../slices/snackbarSlice";
import CircleIcon from "@mui/icons-material/Circle";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector(
    (state) => state.category.getCategories.categories
  );

  const loading = useSelector((state) => state.product.addProduct.loading);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    description: Yup.string().required("Description is required."),
    price: Yup.number().required("Price is required."),
    category: Yup.string().required("Category is required."),
    sizes: Yup.object()
      .test("at-least-one-true", "Select at least one size", (value) =>
        Object.values(value).some((v) => v === true)
      )
      .required("Required"),
    colors: Yup.array().min(1, "Atleast one color should be selected."),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(5, "You can upload up to 5 images only")
      .test("fileType", "Only image files allowed", (value) =>
        value ? value.every((file) => file.type.startsWith("image/")) : false
      ),
  });

  const handleOnSubmit = async (productData) => {
    try {
      const formData = new FormData();
      formData.append("name", productData.name)
      formData.append("description", productData.description)
      formData.append("price", productData.price)
      formData.append("category", productData.category)
      
      productData.images.map((image) => formData.append("images", image))
      Object.entries(productData.sizes).forEach(([key, value]) => {
        if (value) formData.append("sizes", key);
      });
      productData.colors.map((color) => formData.append("colors", color))

      await dispatch(addProduct(formData)).unwrap();
      dispatch(showSnackbar({ message: "Product Added Successfully." }));
      formik.resetForm();
      navigate("/admin");
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      sizes: { S: false, M: true, L: false, XL: false },
      colors: [],
      images: [],
    },
    validationSchema,
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
  });

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

  const allSizes = ["S", "M", "L", "XL"];
  const allColors = ["#ff0000", "#000", "#6f6f6f", "#4f23ab"];

  const selectedSizes = Object.entries(formik.values.sizes)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  const handleSizeChange = (size) => {
    formik.setFieldValue("sizes", {
      ...formik.values.sizes,
      [size]: !formik.values.sizes[size],
    });
  };

  const handleColorsChange = (color) => {
    const current = formik.values.colors;
    if (current.includes(color)) {
      formik.setFieldValue(
        "colors",
        current.filter((c) => c !== color)
      );
    } else {
      formik.setFieldValue("colors", [...current, color]);
    }
  };

  return (
    <>
      <Grid container marginTop="20px">
        <Grid container size={12}>
          <Grid size={12}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                Add New Product
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
                id="name"
                label="Product Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                fullWidth
                error={formik.touched.name && formik.errors.name}
                helperText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ""
                }
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                value={formik.values.description}
                onChange={formik.handleChange}
                multiline
                rows={3}
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
              <FormControl
                fullWidth
                error={formik.touched.category && formik.errors.category}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>{formik.errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={6} margin="10px auto">
              <TextField
                id="price"
                type="number"
                label="Product Price (₹)"
                variant="outlined"
                value={formik.values.price}
                onChange={formik.handleChange}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                fullWidth
                error={formik.touched.price && formik.errors.price}
                helperText={
                  formik.touched.price && formik.errors.price
                    ? formik.errors.price
                    : ""
                }
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <FormControl
                fullWidth
                error={formik.touched.sizes && formik.errors.sizes}
              >
                <InputLabel id="sizes-label">Available Sizes</InputLabel>
                <Select
                  labelId="sizes-label"
                  id="sizes"
                  name="sizes"
                  multiple
                  value={selectedSizes}
                  label="Available Sizes"
                  renderValue={(selected) => selected.join(", ")}
                >
                  {allSizes.map((size) => (
                    <MenuItem
                      key={size}
                      value={size}
                      onClick={() => handleSizeChange(size)}
                    >
                      <Checkbox checked={formik.values.sizes[size]} />
                      <ListItemText primary={size} />
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.sizes && formik.errors.sizes && (
                  <FormHelperText>{formik.errors.sizes}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={6} margin="10px auto">
              <FormControl
                fullWidth
                error={formik.touched.colors && formik.errors.colors}
              >
                <InputLabel id="sizes-label">Available Colors</InputLabel>
                <Select
                  labelId="colors-label"
                  id="colors"
                  name="colors"
                  multiple
                  value={formik.values.colors}
                  label="Available Colors"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {selected.map((color) => (
                        <Chip
                          key={color}
                          icon={
                            <CircleIcon sx={{ color: color, fill: color }} />
                          }
                          label={color}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {allColors.map((color) => (
                    <MenuItem
                      key={color}
                      value={color}
                      onClick={() => handleColorsChange(color)}
                    >
                      <Checkbox
                        checked={formik.values.colors.includes(color)}
                      />
                      <CircleIcon
                        sx={{
                          color: color,
                          border: "1.5px solid black",
                          borderRadius: "50%",
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.colors && formik.errors.colors && (
                  <FormHelperText>{formik.errors.colors}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid size={6} margin="10px auto">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Images
                <VisuallyHiddenInput
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  onChange={(e) =>
                    formik.setFieldValue("images", Array.from(e.target.files))
                  }
                />
              </Button>
              {formik.touched.images && formik.errors.images ? (
                <FormHelperText error>{formik.errors.images}</FormHelperText>
              ) : (
                <FormHelperText>
                  Atleast 1 image is required and Maximum 5 images
                </FormHelperText>
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

export default AddProduct;
