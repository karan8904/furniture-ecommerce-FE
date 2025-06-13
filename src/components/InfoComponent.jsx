import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const InfoComponent = () => {
  const bannerStyle = {
    gridSize: {
      xs: 12,
      sm: 6,
      md: 3,
    },
    iconHight: {
      xs: "40px",
      sm: "50px",
      md: "60px",
    },
    iconWidth: {
      xs: "32px",
      sm: "42px",
      md: "52px",
    },
    headerFontSize: {
      sm: "17px",
      xs: "17px",
      md: "20px",
    },
    bodyFontSize: {
      sm: "12px",
      xs: "13px",
      md: "14px",
    },
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.custom.bannerColor,
        padding: "80px 0",
      }}
    >
      <Grid container rowSpacing={2}>
        <Grid
          size={bannerStyle.gridSize}
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            columnGap={1}
            sx={{ maxWidth: 250, width: "100%" }}
          >
            <Box>
              <EmojiEventsOutlinedIcon
                sx={{
                  height: bannerStyle.iconHight,
                  width: bannerStyle.iconWidth,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize={bannerStyle.headerFontSize}
                color="#242424"
                fontWeight={600}
              >
                High Quality
              </Typography>
              <Typography
                fontSize={bannerStyle.bodyFontSize}
                color="#898989"
                fontWeight={500}
              >
                crafted from top materials
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          size={bannerStyle.gridSize}
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            columnGap={1}
            sx={{ maxWidth: 250, width: "100%" }}
          >
            <Box>
              <VerifiedOutlinedIcon
                sx={{
                  height: bannerStyle.iconHight,
                  width: bannerStyle.iconWidth,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize={bannerStyle.headerFontSize}
                color="#242424"
                fontWeight={600}
              >
                Warranty Protection
              </Typography>
              <Typography
                fontSize={bannerStyle.bodyFontSize}
                color="#898989"
                fontWeight={500}
              >
                Over 2 years
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          size={bannerStyle.gridSize}
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            columnGap={1}
            sx={{ maxWidth: 250, width: "100%" }}
          >
            <Box>
              <Inventory2OutlinedIcon
                sx={{
                  height: bannerStyle.iconHight,
                  width: bannerStyle.iconWidth,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize={bannerStyle.headerFontSize}
                color="#242424"
                fontWeight={600}
              >
                Free Shipping
              </Typography>
              <Typography
                fontSize={bannerStyle.bodyFontSize}
                color="#898989"
                fontWeight={500}
              >
                Order over 150 $
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid
          size={bannerStyle.gridSize}
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="flex-start"
            columnGap={1}
            sx={{ maxWidth: 250, width: "100%" }}
          >
            <Box>
              <SupportAgentOutlinedIcon
                sx={{
                  height: bannerStyle.iconHight,
                  width: bannerStyle.iconWidth,
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography
                fontSize={bannerStyle.headerFontSize}
                color="#242424"
                fontWeight={600}
              >
                24 / 7 Support
              </Typography>
              <Typography
                fontSize={bannerStyle.bodyFontSize}
                color="#898989"
                fontWeight={500}
              >
                Dedicated support
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoComponent;
