import { Box, Button, Grid, Typography, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import MyTextField from "../components/MyTextField";
import validateRegister from "../utils/validateRegister";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../functions/userFunctions";
import { login } from "../redux/authSlice";
import { toErrorMap } from "../utils/toErrorMap";

const LoginContainer = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "446px",
}));

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Box
      sx={{
        width: "100vw",
        // height: ``,
        height: "100vh",
        py: 10,
      }}
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/home-bg.jpg) top left / cover  no-repeat",
      }}
    >
      <LoginContainer>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            borderRadius: 2,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ my: 1, color: "white" }}
          >
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              let errors = {};
              if (isRegister) {
                errors = validateRegister(
                  values.username,
                  values.email,
                  values.password,
                  values.confirmPassword
                );
              } else {
                errors = validateRegister(
                  "",
                  values.email,
                  values.password,
                  ""
                );
              }
              return errors;
            }}
            onSubmit={async (data, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              // make async call
              let response = null;
              const { username, email, password } = data;
              if (isRegister) {
                response = await registerUser({ username, email, password });
              } else {
                response = await loginUser({ email, password });
              }
              if (response.data?.statusCode / 100 !== 2) {
                setErrors(toErrorMap(response.data.errors));
              }
              setSubmitting(false);
              if (response.data.data) {
                dispatch(login(response.data?.data));
                navigate("/");
              }
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                {isRegister && <MyTextField label="Username" name="username" />}
                <MyTextField label="Email" name="email" />
                <MyTextField label="Password" name="password" type="password" />
                {isRegister && (
                  <MyTextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                  />
                )}
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={isSubmitting}
                  >
                    {isRegister ? "Đăng ký" : "Đăng nhập"}
                  </Button>
                </div>
                <Grid container>
                  <Grid item xs>
                    <Box
                      onClick={() => navigate("/forgot-password")}
                      style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.43,
                        letterSpacing: "0.01071em",
                        color: "#90caf9",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Quên mật khẩu?
                    </Box>
                  </Grid>
                  <Grid item>
                    <Link
                      style={{ cursor: "pointer" }}
                      variant="body2"
                      onClick={() => setIsRegister(!isRegister)}
                    >
                      {isRegister ? "Đăng nhập" : "Đăng ký"}
                    </Link>
                  </Grid>
                </Grid>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </Box>
      </LoginContainer>
    </Box>
  );
};

export default Login;
