/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import {
  Card,
  Paper,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import FormData from "form-data";
import { useState } from "react";
import { SERVER_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const Profile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [values, setValues] = useState({
    isLoading: false,
  });
  const { isLoading } = values;

  const handleChange = async (e) => {
    const { user } = loggedInUser;
    try {
      setValues({ ...values, isLoading: true });
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("email", user.email);
      const response = await fetch(`${SERVER_URL}/api/user/upload`, {
        method: "POST",
        body: formData,
      });
      if (response) {
        setValues({ ...values, isLoading: false });
        toast.success("Uploaded successfully");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, []);

  return (
    <Fragment>
      {loggedInUser && (
        <Fragment>
          <div
            style={{
              display: "flex",
              marginTop: "1rem",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginRight: "1rem",
                fontFamily: "Poppins",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
          <div>
            <Backdrop
              sx={{
                color: "white",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={isLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Paper style={{ width: "50%", marginTop: "5rem" }}>
                <Card>
                  <Typography
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      marginTop: "1rem",
                    }}
                  >
                    <span style={{ fontFamily: "monospace" }}>Name: </span>{" "}
                    {loggedInUser.user.name}
                  </Typography>
                  <Typography
                    style={{ fontFamily: "Poppins", fontWeight: "bold" }}
                  >
                    <span style={{ fontFamily: "monospace" }}>Email: </span>{" "}
                    {loggedInUser.user.email}
                  </Typography>

                  <Button
                    variant="text"
                    component="label"
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                      marginBottom: "2rem",
                      marginTop: "1rem",
                      textTransform: "capitalize",
                    }}
                  >
                    +Upload
                    <input
                      hidden
                      accept="file/*"
                      type="file"
                      onChange={(e) => handleChange(e)}
                    />
                  </Button>
                </Card>
              </Paper>
            </div>
            <ToastContainer />
          </div>
        </Fragment>
      )}
      {!loggedInUser && navigate("/")}
    </Fragment>
  );
};

export default Profile;
