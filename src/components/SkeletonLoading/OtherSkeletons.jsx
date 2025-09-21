import React from "react";
import { Grid, Card, CardMedia, CardContent, Box, Typography, Avatar, IconButton, Skeleton } from "@mui/material";

export const ProductCardSkeleton = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Grid key={index} size={{ md: 3, sm: 4, xs: 12 }}>
          <Card sx={{ cursor: "pointer" }}>
            <CardMedia sx={{ height: 301, position: "relative" }}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
              <Avatar
                sx={{
                  backgroundColor: "#e0e0e0",
                  fontSize: 14,
                  position: "absolute",
                  top: 18,
                  right: 18,
                  width: 40,
                  height: 40,
                }}
              >
                <Skeleton variant="circular" width={40} height={40} sx={{ borderRadius: "50%"}} />
              </Avatar>
            </CardMedia>

            <CardContent sx={{ backgroundColor: "#F4F5F7" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Skeleton variant="text" width="60%" height={30} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>

              <Skeleton variant="text" width="40%" height={20} />

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <Skeleton variant="text" width="50%" height={30} />
                <Skeleton variant="text" width="30%" height={25} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export const CategorySkeleton = ({ count = 3 }) => {
  return (
    <>
    {Array.from({ length: count }).map((_, index) => (
      <Grid size={{ md: 4, sm: 6, xs: 12 }} key={index} marginBottom={5}>
        <Box display="flex" justifyContent="center">
          <Skeleton variant="rounded" height="350px" width="270px" sx={{ borderRadius: "10px" }}/>
        </Box>
      </Grid>
    ))}
    </> 
  )
}
