import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState } from "react";

export default function MyFileField({ setFieldValue, src, mp4, name, label }) {
  const [infoFileMp4, setInfoFileMp4] = useState("");
  return (
    <Box
      sx={{ width: "30%", mx: "auto" }}
      display="flex"
      textAlign="center"
      justifyContent="center"
      flexDirection="column"
    >
      {name === "avatar" ? (
        <Avatar
          sx={{ alignSelf: "center", width: 72, height: 72, mb: 1 }}
          src={src}
        />
      ) : src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: "200px",
            height: "150px",
            margin: "0 auto",
            marginBottom: "5px",
          }}
        />
      ) : mp4 && infoFileMp4 ? (
        <Box>{infoFileMp4}</Box>
      ) : null}
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{ alignSelf: "center" }}
      >
        {label}
        <input
          name={name}
          accept={
            String(name).includes("video") || String(name).includes("trailer")
              ? "video/*"
              : "image/*"
          }
          id={name}
          type="file"
          hidden
          onChange={(e) => {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
              if (fileReader.readyState === 2) {
                await setFieldValue(name, fileReader.result);
                console.log("Done");
                console.log(e.target.files[0]);
                setInfoFileMp4(e.target.files[0].name);
              }
            };
            fileReader.readAsDataURL(e.target.files[0]);
          }}
        />
      </Button>
    </Box>
  );
}
