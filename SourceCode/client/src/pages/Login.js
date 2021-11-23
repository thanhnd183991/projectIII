import {
  Typography,
  Button,
  Container,
  Avatar,
  Box,
  Grid,
  Link,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import MyTextField from "../components/MyTextField";
import validateRegister from "../utils/validateRegister";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>L</Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
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
              errors = validateRegister("", values.email, values.password, "");
            }
            return errors;
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            console.log("submit: ", data);
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
    </Container>
  );
};

export default Login;
