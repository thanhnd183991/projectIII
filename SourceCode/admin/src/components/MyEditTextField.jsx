import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

export default function MyEditTextField({ label, type, rows, ...props }) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={label}
      multiline
      fullWidth
      type={type}
      variant="standard"
      {...field}
      autoComplete="off"
      helperText={errorText}
      error={!!errorText}
    />
  );
}
