import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ForgotPassword from './pages/ForgotPassword.jsx'
import SingleProduct from './pages/SingleProduct.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import SnackBarTrigger from './components/SnackBarTrigger.jsx'
import "@fontsource/poppins";
import Admin from './pages/AdminPages/Admin.jsx'
import AddCategory from './pages/AdminPages/AddCategory.jsx'
import AddProduct from './pages/AdminPages/AddProduct.jsx'
import EditCatgory from './pages/AdminPages/EditCatgory.jsx'
import EditProduct from './pages/AdminPages/EditProduct.jsx'
import ProductsFromCategory from './pages/ProductsFromCategory.jsx'
import { AdminRoutes, ProtectedRoutes } from '../utils/RoutesAuth.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Orders from './pages/Orders.jsx'
import Settings from './pages/Settings.jsx'
import EditAddress from './pages/EditAddress.jsx'
import AddAddress from './pages/AddAddress.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import Wishlist from './pages/Wishlist.jsx'

const theme = createTheme({
  palette: {
    primary: {
      main: "#B88E2F",
    },
    secondary: {
      main: "#9F9F9F"
    },
    custom: {
      bannerColor: "#F9F1E7",
      dropDownBg: "#fff"
    }
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/categories", Component: Categories },
      { path: "/contact", Component: Contact },
      { path: "/shop", Component: Shop },
      { path: "/category/:id", Component: ProductsFromCategory},
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "/forgot-password", Component: ForgotPassword },
      { path: "/single-product/:id", Component: SingleProduct},
      { path: "/wishlist", element: <ProtectedRoutes><Wishlist /></ProtectedRoutes>},
      { path: "edit-address/:id", element: <ProtectedRoutes><EditAddress></EditAddress></ProtectedRoutes>},
      { path: "add-address/:addressType", element: <ProtectedRoutes><AddAddress /></ProtectedRoutes>},
      { path: "/profile", element: <ProtectedRoutes><UserProfile /></ProtectedRoutes> },
      { path: "/orders", element: <ProtectedRoutes><Orders /></ProtectedRoutes>},
      { path: "/payment/success", element: <ProtectedRoutes><PaymentSuccess /></ProtectedRoutes>},
      { path: "/settings", element: <ProtectedRoutes><Settings /></ProtectedRoutes>},
      { path: "/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes>},
      { path: "/checkout",element: <ProtectedRoutes><Checkout /></ProtectedRoutes>},
      { path: "/password-reset/:userId/:token", Component: ResetPassword },
      { path: "/admin", element: <AdminRoutes><Admin /></AdminRoutes>},
      { path: "/admin/add-category", element: <AdminRoutes><AddCategory /></AdminRoutes>},
      { path: "/admin/add-product", element: <AdminRoutes><AddProduct /></AdminRoutes>},
      { path: "/admin/edit-category/:id", element: <AdminRoutes><EditCatgory /></AdminRoutes> },
      { path: "/admin/edit-product/:id", element: <AdminRoutes><EditProduct /></AdminRoutes> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackBarTrigger>
            <RouterProvider router={router} />
          </SnackBarTrigger>
        </ThemeProvider>
      </Provider>
  </StrictMode>,
)
