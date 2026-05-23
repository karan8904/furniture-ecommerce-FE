# Furniture E-Commerce Frontend

React frontend for a furniture e-commerce application. The app includes public shopping pages, user account flows, checkout, wishlist, and an admin dashboard for managing products, categories, orders, users, and charges.

## Tech Stack

- React 19 with Vite
- React Router
- Redux Toolkit
- Material UI
- Formik and Yup
- Axios
- Stripe
- Cloudinary-hosted UI assets

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_BASEURL="http://localhost:5000"
VITE_STRIPE_KEY="your_stripe_publishable_key"
VITE_CLOUDINARY_IMAGE_BASEURL="https://res.cloudinary.com/dwojsioxr/image/upload"
```

Run the development server:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Main Features

- Home, shop, category, and single-product pages
- User registration, login, forgot-password, and reset-password flows
- Protected cart, checkout, orders, wishlist, settings, and profile pages
- Address management
- Stripe checkout integration
- Admin dashboard with product, category, order, user, and charge management
- Redux slices for auth, products, categories, cart, wishlist, orders, reviews, addresses, and snackbar state

## Project Structure

```text
src/
  api/          Axios setup
  app/          Redux store
  components/   Shared UI components
  constants/    Shared constants like hosted asset URLs
  pages/        Route pages
  slices/       Redux Toolkit slices
```

## Notes

- API requests use `VITE_BASEURL` from `.env`.
- UI image assets are loaded from Cloudinary through `src/constants/assetUrls.js`.
- Auth tokens are read from cookies and attached to Axios requests.
