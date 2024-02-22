import React, { useCallback } from "react";
import "./login.css";
import Notification from "../notification/notification";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ecomIMG from "../../images/ecom.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from "axios";
import Cookies from "js-cookie";
import { styles } from "../ReuseableStyles/styles";
const Login = ({ setIsAuthenticated,isAuthenticated }) => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const role=Cookies.get("role");
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

  useEffect(()=>{
  
    if(isAuthenticated){
          navigate(`/${role}/dashboard`)
    }

  },[isAuthenticated,navigate])

  console.log("login");
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
    }

    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    const { name, password } = formData;
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username: name,
        password,
      });
      console.log(response, "response");
      if (response.status === 200) {
        console.log("hello")
        const refreshToken = response.data.refreshToken;
        const accessToken=response.data.accessToken;
        const userrole = response?.data?.role;
        const userId=response?.data?.id;
        localStorage.setItem("userId",userId);
        const expiresInMinutes = 15;
        const expirationTimeInSeconds = expiresInMinutes * 60
        Cookies.set("role", userrole, { expires: 1 });
        Cookies.set("access_token", accessToken, { expires: expirationTimeInSeconds });
        Cookies.set("refresh_token",refreshToken, {expires : 15});

        navigate(`/${userrole}/dashboard`);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setNotify({
        isOpen: true,
        message: error?.response?.data?.message,
        type: "error",
      });
    }
};

  
  };
  return (
    <main className="login-container">
      <div className="login-image-container">
        <img src={ecomIMG} alt="login-img" className="login-image" />
      </div>
      <div className="login-card">
        <h1 className="login-heading">SIGN IN</h1>
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
      id="outlined-password-input"
      label="Password"
      type={showPassword ? 'text' : 'password'}
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
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    <div>
      <Button style={styles.forgotpassword}> Forgot Password ?</Button>
    </div>

            <Button variant="contained" type="submit" className="login-btn">
              Login
            </Button>
            <Box sx={{ minWidth: 120 }}>
              <h3 style={{fontSize:"16px",fontWeight:"bold", fontFamily: "'Times New Roman', Times, serif"}}>
                New User?{" "}
                <span>
                  <Link to="/signup" style={{color:"blue"}}>SignUp </Link>
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

export default Login;
