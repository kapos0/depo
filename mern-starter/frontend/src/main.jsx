import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import EmailVerified from "./pages/auth/EmailVerified";
import Navbar from "./components/Navbar";
import App from "./App";
import "./assets/base.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/auth">
                    <Route path="/auth/sign-in" element={<SignIn />} />
                    <Route path="/auth/sign-up" element={<SignUp />} />
                    <Route
                        path="/auth/email-verified"
                        element={<EmailVerified />}
                    />
                    <Route
                        path="/auth/reset-password"
                        element={<ResetPassword />}
                    />
                    <Route
                        path="/auth/forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>
                <Route path="/" element={<App />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    </StrictMode>
);
