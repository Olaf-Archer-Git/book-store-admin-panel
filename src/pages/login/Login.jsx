import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "../../app/features/auth/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { blue, green, grey } from "@mui/material/colors";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email Should Be Valid")
      .required("Email Is Required"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(5, "Must Contain At Least 5 Characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isSuccess, message } = authState;

  useEffect(() => {
    isSuccess ? navigate("admin") : navigate("");
  }, [user, isSuccess, navigate]);

  return (
    <section className="login">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            maxWidth: 500,
            width: "100%",
            padding: "20px 0",
            backgroundColor: grey[800],
          }}
        >
          <CardContent
            onSubmit={formik.handleSubmit}
            sx={{
              color: green[500],
              padding: "50px 0",
              width: "90%",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Login
            </Typography>
            <p style={{ textAlign: "center" }}>Login Into Your Account</p>
            <p>
              {message.message === "Rejected" ? "Something Goes Wrong" : ""}
            </p>

            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth={true}
                color="success"
                label="email"
                type="email"
                name="email"
                id="id-email"
                onChange={formik.handleChange("email")}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <p style={{ color: "#f34c32" }}>{formik.errors.email}</p>
              ) : null}

              <FormControl
                variant="outlined"
                fullWidth={true}
                sx={{ margin: "20px 0" }}
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  color="success"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  color="success"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={formik.handleChange("password")}
                  value={formik.values.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <p style={{ color: "#f34c32" }}>{formik.errors.password}</p>
                ) : null}
              </FormControl>

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{
                  padding: "10px 50px",
                  color: "#ffff",
                  display: "block",
                  margin: "0 auto 15px",
                }}
              >
                Login
              </Button>
              <Link to="/forgot" style={{ color: blue[200], fontSize: "12px" }}>
                Forgot The Passsword ?
              </Link>
            </form>
          </CardContent>
        </Card>
      </Box>
    </section>
  );
};

export default Login;
