import { Button } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import UserTable from "../components/UserTable";
const Users = () => {
  return (
    <Layout>
      <Link to="/user/create">
        <Button variant="contained" sx={{ mb: 1 }}>
          Tạo người dùng
        </Button>
      </Link>
      <UserTable />
    </Layout>
  );
};

export default Users;
