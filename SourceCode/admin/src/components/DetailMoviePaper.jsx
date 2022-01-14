import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import MyEditTextField from "./MyEditTextField";
import MyFileField from "./MyFileField";
import MySelectField from "./MySelectField";
import { updateMovieAPI } from "../api/getMoviesAPI";
import { toErrorMap } from "../utils/toErrorMap";
import MyAlert from "./MyAlert";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "./MySkeleton";
import { update } from "../redux/moviesSlice";
import { socket } from "../App";
const DetailMoviePaper = ({ movie }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      {movie ? (
        <Formik
          initialValues={{
            title: movie?.title || "",
            desc: movie?.desc || "",
            year: movie?.year || "",
            duration: movie?.duration || "",
            image: movie?.image || null,
            imageSmall: movie?.imageSmall || null,
            imageTitle: movie?.imageTitle || null,
            trailer: null,
            video: null,
            genre: movie?.genre?.split("|") || [],
          }}
          onSubmit={async (data, { setSubmitting, setErrors, setStatus }) => {
            setSubmitting(true);
            setStatus({ error: null });
            // make async call

            try {
              const oldTitle = movie.title;
              let formData = new FormData();
              formData.append("title", data.title);
              formData.append("desc", data.desc);
              formData.append("image", data.image);
              formData.append("imageSmall", data.imageSmall);
              formData.append("imageTitle", data.imageTitle);
              if (data.video !== null && data.trailer !== null) {
                formData.append("trailer", data.trailer);
                formData.append("video", data.video);
              }
              formData.append("year", data.year);
              formData.append("genre", data.genre.join("|"));
              const response = await updateMovieAPI(movie.id, formData);
              if (response.data.errors) {
                setErrors(toErrorMap(response.data.errors));
              } else {
                // console.log(response);
                if (response.data.data.isSeries !== true) {
                  dispatch(
                    update({
                      data: response.data.data,
                    })
                  );
                }
                data.duration = response.data.data.duration;
                socket.emit("editMovie", {
                  movieID: movie.id,
                  oldTitle,
                  username: userInfo.username,
                });
                setSuccess("sửa phim thành công");
              }
            } catch (err) {
              console.log(err.message);
              setStatus({ error: "sửa phim thất bại" });
            }
            setSubmitting(false);
          }}
        >
          {({ values, status, errors, isSubmitting, setFieldValue }) => (
            <Form
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <MyEditTextField label="Tên phim" name="title" rows="1" />
              <MyEditTextField label="Mô tả" name="desc" rows="3" />
              <MyEditTextField
                label="Năm sản xuất"
                type="number"
                name="year"
                rows="1"
              />
              <MyEditTextField
                label="Thời lượng"
                name="duration"
                rows="1"
                disabled
              />
              <MySelectField
                label="Thể loại"
                valueField={values.genre}
                setFieldValue={setFieldValue}
                name="genre"
              />
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
      ) : (
        <Skeleton width="100%" height="400px" />
      )}
    </Paper>
  );
};

export default DetailMoviePaper;
