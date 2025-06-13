import React, { useState } from "react";
import { Box, Grid, IconButton, Button, Menu, MenuItem, Typography } from "@mui/material";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined";

const FilterComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const openShowMenu = Boolean(anchorEl2);
  const openSortMenu = Boolean(anchorEl);

  const handleSortButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortButtonClose = () => {
    setAnchorEl(null);
  };

  const handleShowButtonClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleShowButtonClose = () => {
    setAnchorEl2(null);
  };

  const dropDownStyle = {
    textTransform: "initial",
    backgroundColor: (theme) => theme.palette.custom.dropDownBg,
    color: "#9F9F9F",
    borderRadius: 0,
    boxShadow: 0,
    margin: "0 5px"
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
            size={6}
            columnGap={{ xs: 1, sm: 3, md: 3 }}
            display="flex"
            justifyContent={{ sm: "start", md: "center" }}
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <IconButton size="small">
                <TuneOutlinedIcon />
              </IconButton>
              <Typography>Filter</Typography>
            </Box>
            <Box>
              <IconButton size="small">
                <GridViewRoundedIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton size="small">
                <CalendarViewDayOutlinedIcon />
              </IconButton>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              borderLeft={2}
              borderColor="#9F9F9F"
              padding="0 20px"
            >
              <Typography>Showing 1-16 of 32 results</Typography>
            </Box>
          </Grid>
          <Grid
            size={6}
            columnGap={2}
            display="flex"
            justifyContent={{ sm: "start", md: "center" }}
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Typography>Show</Typography>
              <Box>
                <Button
                  id="button"
                  aria-controls={openShowMenu ? "menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openShowMenu ? "true" : undefined}
                  onClick={handleShowButtonClick}
                  sx={dropDownStyle}
                >
                  16
                </Button>
                <Menu
                  id="menu"
                  anchorEl={anchorEl2}
                  open={openShowMenu}
                  onClose={handleShowButtonClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "button",
                    },
                  }}
                >
                  <MenuItem onClick={handleShowButtonClose}>8</MenuItem>
                  <MenuItem onClick={handleShowButtonClose}>12</MenuItem>
                  <MenuItem onClick={handleShowButtonClose}>16</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography>Sort By</Typography>
              <Box>
                <Button
                  id="sortButton"
                  variant="contained"
                  aria-controls={openSortMenu ? "sortMenu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openSortMenu ? "true" : undefined}
                  onClick={handleSortButtonClick}
                  sx={dropDownStyle}
                >
                  Default
                </Button>
                <Menu
                  id="sortMenu"
                  anchorEl={anchorEl}
                  open={openSortMenu}
                  onClose={handleSortButtonClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "sortButton",
                    },
                  }}
                >
                  <MenuItem onClick={handleSortButtonClose}>Price: High to Low</MenuItem>
                  <MenuItem onClick={handleSortButtonClose}>Price: Low to High</MenuItem>
                  <MenuItem onClick={handleSortButtonClose}>Date: Recently Added</MenuItem>
                </Menu>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FilterComponent;
