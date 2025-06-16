import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../slices/snackbarSlice";

const SnackBarTrigger = ({children}) => {
  const { severity, message, open } = useSelector((state) => state.snackbar)
  const dispatch = useDispatch()
  if(open){
    setTimeout(() => {
      dispatch(hideSnackbar())
    }, 5000)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        >
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      {children}    
    </>
  );
};

export default SnackBarTrigger;
