import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRows } from "../dummyData";

export default function UserTable() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Họ và tên",
      width: 280,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.avatar} />
            {params.row.username}
          </>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "createdAt", headerName: "Ngày tạo", width: 180 },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          const api = params.api;
          const thisRow = {};
          console.log(api);
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return alert(JSON.stringify(thisRow, null, 4));
        };

        return (
          <Box sx={{ display: "flex" }}>
            <Link to={"/user/" + params.row.id}>
              <ModeEditIcon sx={{ mb: "-5px" }} />
            </Link>
            <Box
              sx={{
                ml: "10px",
                cursor: "pointer",
              }}
            >
              <DeleteOutline
                sx={{ mb: "-5px" }}
                onClick={() => handleDelete(params.row.id)}
              />
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: "71vh", width: "100%" }}>
      <DataGrid rows={data} columns={columns} pageSize={6} />
    </div>
  );
}
