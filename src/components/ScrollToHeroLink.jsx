import { Link, useLocation } from "react-router-dom";

// Goes to the homepage; if already there, smoothly scrolls back to the top.
export default function ScrollToHeroLink({ children, className, ...rest }) {
  const { pathname } = useLocation();

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link to="/" onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
