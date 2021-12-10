import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ItemTable({ movies }) {
  const [data, setData] = useState(movies || []);
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    {
      field: "title",
      headerName: "Tên phim",
      width: 280,
      renderCell: (params) => {
        return <div>{params.row.title}</div>;
      },
    },
    { field: "desc", headerName: "Miêu tả", width: 150 },
    { field: "year", headerName: "Năm sản xuất", width: 150 },
    { field: "duration", headerName: "Thời lượng", width: 100 },
    {
      field: "genre",
      headerName: "Thể loại",
      width: 150,

      renderCell: (params) => (
        <div>{params.row.genre?.split("|").join(", ")}</div>
      ),
    },
    { field: "views", headerName: "Lượt xem", width: 100 },
    {
      field: "likes",
      headerName: "Lượt thích",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.likes.length}</div>;
      },
    },

    {
      field: "comments",
      headerName: "Lượt bình luận",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.likes.length}</div>;
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
            <Link to={"/movie/" + params.row.id}>
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
