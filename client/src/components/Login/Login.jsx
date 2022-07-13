/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  TextField,
  Card,
  Button,
  Paper,
  Typography,
  InputAdornment,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../services/authentication";

const Login = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isMounted = useRef();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    isPassword: false,
    isLoading: false,
  });
  const validationSchema = yup.object({
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async () => {
      try {
        const response = await login({ email, password });
        const { token, user } = response;
        localStorage.setItem("user", JSON.stringify({ token, user }));
        navigate("/profile");
      } catch (err) {
        console.log(err);
        toast.error("Login failed!");
      }
    },
  });
  const { email, password } = formik.values;
  const { isPassword, isLoading } = values;

  const handlePasswordVisibility = () => {
    setValues({ ...values, isPassword: !isPassword });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
    if (loggedInUser?.user) {
      navigate("/profile");
    }
  }, []);
  return (
    <div>
      {!loggedInUser?.user && (
        <Fragment>
          <Backdrop
            sx={{ color: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Paper
            elevation={3}
            style={{
              marginTop: "10rem",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <Card>
              <Typography
                style={{
                  marginTop: "1.5rem",
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                Login
              </Typography>
              <form
                onSubmit={formik.handleSubmit}
                style={{ marginTop: "1rem" }}
              >
                <TextField
                  name="email"
                  value={email}
                  onChange={formik.handleChange}
                  label="Enter email"
                  style={{ width: "80%" }}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <br />
                <TextField
                  type={isPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={formik.handleChange}
                  label="Enter password"
                  style={{ marginTop: "1rem", width: "80%" }}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={() => handlePasswordVisibility()}
                        style={{ cursor: "pointer" }}
                      >
                        <i
                          className={`fas ${
                            isPassword ? `fa-eye-slash` : `fa-eye`
                          }  ml-1 fa-1x`}
                        ></i>
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <Button
                  style={{
                    marginBottom: "1rem",
                    marginTop: "1rem",
                    width: "45%",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </form>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  style={{
                    color: "grey",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Not registered?{" "}
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => navigate("/register")}
                  >
                    Click here
                  </span>
                </Typography>
              </div>
            </Card>
          </Paper>
          <ToastContainer />
        </Fragment>
      )}
      {loggedInUser?.user && navigate("/profile")}
    </div>
  );
};

export default Login;
