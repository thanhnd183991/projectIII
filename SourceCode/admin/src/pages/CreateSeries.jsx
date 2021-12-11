import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import Layout from "../components/Layout";
import MySelectField from "../components/MySelectField";
import MyTextField from "../components/MyTextField";

const CreateSeries = () => {
  return (
    <Layout>
      <Box sx={{ mb: 2, fontWeight: "bold" }}>Tạo series phim</Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          title: "",
          genre: [],
          content: [],
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <MyTextField label="Tên series" name="title" isSeries />
            <MySelectField
              label="Thể loại"
              name="genre"
              valueField={values.genre}
              setFieldValue={setFieldValue}
            />
            <MySelectField
              label="Chọn phim"
              name="content"
              valueField={values.content}
              setFieldValue={setFieldValue}
            />
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

export default CreateSeries;
