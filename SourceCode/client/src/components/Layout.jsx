import { Box } from "@mui/material";
import React from "react";
import Footer from "./Footer";
const Layout = ({ children, noSlider }) => {
  return (
    <Box
      sx={{
        width: "100%",
        // height: ``,
        minHeight: "100vh",
        background: "#323335",
        paddingTop: noSlider ? "70px" : "0px",
      }}
    >
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
