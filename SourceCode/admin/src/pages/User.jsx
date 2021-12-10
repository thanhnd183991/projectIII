import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MyTextField from "../components/MyTextField";
import { useLocation } from "react-router";
import { Button, Box } from "@mui/material";
import validateRegister from "../utils/validateRegister";
import { Formik, Form } from "formik";
import MyFileField from "../components/MyFileField";
import { userRows } from "../dummyData";

const User = () => {
  const user = userRows[0];
  const location = useLocation();
  useEffect(() => {
    if (!user && !location.pathname.includes("create")) {
      // call user from api
    }
  }, []);
  return (
    <Layout>
      <Box sx={{ mb: 2 }}>
        {location.pathname.includes("create")
          ? "Tạo người dùng"
          : "Sửa người dùng"}
      </Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          username: user?.username || "",
          email: user?.email || "",
          password: user?.password || "",
          confirmPassword: user?.password || "",
          avatar: user?.avatar || null,
        }}
        validate={(values) => {
          let errors = {};
          errors = validateRegister(
            values.username,
            values.email,
            values.password,
            values.confirmPassword
          );
          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          console.log({
            fileName: data.avatar.name,
            type: data.avatar.type,
            size: `${data.avatar.size} bytes`,
          });
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <MyTextField label="Username" name="username" />
            <MyTextField label="Email" name="email" />
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
                src={values.avatar}
                setFieldValue={setFieldValue}
              />
            </Box>
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
    </Layout>
  );
};

export default User;
