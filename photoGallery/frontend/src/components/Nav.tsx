import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    document.querySelector("html")?.setAttribute("data-bs-theme", theme);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="https://picsum.photos/200" className="rounded" width="50px" />
        <span className="ms-2">Photo Gallery</span>
      </Link>
      <div className="navbar-nav d-flex flex-row gap-3">
        <Link to="/photoadd" className="nav-link">
          <i className="bi bi-plus-circle"></i>
        </Link>
        <button className="btn btn-sm" onClick={toggleTheme}>
          <i className={theme === "light" ? "bi bi-sun" : "bi bi-moon"}></i>
        </button>
      </div>
    </nav>
  );
}
