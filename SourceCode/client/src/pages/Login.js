import { Box, Button, Grid, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import MyTextField from "../components/MyTextField";
import validateRegister from "../utils/validateRegister";
import { useNavigate } from "react-router-dom";
const LoginContainer = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "446px",
}));

const Login = ({ setUser }) => {
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
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              // make async call
              setUser(true);
              navigate("/");
              setSubmitting(false);
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
                    <Link href="/forgot-password" variant="body2">
                      Quên mật khẩu?
                    </Link>
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
