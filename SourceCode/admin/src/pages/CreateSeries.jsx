import { Box, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MySelectField from "../components/MySelectField";
import MyTextField from "../components/MyTextField";
import { useDispatch, useSelector } from "react-redux";
import { setAllGenres } from "../utils/getInfoMovies";
import { getMovies } from "../api/getMoviesAPI";
import { validationSeriesSchema } from "../utils/validate";
import { toErrorMap } from "../utils/toErrorMap";
import MyAlert from "../components/MyAlert";
import { update } from "../redux/seriesSlice";
import { createSeriesAPI } from "../api/getSeriesAPI";
import { updateByCreateSeries } from "../redux/moviesSlice";
const CreateSeries = () => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(null);
  const { loaded, movies, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!loaded) dispatch(getMovies());
  }, [loaded, dispatch]);

  if (movies) {
    setAllGenres(movies);
  }
  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
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
        validationSchema={validationSeriesSchema}
        onSubmit={async (
          data,
          { setErrors, setStatus, setSubmitting, resetForm }
        ) => {
          setSubmitting(true);
          setStatus({ error: null });
          // make async call
          // process content
          try {
            const content = data.content.map((el) => el.split("|")[0]);
            const genre = data.genre.join("|");
            const response = await createSeriesAPI({
              title: data.title,
              content,
              genre,
            });
            if (response.data.errors) {
              setErrors(toErrorMap(response.data.errors));
            } else {
              // update series
              dispatch(
                update({
                  data: response.data.data,
                })
              );
              // update movies
              dispatch(updateByCreateSeries({ data: data.content }));
              setSuccess("tạo phim thành công");
              resetForm();
            }
          } catch (err) {
            console.log(err.message);
            setStatus({ error: "tạo phim thất bại" });
          }
          setSubmitting(false);
        }}
      >
        {({ values, errors, status, isSubmitting, setFieldValue }) => (
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

export default CreateSeries;
