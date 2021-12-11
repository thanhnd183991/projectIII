import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useLocation } from "react-router";
import Layout from "../components/Layout";
import MyFileField from "../components/MyFileField";
import MySelectField from "../components/MySelectField";
import MyTextField from "../components/MyTextField";
const CreateMovie = ({ movie }) => {
  const location = useLocation();
  return (
    <Layout>
      <Box sx={{ mb: 2, fontWeight: "bold" }}>
        {location.pathname.includes("create") ? "Tạo phim" : "Sửa phim"}
      </Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          title: movie?.title || "",
          desc: movie?.desc || "",
          image: movie?.image || null,
          imageSmall: movie?.imageSmall || null,
          imageTitle: movie?.imageTitle || null,
          trailer: movie?.trailer || null,
          video: movie?.video || null,
          year: movie?.year || "",
          duration: movie?.duration || "",
          genre: movie?.genre?.split("|") || [],
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          // make async call
          console.log("submit: ", data);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <MyTextField label="Tên phim" name="title" />
            <MyTextField label="Mô tả" name="desc" />
            <MyTextField label="Năm sản xuất" name="year" />
            <MyTextField label="Thời lượng" name="duration" />
            <Box sx={{ width: "100%" }}>
              <MySelectField
                label="Thể loại"
                valueField={values.genre}
                setFieldValue={setFieldValue}
                name="genre"
              />
            </Box>
            <Box sx={{ width: "100%", display: "flex" }}>
              <MyFileField
                name="image"
                label="Ảnh nền"
                src={values.image}
                setFieldValue={setFieldValue}
              />
              <MyFileField
                name="imageTitle"
                label="Ảnh phim"
                src={values.imageTitle}
                setFieldValue={setFieldValue}
              />
              <MyFileField
                name="imageSmall"
                src={values.imageSmall}
                label="Ảnh phim kích thước nhỏ"
                setFieldValue={setFieldValue}
              />
            </Box>
            <Box sx={{ width: "100%", display: "flex" }}>
              <MyFileField
                name="trailer"
                mp4={values.trailer}
                label="Trailer phim"
                setFieldValue={setFieldValue}
              />
              <MyFileField
                name="video"
                mp4={values.video}
                label="Video phim"
                setFieldValue={setFieldValue}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mb: 1, px: 6, py: 1, display: "block", mx: "auto" }}
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

export default CreateMovie;
