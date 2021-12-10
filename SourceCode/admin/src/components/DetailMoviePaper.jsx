import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MyTextField from "./MyTextField";
import MyEditTextField from "./MyEditTextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router";
import { Button, Box } from "@mui/material";
import { Formik, Form } from "formik";
import MyFileField from "./MyFileField";
import MySelectField from "./MySelectField";

const DetailMoviePaper = ({ movie }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      <Formik
        initialValues={{
          title: movie?.title || "",
          desc: movie?.desc || "",
          year: movie?.year || "",
          image: movie?.image || null,
          imageSmall: movie?.imageSmall || null,
          imageTitle: movie?.imageTitle || null,
          trailer: movie?.trailer || null,
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
    </Paper>
  );
};

export default DetailMoviePaper;
