import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../slices/userSlice";
import { getProducts } from "../../slices/productSlice";
import { getCategories } from "../../slices/categorySlice";
import {
  dailyOrdersCount,
  getOrders,
  orderStatusCount,
} from "../../slices/orderSlice";
import OrdersLineChart from "./ordersLineChart";
import OrdersBarChart from "./OrdersBarChart";

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.getAllUsers.users);
  const products = useSelector((state) => state.product.getProducts.products);
  const categories = useSelector(
    (state) => state.category.getCategories.categories
  );
  const dailyOrderData = useSelector(
    (state) => state.order.dailyOrdersCount.data
  );
  const totalOrders = useSelector(
    (state) => state.order.getOrders.orders
  ).length;
  const orderStatusData = useSelector(
    (state) => state.order.orderStatusCount.data
  );
  const deliveredOrders = orderStatusData.map((order) => {
    if (order._id === "Delivered") return order.totalOrders;
  });
  const pendingOrders = orderStatusData
    .filter((order) => order._id !== "Delivered")
    .reduce((total, order) => total + order.totalOrders, 0);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(dailyOrdersCount());
    dispatch(orderStatusCount());
  }, []);

  useEffect(() => {
    if (dailyOrderData && dailyOrderData.length > 0) {
      setLineChartData({
        labels: dailyOrderData.map((order) => order._id),
        datasets: [
          {
            label: "Orders",
            data: dailyOrderData.map((order) => order.totalOrders),
            borderColor: "#36a2eb",
            backgroundColor: "#36a2eb",
            tension: 0.4,
          },
        ],
      });
    }
  }, [dailyOrderData]);

  useEffect(() => {
    if (orderStatusData && orderStatusData.length > 0) {
      const colors = orderStatusData.map((order) => {
        if (order._id === "Placed") return "#36a2eb";
        if (order._id === "Delivered") return "#4bc0c0";
        if (order._id === "Shipped") return "#ff9f40";
        if (order._id === "Cancelled") return "#ff6384";
        return "#888888";
      });

      setBarChartData({
        labels: orderStatusData.map((order) => order._id),
        datasets: [
          {
            label: "Orders",
            data: orderStatusData.map((order) => order.totalOrders),
            borderColor: "#36a2eb",
            backgroundColor: colors,
            tension: 0.4,
          },
        ],
      });
    }
  }, [orderStatusData]);

  return (
    <Grid container rowGap={2}>
      <Grid container size={12}>
        <Grid size={12}>
          <Box display="flex">
            <Typography fontSize="25px" fontWeight="550">
              Dashboard
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Divider />
      </Grid>
      <Grid container size={12} columnGap={5} marginTop="20px">
        <Grid size={{ xs: 12, sm: 6, md: 3.5}}>
          <Box
            display="flex"
            justifyContent="space-between"
            padding="25px 30px"
            borderRadius={5}
            height="130px"
            bgcolor="#feab6a"
          >
            <Box sx={{ color: "#f9f9f9" }}>
              <Typography fontSize="25px" fontWeight={600}>
                This Months Orders
              </Typography>
              <Typography fontSize="23px" fontWeight={550}>
                {totalOrders}
              </Typography>
              <Typography fontSize="17px">
                Delivered Orders: {deliveredOrders}
              </Typography>
              <Typography fontSize="17px">Pending Orders: {pendingOrders}</Typography>
            </Box>
            <Box display="flex" alignItems="end">
              <ShoppingCartIcon fontSize="large" sx={{ color: "white" }} />
            </Box>
          </Box>
        </Grid>
        <Grid size={3.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            padding="25px 30px"
            borderRadius={5}
            minHeight="130px"
            bgcolor="#777efc"
          >
            <Box sx={{ color: "#f9f9f9" }}>
              <Typography fontSize="25px" fontWeight={600}>
                Total Users
              </Typography>
              <Typography fontSize="23px" fontWeight={550}>
                {users?.length}
              </Typography>
            </Box>
            <Box display="flex" alignItems="end">
              <GroupIcon fontSize="large" sx={{ color: "white" }} />
            </Box>
          </Box>
        </Grid>
        <Grid size={3.5}>
          <Box
            display="flex"
            justifyContent="space-between"
            padding="25px 30px"
            borderRadius={5}
            minHeight="130px"
            bgcolor="#fb7f94"
          >
            <Box sx={{ color: "#f9f9f9" }}>
              <Typography fontSize="25px" fontWeight={600}>
                Products
              </Typography>
              <Typography fontSize="20px" fontWeight={550}>
                Total Products: {products?.length}
              </Typography>
              <Typography fontSize="17px" fontWeight={500}>
                Categories: {categories?.length}
              </Typography>
            </Box>
            <Box display="flex" alignItems="end">
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                height="38px"
                width="38px"
              >
                <title>Product</title>
                <g fill="white" stroke="white" strokeWidth="2">
                  <path
                    d="M192,0 L384,110.85 L384,332.55 L192,443.4 L0,332.55 L0,110.85 L192,0 Z
                    M128,206.92 L128,357.19 L170.67,381.82 L170.67,231.55 L128,206.92 Z
                    M42.67,157.65 L42.67,307.92 L85.33,332.56 L85.33,182.29 L42.67,157.65 Z
                    M275.99,97.76 L150.41,170.60 L192,194.61 L317.87,121.94 L275.99,97.76 Z
                    M192,49.27 L66.13,121.94 L107.80,145.99 L233.37,73.15 L192,49.27 Z"
                  />
                </g>
              </svg>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container size={12} marginTop="40px" columnSpacing={3}>
        <Grid size={6}>
          <Box>
            <Typography fontSize="20px" fontWeight={550}>
              Daily Orders
            </Typography>
          </Box>
          {dailyOrderData.length > 0 && (
            <OrdersLineChart chartData={lineChartData} />
          )}
        </Grid>
        <Grid size={6}>
          <Box>
            <Typography fontSize="20px" fontWeight={550}>
              Orders per Status
            </Typography>
          </Box>
          {orderStatusCount.length > 0 && (
            <OrdersBarChart chartData={barChartData} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
