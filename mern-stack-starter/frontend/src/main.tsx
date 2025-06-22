import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import SignInPage from "./pages/auth/SignIn";
import SignUpPage from "./pages/auth/SignUp";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import EmailVerified from "./pages/auth/EmailVerified";
import App from "./App";
import "./assets/main.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/auth">
                    <Route path="/auth/sign-in" element={<SignInPage />} />
                    <Route path="/auth/sign-up" element={<SignUpPage />} />
                    <Route
                        path="/auth/reset-password"
                        element={<ResetPasswordPage />}
                    />
                    <Route
                        path="/auth/email-verified"
                        element={<EmailVerified />}
                    />
                </Route>
                <Route path="/" element={<App />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    </StrictMode>
);
