import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  const isSignUpPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const isForgotPassword = location.pathname === "/forgot-password";

  return (
    <div>
      {!isSignUpPage && !isLoginPage && !isForgotPassword && <Header />}
      <main>{children}</main>
      {!isSignUpPage && !isLoginPage && !isForgotPassword && <Footer />}
    </div>
  );
};

export default Layout;
