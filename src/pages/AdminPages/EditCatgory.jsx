import React, { useEffect, useState } from "react";
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
import * as Yup from "yup";
import { showSnackbar } from "../../slices/snackbarSlice";
import { useNavigate, useParams } from "react-router";
import { getCategories, editCatgory } from "../../slices/categorySlice";

const EditCatgory = () => {
  const [category, setCategory] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const catId = params.id;

  const baseURL = import.meta.env.VITE_BASEURL

  const editButtonLoading = useSelector((state) => state.category.editCategory.loading)

  useEffect(() => {
    const get = async () => {
      const result = await dispatch(getCategories()).unwrap();
      result.categories.map((cat) => {
        if (cat._id === catId) {
        //   console.log(cat);
          setCategory(cat);
        }
      });
    };
    get();
  }, []);

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
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.mixed()
      .required("Image is required.")
      .test("filetype", "Only image files are allowed.", (value) => {
        if (typeof value === "string") return true;
        return (
          value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
        );
      }),
  });

  const handleOnSubmit = async() => {
    try {
        await dispatch(editCatgory({id: category._id, categoryData: formik.values})).unwrap()
        dispatch(showSnackbar({ message: "Category Updated Successfully." }))
        navigate("/admin")
    } catch (error) {
        dispatch(showSnackbar({ severity: "error", message: error }))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: category?.imageURL || "",
    },
    validationSchema,
    onSubmit: () => {
        if((category.name === formik.values.name) && (category.description ===  formik.values.description) && (typeof formik.values.image === "string")){
            dispatch(showSnackbar({ severity: "info", message: "No changes made."}))
            navigate("/admin")
        }
        else
            handleOnSubmit()
    },
  });

  return (
    <>
      <Grid container marginTop="20px">
        <Grid container size={12}>
          <Grid size={12}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                Edit Category
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
                label="Category Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                
                fullWidth
                error={
                  formik.touched.name && formik.errors.name
                }
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
              {formik.values.image && (
                <img
                  src={
                    typeof formik.values.image === "string"
                      ? `${baseURL}/${formik.values.image}`
                      : URL.createObjectURL(formik.values.image)
                  }
                  alt="image not found"
                  width={150}
                  height={180}
                />
              )}
            </Grid>
            <Grid size={6} margin="10px auto">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload New Image
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
                  {formik.values.image.name
                    ? formik.values.image.name
                    : ""}
                </Typography>
              )}
            </Grid>
            <Grid container size={6} margin="30px auto">
              <Grid container size={12} columnSpacing={2}>
                <Button variant="contained" type="submit" loading={editButtonLoading}>
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

export default EditCatgory;
