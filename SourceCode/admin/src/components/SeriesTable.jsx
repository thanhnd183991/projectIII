import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./MySkeleton";
import { useDispatch } from "react-redux";
import { deleteSeries } from "../api/getSeriesAPI";
import { updateMoviesByDeleteSeries } from "../api/getMoviesAPI";
import moment from "moment";
export default function SeriesTable({ data, pending, loaded }) {
  const dispatch = useDispatch();
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
            {moment(params.row.updatedAt).fromNow()}
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
                onClick={() => {
                  dispatch(deleteSeries(params.row.id));
                  dispatch(updateMoviesByDeleteSeries(params.row.content));
                }}
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
