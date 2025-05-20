import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Container,
    Typography,
    Grid,
    InputBase,
    IconButton,
    Paper,
    GlobalStyles,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Lock } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    sendForgotPasswordOTP,
    verifyForgotPasswordOTP,
    forgotPassword,
} from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isOtpExpired, setIsOtpExpired] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {
        let countdown;
        if (isEmailSent && !isOtpExpired) {
            countdown = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown);
                        setIsOtpExpired(true);
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdown);
    }, [isEmailSent, isOtpExpired]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && e.target.value === "" && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").split("");
        paste.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        });
    };

    const onSubmitEmail = (e) => {
        e.preventDefault();
        setIsEmailSent(true);
        setIsOtpExpired(false);
        setTimer(120);
        dispatch(sendForgotPasswordOTP({ email }))
            .unwrap()
            .then(() => alert("OTP sent to " + email))
            .catch(err => alert("Error sending OTP: " + err.message));
    };

    const onResendOtp = () => {
        setTimer(120);
        setIsOtpExpired(false);
        dispatch(sendForgotPasswordOTP({ email }));
    };

    const onSubmitOTP = (e) => {
        e.preventDefault();
        const enteredOtp = inputRefs.current.map(el => el.value).join("");
        setOtp(enteredOtp);
        dispatch(verifyForgotPasswordOTP({ email, otp: enteredOtp }))
            .unwrap()
            .then(response => {
                if (response.success) {
                    setIsOtpSubmitted(true);
                    alert("OTP verified successfully");
                } else {
                    setIsOtpSubmitted(false);
                    alert("Invalid OTP. Please try again.");
                }
            })
            .catch(error => {
                setIsOtpSubmitted(false);
                alert("Error verifying OTP: " + error.message);
            });
    };

    const onSubmitNewPassword = (e) => {
        e.preventDefault();
        const payload = { email, otp, newPassword };
        dispatch(forgotPassword(payload))
            .unwrap()
            .then(() => {
                alert("Password reset successful for " + email);
                navigate("/login");
            })
            .catch(err => alert("Error resetting password: " + err.message));
    };

    const inputBoxStyle = {
        display: "flex",
        alignItems: "center",
        border: "1px solid #447111",
        borderRadius: "8px",
        px: 1.5,
        py: 1,
        backgroundColor: "transparent",
        mb: 2,
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
            <Box sx={{
                minHeight: "100vh",
                width: "100%",
                backgroundImage: "url('/login_1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Container maxWidth="md">
                    {/* Email Form */}
                    {!isEmailSent && (
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                borderRadius: 4,
                                overflow: "hidden",
                                minHeight: 500,
                            }}
                        >
                            <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <form onSubmit={onSubmitEmail}>
                                    <Typography variant="h5" color="#447111" textAlign="center" gutterBottom>
                                        Reset Password
                                    </Typography>
                                    <Typography variant="body1" color="#6B9F3C" textAlign="center" sx={{ mb: 3 }}>
                                        Enter your registered email address
                                    </Typography>
                                    <Box sx={inputBoxStyle}>
                                        <EmailIcon sx={{ color: "#9c9c9c", mr: 1 }} />
                                        <InputBase
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            placeholder="Email ID"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            fullWidth
                                            sx={{ fontSize: "16px", color: "#333" }}
                                        />
                                    </Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            borderRadius: 2,
                                            mt: 2,
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#447111",
                                            "&:hover": {
                                                backgroundColor: "#6B9F3C",
                                            },
                                        }}
                                    >
                                        {loading ? "Sending..." : "Submit"}
                                    </Button>
                                </form>
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: { xs: "none", sm: "none", md: "flex" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="/forgot_password.jpg"
                                    alt="forgot_password Background"
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </Box>
                        </Paper>
                    )}

                    {/* OTP Form */}
                    {isEmailSent && !isOtpSubmitted && (
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                borderRadius: 4,
                                overflow: "hidden",
                                minHeight: 500,
                            }}
                        >
                            <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <form onSubmit={onSubmitOTP}>
                                    <Typography variant="h5" color="#447111" textAlign="center" gutterBottom>
                                        Reset Password OTP
                                    </Typography>
                                    <Typography variant="body1" color="#6B9F3C" textAlign="center" sx={{ mb: 3 }}>
                                        Enter the 6-digit code sent to your email
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: { xs: 0.5, sm: 1 },
                                            mb: 3,
                                            flexWrap: "nowrap",
                                            maxWidth: "100%",
                                        }}
                                        onPaste={handlePaste}
                                    >
                                        {Array(6).fill(0).map((_, index) => (
                                            <InputBase
                                                key={index}
                                                name={`otp-${index}`} // Add this line
                                                inputProps={{
                                                    maxLength: 1,
                                                    style: {
                                                        textAlign: "center",
                                                        width: "12vw",
                                                        maxWidth: "40px",
                                                        height: "40px",
                                                        fontSize: "18px",
                                                        borderRadius: "8px",
                                                        backgroundColor: "#f5f5f5",
                                                        border: "1px solid #ddd",
                                                    },
                                                }}
                                                inputRef={(el) => (inputRefs.current[index] = el)}
                                                onInput={(e) => handleInput(e, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                required
                                            />
                                        ))}
                                    </Box>

                                    {!isOtpExpired ? (
                                        <>
                                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                                OTP expires in: {formatTime(timer)}
                                            </Typography>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    color: "white",
                                                    borderRadius: 2,
                                                    height: "50px",
                                                    textTransform: "none",
                                                    fontWeight: "bold",
                                                    fontSize: "16px",
                                                    backgroundColor: "#447111",
                                                    "&:hover": {
                                                        backgroundColor: "#6B9F3C",
                                                    },
                                                }}
                                            >
                                                {loading ? "Verifying..." : "Submit"}
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            onClick={onResendOtp}
                                            sx={{
                                                color: "white",
                                                borderRadius: 2,
                                                height: "50px",
                                                textTransform: "none",
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                backgroundColor: "#447111",
                                                "&:hover": {
                                                    backgroundColor: "#6B9F3C",
                                                },
                                            }}
                                        >
                                            Resend OTP
                                        </Button>
                                    )}
                                </form>
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: { xs: "none", sm: "none", md: "flex" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="/otp.jpg"
                                    alt="Otp Background"
                                    style={{ width: "100%", height: "100%", }}
                                />
                            </Box>
                        </Paper>
                    )}

                    {/* New Password Form */}
                    {isOtpSubmitted && (
                        <Paper
                            elevation={3}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                borderRadius: 4,
                                overflow: "hidden",
                                minHeight: 500,
                            }}
                        >
                            <Box sx={{ flex: 1, p: { xs: 3, md: 4 }, backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <form onSubmit={onSubmitNewPassword}>
                                    <Typography variant="h5" color="#447111" textAlign="center" gutterBottom>
                                        New Password
                                    </Typography>
                                    <Typography variant="body1" color="#6B9F3C" textAlign="center" sx={{ mb: 3 }}>
                                        Enter your new password
                                    </Typography>
                                    <Box sx={inputBoxStyle}>
                                        <Lock sx={{ color: "#9c9c9c", mr: 1 }} />
                                        <InputBase
                                            id="password"
                                            name="password"
                                            autoComplete="new-password"
                                            placeholder="New Password"
                                            type={showPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            fullWidth
                                            sx={{ fontSize: "16px", color: "#333" }}
                                        />
                                        <IconButton
                                            edge="end"
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: "#9c9c9c" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </Box>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            color: "white",
                                            borderRadius: 2,
                                            mt: 2,
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            backgroundColor: "#447111",
                                            "&:hover": {
                                                backgroundColor: "#6B9F3C",
                                            },
                                        }}
                                    >
                                        {loading ? "Resetting..." : "Submit"}
                                    </Button>
                                </form>
                            </Box>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: { xs: "none", sm: "none", md: "flex" },
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src="/new_password.jpg"
                                    alt="password Background"
                                    style={{ width: "100%", height: "100%", }}
                                />
                            </Box>
                        </Paper>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default ForgotPassword;
