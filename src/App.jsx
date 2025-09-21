import { useEffect } from "react";
import { Outlet } from "react-router";
import { getCurrentUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(Cookies.get("token")){
      let token = Cookies.get("token")
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
