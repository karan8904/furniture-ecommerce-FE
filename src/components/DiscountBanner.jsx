import React from "react";
import { Box, Grid, Stack, Typography, Button, ImageList, ImageListItem } from "@mui/material";
import listImg1 from "../assets/listImg1.png";
import listImg2 from "../assets/listImg2.png";

const DiscountBanner = () => {
  return (

      <Box
        sx={{
          margin: "60px 0",
          backgroundColor: "#FCF8F3",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 1, sm: 12, md: 17 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid size={{ xs: 4, sm: 3, md: 5 }}>
            <Stack
              sx={{
                display: "flex",
                margin: { xs: "30px 15px", sm: "50px 30px", md: "100px 70px" },
                lineHeight: { xs: "0", sm: "0", md: "1" },
              }}
            >
              <Typography
                fontWeight={700}
                sx={{ fontSize: { xs: "23px", sm: "27px", md: "40px" } }}
              >
                50% Beautiful Rooms Inspirations
              </Typography>
              <Typography
                margin="14px 0"
                color="#616161"
                fontWeight={500}
                sx={{ fontSize: { xs: "16px", sm: "15px", md: "20px" } }}
              >
                Our designer already made a lot of beautiful prototype of rooms
                that inspire you
              </Typography>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#B88E2F",
                    fontWeight: 500,
                    size: "15px",
                  }}
                >
                  Explore More
                </Button>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 4, sm: 5, md: 7 }}>
            <Box sx={{ padding: "30px 0" }}>
              <ImageList
                sx={{
                  maxWidth: { xs: "450px", sm: "600px", md: "800px" },
                  maxHeight: { xs: "330px", sm: "390px", md: "580px" },
                }}
                cols={2}
                gap={20}
              >
                <ImageListItem sx={{ position: "relative" }}>
                  <img
                    src={listImg1}
                    alt="listImg1"
                    loading="lazy"
                    style={{ maxHeight: "530px", maxWidth: "400px" }}
                  />
                  {/* <Box sx={{ position: "absolute", }}>
                <Typography>
                  01 -- Bed Room
                </Typography>
                <Typography>
                  Inner Peace
                </Typography>
              </Box> */}
                </ImageListItem>
                <Stack>
                  <ImageListItem>
                    <img
                      src={listImg2}
                      alt="listImg2"
                      loading="lazy"
                      style={{ maxHeight: "372px", maxWidth: "486px" }}
                    />
                  </ImageListItem>
                </Stack>
              </ImageList>
            </Box>
          </Grid>
        </Grid>
      </Box>
  );
};

export default DiscountBanner;
