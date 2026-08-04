import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname, location.search]);

  return children || null;
};

export default ScrollToTop;
