import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Nav from "./components/Nav";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="container mt-5">
      <Nav />
      <Outlet />
    </div>
  );
}
