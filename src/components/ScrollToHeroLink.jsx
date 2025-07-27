// components/ScrollToHeroLink.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import { useEffect } from "react";

export default function ScrollToHeroLink({ children, className }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Trigger scroll after navigating to homepage
  useEffect(() => {
    if (location.pathname === "/" && location.state?.scrollToHero) {
      scroller.scrollTo("hero", {
        duration: 500,
        smooth: true,
        offset: -50,
      });
    }
  }, [location]);

  const handleClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on homepage, just scroll
      scroller.scrollTo("hero", {
        duration: 500,
        smooth: true,
        offset: -50,
      });
    } else {
      // Navigate to homepage and scroll after
      navigate("/", { state: { scrollToHero: true } });
    }
  };

  return (
    <a href="/" onClick={handleClick} className={className} role="link">
      {children}
    </a>
  );
}
