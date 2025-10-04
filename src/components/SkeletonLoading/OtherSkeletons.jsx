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

export const SingleProductSkeleton = () => {
  return (
    <Grid container columnSpacing={2} marginTop={2} rowSpacing={1}>
      <Grid
        size={{ xs: 12, sm: 12, md: 6 }}
        display="flex"
        justifyContent={{
          xs: "space-around",
          sm: "space-around",
          md: "space-evenly",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "76px",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                width={73}
                height={76}
                sx={{ borderRadius: "10px" }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            width: { xs: "230px", sm: "400px", md: "390px", lg: "423px" },
            maxHeight: { xs: "300px", sm: "390px", md: "400px" },
            marginTop: "16px",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ borderRadius: "10px" }}
          />
        </Box>
      </Grid>

      <Grid item sm={12} md={6} padding="0 20px">
        <Box marginTop="15px">
          <Skeleton variant="text" width="70%" height={50} />

          <Box display="flex" gap="30px" marginTop={2}>
            <Skeleton variant="text" width="25%" height={35} />
            <Skeleton variant="text" width="15%" height={30} />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            marginTop="10px"
            width={{ xs: "220px", sm: "230px", md: "250px" }}
          >
            <Skeleton variant="text" width="40%" height={25} />
            <Skeleton variant="text" width="50%" height={25} />
          </Box>

          <Box marginTop="10px">
            <Skeleton variant="text" width="95%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="85%" height={20} />
          </Box>

          <Box marginTop="20px">
            <Typography fontSize="14px" color="secondary">
              <Skeleton variant="text" width={60} height={25} />
            </Typography>
            <Box display="flex" gap={2} marginTop={1}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={50}
                  height={35}
                  sx={{ borderRadius: "6px" }}
                />
              ))}
            </Box>
          </Box>

          <Box marginTop="20px">
            <Typography fontSize="14px" color="secondary">
              <Skeleton variant="text" width={60} height={25} />
            </Typography>
            <Box display="flex" gap={2}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={40}
                  height={40}
                />
              ))}
            </Box>
          </Box>

          <Box
            marginTop="20px"
            display="flex"
            alignItems="center"
            gap={2}
            flexWrap="wrap"
          >
            <Skeleton
              variant="rectangular"
              width={100}
              height={40}
              sx={{ borderRadius: "10px" }}
            />
            <Skeleton
              variant="rectangular"
              width={120}
              height={40}
              sx={{ borderRadius: "15px" }}
            />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
