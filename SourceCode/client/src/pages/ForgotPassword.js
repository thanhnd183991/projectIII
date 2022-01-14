import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyTextField from "../components/MyTextField";
import axios from "../utils/axios";
import MyAlert from "../components/MyAlert";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  return (
    <Box
      sx={{
        width: "100vw",
        // height: ``,
        height: "100vh",
        py: 8,
      }}
      style={{
        background:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/home-bg.jpg) top left / cover  no-repeat",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{ mb: 1, color: "white" }}
            >
              {token ? "Thay đổi mật khẩu" : "Bạn quên mật khẩu"}
            </Typography>
            <Formik
              validateOnChange={true}
              initialValues={{
                text: "",
              }}
              validate={({ text }) => {
                let errors = {};
                if (text === "") {
                  errors.email = "trường được yêu cầu";
                }
                return errors;
              }}
              onSubmit={async (data, { setStatus, setSubmitting }) => {
                setSubmitting(true);
                // make async call
                let response = null;
                if (token) {
                  response = await axios.post("/auth/change-password", {
                    password: data.text,
                    token,
                  });
                } else {
                  response = await axios.post("/auth/forgot-password", {
                    email: data.text,
                  });
                }
                setSubmitting(false);
                if (!token) {
                  if (response.data.data) {
                    setStatus({ success: "vui lòng kiểm tra email của bạn" });
                  } else {
                    setStatus({ error: "lỗi không gửi được email" });
                  }
                } else {
                  if (response.data.data) {
                    setStatus({ success: "cập nhật mật khẩu thành công" });
                  } else {
                    setStatus({ error: "lỗi không cập nhật được mật khẩu" });
                  }
                }
              }}
            >
              {({ values, status, errors, isSubmitting }) => (
                <Form>
                  <MyTextField
                    label={token ? "Password" : "Email"}
                    name="text"
                    type={token ? "password" : "text"}
                  />
                  <div>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 1 }}
                      disabled={isSubmitting}
                    >
                      Lấy mật khẩu
                    </Button>
                  </div>
                  <Grid container>
                    <Grid item xs>
                      <Box
                        onClick={() => navigate("/login")}
                        style={{
                          fontSize: "0.875rem",
                          lineHeight: 1.43,
                          letterSpacing: "0.01071em",
                          color: "#90caf9",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Đăng nhập
                      </Box>
                    </Grid>
                  </Grid>
                  {status && status.error && (
                    <MyAlert message={status.error} attr="error" />
                  )}
                  {status && status.success && (
                    <MyAlert message={status.success} attr="success" />
                  )}
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
