import React, { useEffect, useRef, useState } from "react";
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
import { register } from "../../services/authentication";

const Register = () => {
  const isMounted = useRef();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    isPassword: false,
    isLoading: false,
  });
  const validationSchema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().required("Please enter your password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async () => {
      try {
        const response = await register({ name, email, password });
        if (response.message === "Success") {
          formik.resetForm();
          toast.success("✨Registered successfully");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  const { name, email, password, confirmPassword } = formik.values;
  const { isPassword, isLoading } = values;

  const handlePasswordVisibility = () => {
    setValues({ ...values, isPassword: !isPassword });
  };

  useEffect(() => {
    if (isMounted.current) {
      return;
    }
    isMounted.current = true;
  }, []);
  return (
    <div>
      <Backdrop
        sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper
        elevation={3}
        style={{ marginTop: "10rem", marginLeft: "10%", marginRight: "10%" }}
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
            Create a new account
          </Typography>
          <form onSubmit={formik.handleSubmit} style={{ marginTop: "1rem" }}>
            <TextField
              name="name"
              value={name}
              onChange={formik.handleChange}
              label="Enter name"
              style={{ width: "80%" }}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br />
            <TextField
              name="email"
              value={email}
              onChange={formik.handleChange}
              label="Enter email"
              style={{ width: "80%", marginTop: "1rem" }}
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
              error={formik.touched.password && Boolean(formik.errors.password)}
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
            <TextField
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={formik.handleChange}
              label="Confirm Password"
              style={{ marginTop: "1rem", width: "80%" }}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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
              Register
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
              Registered?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </Typography>
          </div>
        </Card>
      </Paper>
      <ToastContainer />
    </div>
  );
};

export default Register;
