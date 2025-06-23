import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoImage from "../assets/images/logo/escavox_logo.svg";

import bg1 from "../assets/images/backgrounds/avac_nobg.jpg";
import bg2 from "../assets/images/backgrounds/background-1.jpg";
import bg3 from "../assets/images/backgrounds/background-2.jpg";
import bg4 from "../assets/images/backgrounds/background-3.jpg";
import bg5 from "../assets/images/backgrounds/background-4.jpg";
import bg6 from "../assets/images/backgrounds/background-5.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [background, setBackground] = useState("");

  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6];

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");
      navigate("/trackinsights");
    } else {
      toast.error("Invalid credentials");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/trackinsights");
    }
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackground(backgrounds[randomIndex]);
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: `url(${background}) center center fixed`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "122vh",
        backgroundRepeat: "repeat",
        backgroundRepeat: "repeat",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 300,
          height: 510,
          padding: 4,
          textAlign: "center",
          background: "linear-gradient(to bottom, transparent 0%, #dee2e6 30%, #dee2e6 80%)",

        }}
      >
        <Box mb={2}>
          <img
            src={logoImage}
            alt="Escavox Logo"
            style={{ height: "200px", marginBottom: 5 }}
          />
        </Box>

        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ color: "#3E749B", fontFamily: "Candara,Calibri,sans-serif" }}>
            WELCOME
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter your mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#2c5878"}} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: "#E8FOFE",
              },
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px", // Make border thicker here
                },
                "&:hover fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px",
                },
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#2c5878" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: "#E8FOFE",
              },
            }}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px", // Make border thicker here
                },
                "&:hover fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3E749B",
                  borderWidth: "2px",
                },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              width: "150px",
              borderRadius: 2,
              backgroundColor: "#2c5878",
              fontSize: 16,
              paddingY: 1,
              "&:hover": {
                backgroundColor: "#1d3f5a",
              },
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Box mt={1}>
            <Link href="#" underline="hover" sx={{ fontSize: 13, fontFamily: "Candara, Calibri, sans-serif;", fontWeight: 900, color: "#3e749b" }}>
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
