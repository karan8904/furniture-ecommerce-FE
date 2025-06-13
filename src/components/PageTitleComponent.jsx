import React from "react";
import bgimg from "../assets/bgimg.jpg";
import { Box, Typography } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from "react-router";

const PageTitleComponent = ({ pageTitle }) => {
  return (
    <>
      <Box position="relative">
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: { xs: "140px", sm: "270px", md: "316px" },
            background: `url(${bgimg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: { xs: "140px", sm: "270px", md: "316px" },
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            position: "relative",
            height: { xs: "140px", sm: "270px", md: "316px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            rowGap: 2,
          }}
        >
          <Typography variant="h4" fontWeight="600">
            {pageTitle}
          </Typography>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="medium" />}>
            <Typography fontWeight={600} fontSize="16px">
              <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
                Home
              </Link>
            </Typography>

            <Typography fontSize="16px" color="#000" fontWeight={500}>
              {pageTitle}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
    </>
  );
};

export default PageTitleComponent;
