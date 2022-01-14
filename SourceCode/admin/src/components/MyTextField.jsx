import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
const MyTextField = ({ label, type, disabled, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      sx={{ my: 1 }}
      label={label}
      type={type}
      {...field}
      fullWidth
      autoComplete="off"
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default MyTextField;
