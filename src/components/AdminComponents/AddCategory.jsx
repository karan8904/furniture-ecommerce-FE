import React from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";

const AddCategory = ({setMode}) => {
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

  const formik = useFormik({
    initialValues: {
        categoryName: "",
        description: "",
        image: ""
    }
  })

  return (
    <>
      <Grid container>
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
          <form>
            <Grid size={6} margin="10px auto">
              <TextField
                id="categoryName"
                label="Category Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid size={6} margin="10px auto">
              <TextField
                id="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
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
                  onChange={(event) => console.log(event.target.files)}
                />
              </Button>
            </Grid>
            <Grid container size={6} margin="30px auto">
                <Grid container size={12} columnSpacing={2}>
                    <Button variant="contained">Add</Button>
                    <Button variant="outlined" onClick={() => setMode("View")}>Cancel</Button>
                </Grid>
                
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
