import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Page Not Found</div>,
    children: [],
  },
]);

export default router;
