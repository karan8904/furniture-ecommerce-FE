import React, { useEffect, useState } from "react";
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
  Badge,
  Avatar,
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
import { useSelector, useDispatch } from "react-redux";
import { showSnackbar } from "../slices/snackbarSlice";
import { logoutUser } from "../slices/userSlice";
import { getCartProducts, resetCart } from "../slices/cartSlice";

const Navbar = () => {
  const [state, setState] = useState({ right: false });
  const [userMenu, setuserMenu] = React.useState(null);

  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASEURL
  const user = useSelector((state) => state.user.getCurrentUser.user);
  const userLoading = useSelector((state) => state.user.getCurrentUser.loading)
  const products = useSelector((state) => state.cart.getCartProducts.products);

  useEffect(() => {
    if (user?._id) dispatch(getCartProducts(user._id));
  }, [user]);

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

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      dispatch(resetCart());
      dispatch(showSnackbar({ message: "Logout successfully." }));
      navigate("/");
    } catch (error) {
      dispatch(
        showSnackbar({
          severity: error,
          message: "Cannot logout. Try again...",
        })
      );
    }
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
        justifyContent="space-evenly"
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
              <Link to="/categories" style={linkStyle}>
                Categories
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
          <Box
            display="flex"
            sx={{ fontWeight: "500", gap: { lg: "10px", md: "10px" } }}
            alignItems="center"
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
            {user && Object.keys(user).length !== 0 && (
              <>
                <IconButton onClick={() => navigate("/wishlist")}>
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton onClick={() => navigate("/cart")}>
                  <Badge badgeContent={products?.length} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Box display="flex" alignItems="center">
                  <Typography fontSize="15px">{user?.firstName}</Typography>
                  <IconButton onClick={(e) => handleUserMenuClick(e)}>
                    <Avatar
                      src={user?.profilePicture && `${baseURL}/${user.profilePicture}`}
                      sx={{
                        bgcolor: (theme) => theme.palette.primary.main,
                        height: "35px",
                        width: "35px",
                      }}
                    >
                      {user.firstName[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Box>
              </>
            )}
            {!userLoading && (!user || Object.keys(user).length === 0) && (
              <>
                <Typography fontSize="15px" sx={{ fontWeight: "500" }}>
                  <Link to="/register" style={linkStyle}>
                    Register
                  </Link>
                </Typography>
                <Typography fontSize="15px" sx={{ fontWeight: "500" }}>
                  <Link to="/login" style={linkStyle}>
                    Login
                  </Link>
                </Typography>
              </>
            )}
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
              {user?.firstName
                ? [
                    <MenuItem
                      key="profile"
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/profile")
                      }}
                    >
                      Profile
                    </MenuItem>,
                    <MenuItem
                      key="orders"
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/orders")
                      }}
                    >
                      Orders
                    </MenuItem>,
                    <MenuItem
                      key="settings"
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/settings")
                      }}
                    >
                      Settings
                    </MenuItem>,
                    <MenuItem
                      key="logout"
                      onClick={() => {
                        handleUserMenuClose();
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="register"
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/register");
                      }}
                    >
                      Register
                    </MenuItem>,
                    <MenuItem
                      key="login"
                      onClick={() => {
                        handleUserMenuClose();
                        navigate("/login");
                      }}
                    >
                      Login
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
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
                <ListItemButton onClick={() => navigate("/categories")}>
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
