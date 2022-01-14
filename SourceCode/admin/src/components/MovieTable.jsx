import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useDispatch } from "react-redux";
import Skeleton from "./MySkeleton";
import { Link } from "react-router-dom";
import { deleteMovie } from "../api/getMoviesAPI";
import moment from "moment";
export default function MovieTable({ data, loaded, pending }) {
  const dispatch = useDispatch();
  const columns = [
    {
      field: "title",
      headerName: "Tên phim",
      width: 150,
      renderCell: (params) => {
        return <div>{params.row.title}</div>;
      },
    },
    { field: "year", headerName: "Năm sản xuất", width: 150 },
    { field: "duration", headerName: "Thời lượng", width: 180 },
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
      sortable: false,
      renderCell: (params) => {
        return <div>{params.row.likes.length}</div>;
      },
    },

    {
      field: "comments",
      headerName: "Lượt bình luận",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.comments.length}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 150,

      renderCell: (params) => {
        // const formatDate = moment(params.row.createdAt).format("X");
        // moment.locale("vi");
        // const m = moment(formatDate);
        // const displayDate = m.fromNow();
        return (
          <div style={{ marginLeft: "5px" }}>
            {moment(params.row.createdAt).fromNow()}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Ngày cập nhật",
      width: 150,

      renderCell: (params) => {
        // const formatDate = moment(params.row.createdAt).format("X");
        // moment.locale("vi");
        // const m = moment(formatDate);
        // const displayDate = m.fromNow();
        return (
          <div style={{ marginLeft: "5px" }}>
            {moment(params.row.createdAt).fromNow()}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 130,
      sortable: false,
      renderCell: (params) => {
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
                onClick={() => dispatch(deleteMovie(params.row.id))}
              />
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: "71vh", width: "100%" }}>
      {pending && loaded === null ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <DataGrid rows={data} columns={columns} pageSize={6} />
      )}
    </div>
  );
}
