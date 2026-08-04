import { useEffect } from "react";
import { Outlet } from "react-router";
import { getCurrentUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(Cookies.get("token")){
      let token = Cookies.get("token")
      dispatch(getCurrentUser(token))
    }
  },[])
  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
}

export default App;
