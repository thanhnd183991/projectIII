import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import MyTextField from "../components/MyTextField";
import sendEmail from "../api/sendEmail";

const ForgotPassword = () => {
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
        <div style={{ width: "100%" }}>
          <Typography component="h1" fullWidth variant="h5" sx={{ mb: 1 }}>
            Bạn quên mật khẩu
          </Typography>
          <Formik
            validateOnChange={true}
            initialValues={{
              email: "",
            }}
            validate={({ email }) => {
              let errors = {};
              if (email === "") {
                errors.email = "mail được yêu cầu";
              } else if (!email.includes("@")) {
                errors.email = "mail bao gồm @";
              }
              return errors;
            }}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              // make async call
              console.log("object", data);
              await sendEmail(data.email);
              setSubmitting(false);
            }}
          >
            {({ values, errors, isSubmitting }) => (
              <Form>
                <MyTextField label="Email" name="email" />
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
                    <Link href="/login" variant="body2">
                      Đăng nhập
                    </Link>
                  </Grid>
                </Grid>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
