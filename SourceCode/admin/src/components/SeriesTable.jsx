import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SeriesTable({ series }) {
  const [data, setData] = useState(series || []);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "title",
      headerName: "Tên series",
      width: 280,
      renderCell: (params) => {
        return <div>{params.row.title}</div>;
      },
    },
    {
      field: "genre",
      headerName: "Thể loại",
      width: 200,

      renderCell: (params) => (
        <div>{params.row.genre?.split("|").join(", ")}</div>
      ),
    },
    {
      field: "content",
      headerName: "Số tập",
      width: 100,
      renderCell: (params) => {
        return (
          <div style={{ marginLeft: "5px" }}>
            {params.row.content?.length || 0}
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      width: 150,
    },
    {
      field: "action",
      headerName: "Hành động",
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
            <Link to={"/series/" + params.row.id}>
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
