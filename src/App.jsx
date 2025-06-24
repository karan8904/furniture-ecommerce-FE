import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { getCurrentUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")){
      let token = localStorage.getItem("token")
      dispatch(getCurrentUser(token))
    }
  },[])
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
