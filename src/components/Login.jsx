import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://jp-dev.cityremit.global/web-api/config/v1/auths/login",
        {
          login_id: loginId,
          login_password: password,
          ip_address: "182.93.95.159",
        }
      );
      const jwt_token = response.data.data[0].jwt_token;
      if (jwt_token) {
        setIsLoggedIn(true);
      }
      localStorage.setItem("jwt_token", jwt_token);
      window.location.href = "/dashboard";
      // navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Snackbar>test</Snackbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 5,
          boxShadow: 3,
          borderRadius: 2,
          justifyContent: "center",
        }}
      >
        <Box my={2}>
          <Typography
            component="h1"
            variant="h5"
            fontWeight={"bold"}
            color={"GrayText"}
          >
            Login
          </Typography>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
        <Box
          component="form"
          sx={{
            mt: 1,
            maxWidth: 400,
            mx: "auto",
            px: 2,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            variant="standard"
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MailOutlineIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" justifyContent="space-between" my={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="secondary"
                  size="small"
                />
              }
              label={<Typography variant="body2">Remember me</Typography>}
            />
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="#9C27B0">
                Forgot Password?
              </Typography>
            </Link>
          </Stack>
          <Stack justifyContent="center" direction="row" my={5}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogin}
              sx={{
                borderRadius: 50,
                width: 100,
              }}
              size="large"
              disabled={isLoading}
            >
              Login
              {/* {isLoading ? 'Logging in...' : 'Login'} */}
            </Button>
          </Stack>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body"> Don't have an account? </Typography>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                sx={{ fontWeight: "bold" }}
                color="#9C27B0"
              >
                Sign Up
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
