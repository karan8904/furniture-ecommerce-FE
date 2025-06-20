import React, { useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Grid,
  SwipeableDrawer,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import logo from "../assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ShopIcon from "@mui/icons-material/Shop";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [state, setState] = useState({ right: false });
  const [userMenu, setuserMenu] = React.useState(null);
  const openUserMenu = Boolean(userMenu);
  const handleUserMenuClick = (event) => {
    setuserMenu(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setuserMenu(null);
  };
  const navigate = useNavigate();

  const linkStyle = { color: "#000", textDecoration: "none" };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ right: open });
  };
  return (
    <Box
      sx={{
        margin: {
          xs: "15px 0px 15px 20px",
          sm: "15px 5px 15px 35px",
          md: "15px 60px 15px 50px",
        },
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, sm: 30, md: 20 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        display="flex"
        justifyContent="space-around"
      >
        <Grid size={{ xs: 2, sm: 4, md: 2 }}>
          <Stack direction="row" gap="5px">
            <img src={logo} alt="" height="34px" width="45px" />
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              Furniro
            </Typography>
          </Stack>
        </Grid>

        <Grid
          container
          size={{ md: 6 }}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <Stack direction="row" gap="57px" sx={{ margin: "5px auto" }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              <Link to="/shop" style={linkStyle}>
                Shop
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              <Link to="/about" style={linkStyle}>
                About
              </Link>
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              <Link to="/contact" style={linkStyle}>
                Contact
              </Link>
            </Typography>
          </Stack>
        </Grid>

        <Grid
          size={{ md: 3 }}
          sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
        >
          <Stack
            direction="row"
            sx={{ fontWeight: "500", gap: { lg: "20px", md: "10px" } }}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton
              id="user-button"
              aria-controls={openUserMenu ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openUserMenu ? "true" : undefined}
              onClick={handleUserMenuClick}
            >
              <PermIdentityIcon />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={userMenu}
              open={openUserMenu}
              onClose={handleUserMenuClose}
              slotProps={{
                list: {
                  "aria-labelledby": "user-button",
                },
              }}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
          </Stack>
        </Grid>

        <Grid
          size={{ xs: 2, sm: 4 }}
          sx={{ display: { xs: "flex", md: "none" }, justifyContent: "end" }}
        >
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon sx={{ color: "black" }} />
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List>
              <ListItem>
                <ListItemButton onClick={() => navigate("/")}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton onClick={() => navigate("/about")}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton onClick={() => navigate("/shop")}>
                  <ListItemIcon>
                    <ShopIcon />
                  </ListItemIcon>
                  <ListItemText primary="Shop" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton onClick={() => navigate("/cart")}>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cart" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </SwipeableDrawer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Navbar;
