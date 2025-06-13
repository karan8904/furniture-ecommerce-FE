import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' 
import { store } from './app/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from './pages/ForgotPassword'
import SingleProduct from './pages/SingleProduct.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import "@fontsource/poppins";

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
      { path: "/checkout", Component: Checkout}
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
  </StrictMode>,
)
