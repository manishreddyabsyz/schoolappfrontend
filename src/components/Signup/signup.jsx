import React, { useCallback } from "react";
import "./signup.css";
import Notification from "../notification/notification";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ecomIMG from "../../images/ecom.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const navigate = useNavigate();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const changeHandler = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    [setFormData]
  );

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password);
    const isLongEnough = password.length >= 8;

    const isStrongPassword =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      isLongEnough;
    return isStrongPassword;
  };

  const validateForm = () => {
    const newErrors = {};
    let result = validatePassword(formData.password);
    if (!formData.name) {
      newErrors.name = "Name can't  be empty";
    }
    if (!formData.password) {
      newErrors.password = "Password can't be empty";
    } else if (!result) {
      newErrors.password = "Password Must be strong";
    }
    if (!formData.role) {
      newErrors.role = "Role can't be empty";
    }

    if (!formData.email) {
      newErrors.email = "Email can't be empty";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    const { name, password, role, email } = formData;
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const response = await axios.post("http://localhost:4000/auth/signup", {
          username: name,
          password,
          role,
          email,
        });
        console.log(response, "response");
        if (response.status === 200) {
          const userrole = response?.data?.role;
          Cookies.set("role", userrole, { expires: 1 });
          setNotify({
            isOpen: true,
            message: response?.data?.message,
            type: "success",
          });

          setFormData({
            email: "",
            name: "",
            password: "",
            role: "",
          });

          // setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Login failed:", error);
        setNotify({
          isOpen: true,
          message: error?.response?.data?.message,
          type: "error",
        });
      }
    }
  };
  return (
    <main className="login-container">
      <div className="signup-image-container">
        <img src={ecomIMG} alt="login-img" className="login-image" />
      </div>
      <div className="signup-card">
        <h1 className="welcome-heading">Welcome!</h1>
        <h1 className="signup-heading">SIGN UP</h1>
        <form onSubmit={submitHandler} autoComplete="off">
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-required"
              label="Username"
              value={formData.name}
              helperText={errors.name}
              error={Boolean(errors.name)}
              name="name"
              onChange={changeHandler}
              className="user-input"
            />
            <TextField
              id="outlined-required"
              label="Email"
              value={formData.email}
              helperText={errors.email}
              error={Boolean(errors.email)}
              name="email"
              onChange={changeHandler}
              className="user-input"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              name="password"
              helperText={errors.password}
              error={Boolean(errors.password)}
              value={formData.password}
              onChange={changeHandler}
              className="user-input"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ width: "186%" }}>
                <InputLabel id="demo-simple-select-label">
                  Select role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="role"
                  value={formData.role}
                  helperText={errors.role}
                  error={Boolean(errors.role)}
                  label="Selectrole"
                  onChange={changeHandler}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button variant="contained" type="submit" className="login-btn">
              Sign Up
            </Button>
            <Box sx={{ minWidth: 120 }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "'Times New Roman', Times, serif",
                }}
              >
                Already a User?{" "}
                <span>
                  <Link to="/" style={{ color: "blue" }}>
                    SignIn{" "}
                  </Link>
                </span>
              </h3>
            </Box>
          </Box>
        </form>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </main>
  );
};

export default Signup;
