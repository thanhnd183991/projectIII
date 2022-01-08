import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import Layout from "../components/Layout";
import MyFileField from "../components/MyFileField";
import MyTextField from "../components/MyTextField";
import { useDispatch, useSelector } from "react-redux";
import { updateAPI } from "../api/authAPI";
import { toErrorMap } from "../utils/toErrorMap";
import { update, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import MyAlert from "../components/MyAlert";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  return (
    <Layout>
      <Box sx={{ maxWidth: "sm", mx: "auto" }}>
        <Box
          sx={{
            pt: 5,
            mb: 2,
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
          onSubmit={async (data, { setErrors, setStatus, setSubmitting }) => {
            setSubmitting(true);
            setStatus({ success: null });
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
                <MyAlert attr="success" value={true} message={status.success} />
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
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
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
