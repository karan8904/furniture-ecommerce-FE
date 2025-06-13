import React from "react";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import homeBg from "../assets/home-bg.jpg";

const NewArrivalBanner = () => {
  return (
      <Box
        sx={{
          display: "flex",
          background: `url(${homeBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: { md: "600px", sm: "500px", xs: "400px" },
          position: "relative",
          justifyContent: { md: "end", sm: "end", xs: "center" },
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: { md: 600, sm: 400, xs: 200 },
            position: "absolute",
            padding: { md: "50px 30px", sm: "30px 25px", xs: "1px 0" },
            backgroundColor: "#fff3e3",
            fontFamily: "Poppins",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              sx={{
                color: "#000",
                fontSize: { md: 16, sm: 16, xs: 14 },
                letterSpacing: "3px",
                fontWeight: 600,
              }}
            >
              New Arrival
            </Typography>
            <Typography
              variant="h2"
              sx={{
                margin: {
                  md: "0 100px 20px 0",
                  sm: "0 50px 10px 0",
                  xs: "0 20px 5px 0",
                },
                color: "#b88e2f",
                fontWeight: 700,
                fontSize: { md: 52, sm: 30, xs: 13 },
              }}
            >
              Discover Our New Collection
            </Typography>
            <Typography
              sx={{
                fontWeight: 550,
                fontSize: { md: "18px", sm: "16px", xs: "12px" },
                color: "#333333",
                lineHeight: { md: "24px", sm: "22px", xs: "17px" },
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: { md: "222px", sm: "180px", xs: "110px" },
                height: { md: "70px", sm: "40px", xs: "25px" },
              }}
            >
              Buy Now
            </Button>
          </CardActions>
        </Card>
      </Box>
  );
};

export default NewArrivalBanner;
