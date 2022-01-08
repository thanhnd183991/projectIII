import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMovieAPI } from "../api/getMoviesAPI";
import { toErrorMap } from "../utils/toErrorMap";
import { update } from "../redux/moviesSlice";
import MyAlert from "../components/MyAlert";
import Layout from "../components/Layout";
import MyFileField from "../components/MyFileField";
import MySelectField from "../components/MySelectField";
import MyTextField from "../components/MyTextField";
import { validationMovieSchema } from "../utils/validate";
const CreateMovie = ({ movie }) => {
  const [success, setSuccess] = useState();
  const dispatch = useDispatch();
  return (
    <Layout>
      <Box sx={{ mb: 2, fontWeight: "bold" }}>
        {/* {location.pathname.includes("create") ? "Tạo phim" : "Sửa phim"} */}
        Tạo phim
      </Box>
      <Formik
        validateOnChange={true}
        initialValues={{
          title: "",
          desc: "",
          image: null,
          imageSmall: null,
          imageTitle: null,
          trailer: null,
          video: null,
          year: "",
          genre: [],
        }}
        validationSchema={validationMovieSchema}
        onSubmit={async (
          data,
          { setSubmitting, setErrors, setStatus, resetForm }
        ) => {
          setSubmitting(true);
          setStatus({ error: null });
          // make async call
          if (
            !data.image ||
            !data.imageSmall ||
            !data.imageTitle ||
            !data.trailer ||
            !data.video
          ) {
            setStatus({ error: "file trống" });
          } else {
            try {
              let formData = new FormData();
              formData.append("title", data.title);
              formData.append("desc", data.desc);
              formData.append("image", data.image);
              formData.append("imageSmall", data.imageSmall);
              formData.append("imageTitle", data.imageTitle);
              formData.append("trailer", data.trailer);
              formData.append("video", data.video);
              formData.append("year", data.year);
              formData.append("genre", data.genre.join("|"));
              const response = await createMovieAPI(formData);
              if (response.data.errors) {
                setErrors(toErrorMap(response.data.errors));
              } else {
                // console.log(response);
                dispatch(
                  update({
                    data: response.data.data,
                  })
                );
                setSuccess("tạo phim thành công");
                resetForm();
              }
            } catch (err) {
              console.log(err.message);
              setStatus({ error: "tạo phim thất bại" });
            }
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, status, isSubmitting, setFieldValue }) => (
          <Form style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <MyTextField label="Tên phim" name="title" />
            <MyTextField label="Mô tả" name="desc" />
            <MyTextField label="Năm sản xuất" name="year" type="number" />
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
                mp4={values.trailer ? values.trailer : "A"}
                label="Trailer phim"
                setFieldValue={setFieldValue}
              />
              <MyFileField
                name="video"
                mp4={values.video ? values.video : "A"}
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
            {success && (
              <MyAlert
                message={success}
                attr="success"
                setSuccess={setSuccess}
              />
            )}
            {status && status.error && (
              <MyAlert message={status.error} attr="error" />
            )}
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateMovie;
