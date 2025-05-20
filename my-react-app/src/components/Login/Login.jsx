import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  InputBase,
  GlobalStyles,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { fetchUserCart } from "../../redux/slices/cartSlice";
import { getUserWishlist } from "../../redux/slices/wishlistSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (resultAction.type === "auth/login/fulfilled") {
        await dispatch(fetchUserCart());
        await dispatch(getUserWishlist(resultAction.payload.token));
        navigate("/home");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const inputBoxStyle = {
    display: "flex",
    alignItems: "center",
    border: "1px solid #447111",
    borderRadius: 2,
    px: 2,
    py: 1,
    mb: 2,
    backgroundColor: "transparent",
    backdropFilter: "blur(5px)",
    "&:focus-within": {
      borderColor: "#6B9F3C",
    },
    position: "relative",
  };

  return (
    <>
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          body: { margin: 0, padding: 0, height: "100%", overflow: "hidden" },
          "#root": { height: "100%", overflow: "hidden" },
        }}
      />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: "url('/login_1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            borderRadius: 4,
            overflow: "hidden",
            width: { xs: "90%", sm: "90%", md: "800px" },
            maxHeight: "100vh",
          }}
        >
          {/* Left side - Login Form */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflowY: "auto",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 80, width: 80, mx: "auto" }}
            />
            <Typography
              variant="h5"
              color="#447111"
              mb={1}
              textAlign="center"
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              color="#6B9F3C"
              mb={3}
              textAlign="center"
            >
              Login to your account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={inputBoxStyle}>
                <Email sx={{ color: "gray", mr: 1 }} />
                <InputBase
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box sx={inputBoxStyle}>
                <Lock sx={{ color: "gray", mr: 1 }} />
                <InputBase
                  id="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: 10,
                    top: 10,
                  }}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "gray" }} />
                  ) : (
                    <Visibility sx={{ color: "gray" }} />
                  )}
                </Box>
              </Box>

              <Box textAlign="left" mt={1}>
                <Link
                  to="/forgot-password"
                  style={{
                    color: "#447111",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  mt: 3,
                  backgroundColor: "#447111",
                  "&:hover": { backgroundColor: "#6B9F3C" },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              )}
            </form>

            <Typography variant="body2" mt={3} textAlign="center">
              Don't have an account?{" "}
              <Box
                component={Link}
                to="/signup"
                sx={{
                  color: "#447111",
                  cursor: "pointer",
                  fontWeight: 500,
                  borderBottom: "2px solid #447111",
                  textDecoration: "none",
                }}
              >
                Sign up
              </Box>
            </Typography>
          </Box>

          {/* Right side - Image (Hidden on xs/sm) */}
          <Box
            sx={{
              flex: 1,
              display: { xs: "none", sm: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/about_2.jpg"
              alt="Login Background"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Paper>
      </Box>
    </>
  );
}
