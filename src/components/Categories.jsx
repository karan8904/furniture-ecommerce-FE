import React from "react";
import { Container, Box, Typography, Grid, Stack } from "@mui/material";
import rangeBg1 from "../assets/Mask Group.png";
import rangeBg2 from "../assets/Image-living room.png";
import rangeBg3 from "../assets/Mask Group (1).png";

const Categories = () => {
  return (
    <>
      <Container sx={{ marginTop: "60px" }}>
        <Box>
          <Typography
            sx={{ fontWeight: 700, fontSize: "32px", textAlign: "center" }}
          >
            Browse The Range
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "20px",
              textAlign: "center",
              color: "#666666",
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Box>
        <Box sx={{ marginTop: "70px" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 3 }}
            wrap="wrap"
          >
            <Grid size={{ md: 4, sm: 12, xs: 12 }}>
              <Stack>
                <img src={rangeBg1} alt="" />
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "15px 0",
                    color: "#333333",
                  }}
                >
                  Dining
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ md: 4, sm: 12, xs: 12 }}>
              <Stack>
                <img src={rangeBg2} alt="" />
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "15px 0",
                    color: "#333333",
                  }}
                >
                  Living
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ md: 4, sm: 12, xs: 12 }}>
              <Stack>
                <img src={rangeBg3} alt="" />
                <Typography
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    fontSize: "18px",
                    margin: "15px 0",
                    color: "#333333",
                  }}
                >
                  Bedroom
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Categories;
