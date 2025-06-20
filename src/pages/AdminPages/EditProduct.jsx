import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Chip,
  ListItemText,
  FormHelperText,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useNavigate, useParams } from "react-router";
import { getCategories } from "../../slices/categorySlice";
import { editProduct, getSingleProduct } from "../../slices/productSlice";
import CircleIcon from "@mui/icons-material/Circle";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product.getSingleProduct.product)

  const editButtonLoading = useSelector(
    (state) => state.product.getSingleProduct.loading
  );

  const baseURL = import.meta.env.VITE_BASEURL
  const params = useParams();
  const id = params.id;

  const allSizes = ["S", "M", "L", "XL"];
  const allColors = ["#ff0000", "#000", "#4f23ab", "#6f6f6f"];

  useEffect(() => {
    dispatch(getSingleProduct(id)).unwrap();
    dispatch(getCategories());
  }, []);
  const categories = useSelector(
    (state) => state.category.getCategories.categories
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    description: Yup.string().required("Description is required."),
    price: Yup.number().required("Price is required."),
    category: Yup.string().required("Category is required."),
    sizes: Yup.array().required("Required"),
    colors: Yup.array().min(1, "Atleast one color should be selected."),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(5, "You can upload up to 5 images only")
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return false;

        return value.every((item) => {
          if (typeof item === "string") return true;
          if (item instanceof File)
            return ["image/jpg", "image/jpeg", "image/png"].includes(item.type);
          return false;
        });
      }),
    isDiscountEnabled: Yup.boolean(),
    discount_percent: Yup.number().when("isDiscountEnabled", {
      is: (value) => value === true,
      then: () => Yup.number().min(10).max(80).required("This field is required."),
      otherwise: () => Yup.number().notRequired(),
    }),
    stock: Yup.number().required("This field is requird."),
    isVisible: Yup.boolean()
  });

  const handleOnSubmit = async (productData) => {
    try {
      const formData = new FormData();
      for (let key in productData) {
        if (key === "sizes") {
          productData[key].forEach((size) => formData.append("sizes", size));
        } else if (key === "colors") {
          productData[key].forEach((color) => formData.append("colors", color));
        } else if (key === "images") {
          productData[key].forEach((image) => formData.append("images", image));
        } else {
          formData.append(key, productData[key]);
        }
      }
      await dispatch(
        editProduct({ formData: formData, id: product._id })
      ).unwrap();
      dispatch(showSnackbar({ message: "Product Updated Successfully." }));
      navigate("/admin");
    } catch (error) {
      dispatch(showSnackbar({ severity: "error", message: error }));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      description: product?.name || "",
      price: product?.price || 0,
      category: product?.category?._id || "",
      sizes: product?.sizes || [],
      colors: product?.colors || [],
      images: product?.images || [],
      isDiscountEnabled:product && product.discount_percent > 0 ,
      discount_percent: product?.discount_percent || 0,
      stock: product?.stock || 0,
      isVisible: product?.isVisible ?? false
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

  const handleSizeChange = (size) => {
    const current = formik.values.sizes;
    if (current.includes(size)) {
      formik.setFieldValue(
        "sizes",
        current.filter((s) => s !== size)
      );
    } else {
      formik.setFieldValue("sizes", [...current, size]);
    }
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
                  value={formik.values.sizes}
                  label="Available Sizes"
                  renderValue={(selected) => selected.join(", ")}
                >
                  {allSizes.map((size) => (
                    <MenuItem
                      key={size}
                      value={size}
                      onClick={() => handleSizeChange(size)}
                    >
                      <Checkbox checked={formik.values.sizes.includes(size)} />
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
                      <Chip
                        key={color}
                        icon={<CircleIcon sx={{ color: color, fill: color }} />}
                        label={color}
                        size="small"
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
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="isDiscountEnabled"
                      checked={formik.values.isDiscountEnabled}
                      onChange={() => formik.setFieldValue("isDiscountEnabled", !formik.values.isDiscountEnabled)}
                    />
                  }
                  label="Want to provide discount?"
                />
              </Box>
            </Grid>
            {formik.values.isDiscountEnabled && (
              <Grid size={6} margin="10px auto">
                <TextField
                  id="discount_percent"
                  type="number"
                  label="Discount (%)"
                  variant="outlined"
                  value={formik.values.discount_percent}
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
                  error={formik.touched.discount_percent && formik.errors.discount_percent}
                  helperText={
                    formik.touched.discount_percent && formik.errors.discount_percent
                      ? formik.errors.discount_percent
                      : "Minimum: 10%, Maximum: 80%"
                  }
                />
              </Grid>
            )}
            <Grid size={6} margin="10px auto">
              <TextField
                id="stock"
                type="number"
                label="Product Stock"
                variant="outlined"
                value={formik.values.stock}
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
                error={formik.touched.stock && formik.errors.stock}
                helperText={
                  formik.touched.stock && formik.errors.stock
                    ? formik.errors.stock
                    : ""
                }
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <Box display="flex" gap="10px" flexWrap="wrap">
                {formik.values.images &&
                  formik.values.images.map((img, index) => (
                    <img
                      key={index}
                      src={
                        typeof img === "string"
                          ? `${baseURL}/${img}`
                          : URL.createObjectURL(img)
                      }
                      alt="image not found"
                      height={150}
                      width={180}
                    />
                  ))}
              </Box>
            </Grid>
            <Grid size={6} margin="10px auto">
              <Box display="flex" justifyContent="space-between">
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
                      formik.setFieldValue(
                        "images",
                        formik.values.images.concat(Array.from(e.target.files))
                      )
                    }
                  />
                </Button>
                {formik.values.images.length > 0 && (
                  <Button onClick={(e) => formik.setFieldValue("images", [])}>
                    Remove all images
                  </Button>
                )}
              </Box>
              
              {formik.touched.images && formik.errors.images ? (
                <FormHelperText error>{formik.errors.images}</FormHelperText>
              ) : (
                <FormHelperText>
                  Atleast 1 image is required and Maximum 5 images
                </FormHelperText>
              )}
              <Box>
                 <FormControlLabel
                    control={<Switch checked={formik.values.isVisible} onChange={() => formik.setFieldValue("isVisible", !formik.values.isVisible)} />}
                    label="Is Visible?"
                  />
              </Box>
            </Grid>
            <Grid container size={6} margin="30px auto">
              <Grid container size={12} columnSpacing={2}>
                <Button
                  variant="contained"
                  type="submit"
                  loading={editButtonLoading}
                >
                  Edit
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

export default EditProduct;
