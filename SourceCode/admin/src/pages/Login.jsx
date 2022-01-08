import { Button, Container, Paper, Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../api/authAPI";
import MyTextField from "../components/MyTextField";
import { login } from "../redux/authSlice";
import { toErrorMap } from "../utils/toErrorMap";
import { validationLoginSchema } from "../utils/validate";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        pt: 10,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/home-bg.jpg) top left / cover  no-repeat",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{ my: 1, fontWeight: "bold" }}
          >
            Đăng nhập
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationLoginSchema}
            onSubmit={async (data, { setErrors, setSubmitting }) => {
              setSubmitting(true);
              // make async call
              const { email, password } = data;
              const response = await loginAPI({ email, password });
              if (response.data.errors) {
                setErrors(toErrorMap(response.data.errors));
              }
              setSubmitting(false);
              if (response.data.data) {
                dispatch(login(response.data?.data));
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(response.data.data)
                );
                navigate("/users");
              }
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <MyTextField label="Email" name="email" />
                <MyTextField label="Password" name="password" type="password" />
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </Button>
                </div>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
