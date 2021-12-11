import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
const MyTextField = ({ label, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      sx={{ my: 1, width: "30%" }}
      label={label}
      type={type}
      {...field}
      autoComplete="off"
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;
