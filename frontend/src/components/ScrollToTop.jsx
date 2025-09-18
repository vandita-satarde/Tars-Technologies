import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top
  }, [pathname]); // runs every time the path changes

  return null; // no UI needed
}

export default ScrollToTop;
