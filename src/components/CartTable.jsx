import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  tableCellClasses,
  Typography,
  Grid,
  Box,
  IconButton,
  Button,
  Paper,
  InputAdornment,
  TextField,
} from "@mui/material";
import sofa from "../assets/sofa.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router";

const CartTable = () => {
  const [qty, setQty] = useState(1);
  const numberFieldStyling = {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    width: "40px",
  };
  return (
    <>
      <Grid container columnSpacing={5} rowSpacing={2}>
        <Grid
          size={{ sm: 12, md: 9 }}
          display={{ xs: "none", sm: "none", md: "flex" }}
        >
          <TableContainer
            
            sx={{ maxWidth: "100%", overflowX: "auto" }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: (theme) => theme.palette.custom.bannerColor,
                }}
              >
                <TableRow>
                  <TableCell align="center">Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>
                    Subtotal
                  </TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.custom.bannerColor,
                          maxWidth: "110px",
                          marginRight: "30px",
                          borderRadius: "10px",
                        }}
                      >
                        <img src={sofa} alt="" height="100" width="105" />
                      </Box>
                      <Typography color="secondary" fontSize="16px">
                        Asgard Sofa
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="secondary">Rs. 250,000.00</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" >
                      <IconButton
                        onClick={() => setQty(qty - 1)}
                        disabled={qty < 2}
                      >
                        -
                      </IconButton>
                      <TextField
                        sx={numberFieldStyling}
                        type="number"
                        value={qty}
                      ></TextField>
                      <IconButton
                        onClick={() => setQty(qty + 1)}
                        disabled={qty > 9}
                      >
                        +
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography>Rs. 250,000.00</Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 12 }} display={{ md: "none", lg: "none" }}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>
                    Product Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.custom.bannerColor,
                          maxWidth: "110px",
                          marginRight: "30px",
                          borderRadius: "10px",
                        }}
                      >
                        <img src={sofa} alt="" height="100" width="105" />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="secondary"
                      fontSize={{ sm: "18px", md: "16px" }}
                    >
                      Asgard Sofa
                    </Typography>
                    <Typography color="secondary">Rs. 250,000.00</Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <IconButton
                        onClick={() => setQty(qty - 1)}
                        disabled={qty < 2}
                      >
                        -
                      </IconButton>
                      <TextField
                        sx={numberFieldStyling}
                        type="number"
                        value={qty}
                      ></TextField>
                      <IconButton
                        onClick={() => setQty(qty + 1)}
                        disabled={qty > 4}
                      >
                        +
                      </IconButton>
                    </Box>
                    <Box>
                      <IconButton>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.custom.bannerColor,
            }}
            padding="30px 0"
          >
            <Box>
              <Typography
                textAlign="center"
                fontSize={{ sm: "20px", md: "24px", lg: "28px" }}
                fontWeight="600"
              >
                Cart Totals
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-evenly" paddingTop="10px">
              <Typography>Subtotal</Typography>
              <Typography
                fontWeight="400"
                fontSize={{ md: "14px", lg: "17px" }}
                color="secondary"
              >
                Rs. 250,000.00
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-evenly" paddingTop="20px">
              <Typography>Total</Typography>
              <Typography
                color="primary"
                fontSize={{ md: "15px", lg: "20px" }}
                fontWeight="500"
              >
                Rs. 250,000.00
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" paddingTop="30px">
              <Link
                to="/checkout"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <Button
                  variant="outlined"
                  color="#000"
                  sx={{ borderRadius: "10px" }}
                >
                  Check Out
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CartTable;
