import TextField from "@mui/material/TextField";
import { useField } from "formik";
import * as React from "react";

export default function MyEditTextField({
  disabled,
  label,
  type,
  rows,
  ...props
}) {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={label}
      multiline
      disabled={disabled}
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
