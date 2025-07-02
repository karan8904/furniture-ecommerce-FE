import React, { useState } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Typography,
  Select,
} from "@mui/material";
import { filterProducts } from "../slices/productSlice";
import { useDispatch } from "react-redux";

const FilterComponent = ({ totalProducts, firstProductNumber, lastProductNumber, setItemsPerPage, setCurrentPage }) => {
  const [itemCount, setItemCount] = useState(8);
  const [sortOption, setSortOption] = useState("default");

  const dispatch = useDispatch()

  const handleOnChangeFilter = async(e) => {
    setSortOption(e.target.value)
    await dispatch(filterProducts(e.target.value)).unwrap()
    setCurrentPage(1)
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.custom.bannerColor,
          padding: "20px 0",
        }}
      >
        <Grid container columns={{ sm: 6, md: 12 }} rowSpacing={3}>
          <Grid
            size={5}
            columnGap={{ xs: 1, sm: 3, md: 3 }}
            display="flex"
            justifyContent={{ sm: "start", md: "center" }}
            alignItems="center"
          >
            <Box
              display="flex"
              alignItems="center"
              borderRight={2}
              borderColor="#9F9F9F"
              padding="0 20px"
            >
              <Typography fontSize="18px">Showing {firstProductNumber}-{lastProductNumber} of {totalProducts} results</Typography>
            </Box>
          </Grid>
          <Grid
            size={6}
            columnGap={2}
            display="flex"
            justifyContent={{ sm: "start", md: "end" }}
            alignItems="center"
            padding="0 20px"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Show</Typography>
              <Box>
                <Select
                  id="pageCountMenu"
                  value={itemCount}
                  onChange={(e) => {
                    setItemCount(e.target.value)
                    setItemsPerPage(e.target.value)
                  }}
                  sx={{
                    height: "40px",
                    maxWidth: "70px",
                    backgroundColor: "#fff"
                  }}
                >
                  <MenuItem value={8}>
                    8
                  </MenuItem>
                  <MenuItem value={12}>
                    12
                  </MenuItem>
                  <MenuItem value={16}>
                    16
                  </MenuItem>
                </Select>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>
              <Typography>Sort By</Typography>
              <Box>
                <Select
                  id="filterMenu"
                  value={sortOption}
                  onChange={handleOnChangeFilter}
                  sx={{
                    height: "40px",
                    maxWidth: "100px",
                    backgroundColor: "#fff"
                  }}
                >
                  <MenuItem value="default">
                    Default
                  </MenuItem>
                  <MenuItem value="price-high2low">
                    Price: High to Low
                  </MenuItem>
                  <MenuItem value="price-low2high">
                    Price: Low to High
                  </MenuItem>
                  <MenuItem value="date-recent">
                    Date: Recently Added
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterComponent;
