import { Button, Container } from "@mui/material";
import * as React from "react";
import Layout from "../components/Layout";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";
const Users = () => {
  return (
    <Layout>
      <Link to="/users/1">
        <Button variant="contained" sx={{ mb: 1 }}>
          Tạo người dùng
        </Button>
      </Link>
      <UserTable />
    </Layout>
  );
};

export default Users;
