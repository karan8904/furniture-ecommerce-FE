import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
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
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "/shop", Component: Shop },
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
      { path: "/forgot-password", Component: ForgotPassword },
      { path: "/single-product", Component: SingleProduct},
      { path: "/cart", Component: Cart},
      { path: "/checkout", Component: Checkout},
      { path: "/password-reset/:userId/:token", Component: ResetPassword },
      { path: "/admin", Component: Admin},
      { path: "/admin/add-category", Component: AddCategory},
      { path: "/admin/add-product", Component: AddProduct},
      { path: "/admin/edit-category/:id", Component: EditCatgory },
      { path: "/admin/edit-product/:id", Component: EditProduct },
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
