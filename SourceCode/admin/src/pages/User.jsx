import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MyFileField from "../components/MyFileField";
import MyTextField from "../components/MyTextField";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validationUpsertUserSchema } from "../utils/validate";
import { update } from "../redux/usersSlice";
import { updateAPI } from "../api/getUsersAPI";
import { toErrorMap } from "../utils/toErrorMap";
import API from "../api/baseURL";
import MyAlert from "../components/MyAlert";

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async (userId) => {
      const {
        data: { data, errors },
      } = await API.get(`/users/find/${userId}`);
      return { data, errors };
    };
    getUser(id).then(({ data, errors }) =>
      data ? setUser(data) : setErrors(errors)
    );
  }, [id]);

  if (errors.length > 0) {
    return <pre>{JSON.stringify(errors)}</pre>;
  }
  return (
    <Layout>
      <Box sx={{ mb: 2 }}>Sửa người dùng</Box>
      {user && (
        <Formik
          validateOnChange={true}
          initialValues={{ ...user, password: "", confirmPassword: "" }}
          validationSchema={validationUpsertUserSchema}
          onSubmit={async (data, { setStatus, setErrors, setSubmitting }) => {
            setSubmitting(true);
            setStatus({ success: null });
            // make async call
            try {
              let formData = new FormData();
              formData.append("username", data.username);
              formData.append("email", data.email);
              formData.append("password", data.password);
              if (data.avatar !== user.avatar) {
                console.log("update avatar");
                formData.append("avatar", data.avatar);
              }
              const response = await updateAPI(user.id, formData);
              if (response.data.errors) {
                setErrors(toErrorMap(response.data.errors));
              } else {
                // console.log(response);
                data.avatar = response.data.data.avatar;
                dispatch(
                  update({
                    data: response.data.data,
                  })
                );
                data.createdAt = response.data.data.createdAt;
                data.updatedAt = response.data.data.updatedAt;
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
              {/* <MyTextField label="Ngày tạo" name="createdAt" disabled />
              <MyTextField label="Ngày cập nhật" name="updatedAt" disabled /> */}
              <MyTextField label="Password" name="password" type="password" />
              <MyTextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
              />
              <Box sx={{ width: "100%" }}>
                <MyFileField
                  name="avatar"
                  label="Chọn avatar"
                  src={values?.avatar ? values.avatar : "A"}
                  setFieldValue={setFieldValue}
                />
              </Box>
              {status && status.success && (
                <MyAlert message={status.success} value={true} attr="success" />
              )}
              <Box sx={{ width: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mb: 1, display: "block", mx: "auto" }}
                  disabled={isSubmitting}
                >
                  Nộp
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Layout>
  );
};

export default User;
