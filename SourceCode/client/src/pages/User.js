import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import Layout from "../components/Layout";
import MyFileField from "../components/MyFileField";
import MyTextField from "../components/MyTextField";
import validateUpdateUser from "../utils/validateUpdateUser";
import { useDispatch, useSelector } from "react-redux";
import { updateAPI } from "../api/authAPI";
import { toErrorMap } from "../utils/toErrorMap";
import { update, logout } from "../redux/authSlice";

const User = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  return (
    <Layout>
      <Box sx={{ minHeight: "91vh", maxWidth: "sm", mx: "auto" }}>
        <Box
          sx={{
            pt: 10,
            mb: 2,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Thông tin cá nhân
        </Box>
        <Formik
          validateOnChange={true}
          initialValues={{
            username: userInfo.username || "",
            email: userInfo.email || "",
            avatar: userInfo.avatar || "",
          }}
          validate={(values) => {
            let errors = {};
            errors = validateUpdateUser(values.username, values.email);

            return errors;
          }}
          onSubmit={async (data, { setErrors, setStatus, setSubmitting }) => {
            setSubmitting(true);
            // make async call
            try {
              let formData = new FormData();
              formData.append("username", data.username);
              formData.append("email", data.email);
              // console.log(data.avatar, userInfo.avatar);
              if (data.avatar !== userInfo.avatar) {
                console.log("update avatar");
                formData.append("avatar", data.avatar);
              }
              const response = await updateAPI(userInfo.id, formData);
              if (response.data.errors) {
                setErrors(toErrorMap(response.data.errors));
              } else {
                // console.log(response);
                data.avatar = response.data.data.avatar;
                dispatch(
                  update({
                    ...response.data.data,
                    accessToken: userInfo.accessToken,
                  })
                );
                setStatus({ success: "cập nhật thành công" });
              }
            } catch (err) {
              console.log(err.message);
            }
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting, status, setFieldValue }) => (
            <Form style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <MyTextField label="Username" name="username" />
              <MyTextField label="Email" name="email" />
              <Box sx={{ width: "100%" }}>
                <MyFileField
                  name="avatar"
                  label="Chọn avatar"
                  src={values.avatar}
                  setFieldValue={setFieldValue}
                />
              </Box>
              {status && status.success && (
                <Box
                  sx={{
                    fontWeight: "10px",
                    fontStyle: "italic",
                    color: "whitesmoke",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {status.success}
                </Box>
              )}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ mb: 1, display: "block" }}
                  onClick={() => dispatch(logout())}
                >
                  Đăng xuất
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mb: 1, display: "block" }}
                  disabled={isSubmitting}
                >
                  Nộp
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default User;
