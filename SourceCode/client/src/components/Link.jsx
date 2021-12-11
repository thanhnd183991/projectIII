import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
const MyLink = styled(ReactLink)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
}));
const Link = ({ children, to }) => {
  return <MyLink to={to}>{children}</MyLink>;
};

export default Link;
