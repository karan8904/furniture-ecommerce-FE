import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography, Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router";

const ProductsGrid = () => {
  const navigate = useNavigate()
  return (
    <>
    <Grid container>
        <Grid container size={12}>
          <Grid size={8}>
            <Box display="flex" justifyContent="center">
              <Typography fontSize="25px" fontWeight="550">
                All Products
              </Typography>
            </Box>
          </Grid>
          <Grid size={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={() => navigate("/admin/add-product")}>Add New Product</Button>
            </Box>
          </Grid>
        </Grid>
        <Grid size={12} margin="17px 0">
          <Divider />
        </Grid>
        <Grid size={12} margin="0 10px">
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell align="right">5</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      
    </>
  );
};

export default ProductsGrid;
