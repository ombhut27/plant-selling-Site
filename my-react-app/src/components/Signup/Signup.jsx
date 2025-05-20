import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  InputBase,
  GlobalStyles,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = { email, password, username };
    try {
      const actionResult = await dispatch(registerUser(payload));
      if (actionResult.type === "auth/register/fulfilled") {
        navigate("/home");
      }
    } catch (err) {
      console.error("Registration failed:", err);
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
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            width: { xs: "90%", sm: "90%", md: "800px" },
            maxHeight: "100vh",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {/* Left: Sign-up Form */}
          <Box
            sx={{
              flex: 1,
              p: 4,
              backgroundColor: "rgba(255,255,255,0.9)",
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
            <Typography variant="h5" color="#447111" mb={1} textAlign="center">
              Register
            </Typography>
            <Typography
              variant="body1"
              color="#6B9F3C"
              mb={3}
              textAlign="center"
            >
              Create your new account
            </Typography>

            <form onSubmit={handleRegister}>
              <Box sx={inputBoxStyle}>
                <AccountCircle sx={{ color: "gray", mr: 1 }} />
                <InputBase
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  autoComplete="name"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ color: "#000", backgroundColor: "transparent" }}
                />
              </Box>

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
                  sx={{ color: "#000", backgroundColor: "transparent" }}
                />
              </Box>

              <Box sx={{ ...inputBoxStyle, position: "relative" }}>
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
                  sx={{ color: "#000", backgroundColor: "transparent" }}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: 10,
                    top: 12,
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

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 3,
                  backgroundColor: "#447111",
                  "&:hover": {
                    backgroundColor: "#6B9F3C",
                  },
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                }}
                disabled={loading}
              >
                {loading ? "Registering..." : "Sign Up"}
              </Button>

              {error && (
                <Typography color="error" mt={2}>
                  {error}
                </Typography>
              )}

              <Typography variant="body2" mt={3}>
                Already have an account?{" "}
                <Box
                  component={Link}
                  to="/login"
                  sx={{
                    color: "#447111",
                    cursor: "pointer",
                    fontWeight: 500,
                    borderBottom: "2px solid #447111",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Box>
              </Typography>
            </form>
          </Box>

          {/* Right: Image (hidden on xs and sm) */}
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
              src="/about_1.jpg"
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
