import { DeleteOutline } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, getUsers } from "../api/getUsersAPI";
import Skeleton from "./MySkeleton";
import moment from "moment";
export default function UserTable() {
  // const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { users, pending, loaded } = useSelector((state) => state.users);

  useEffect(() => {
    if (loaded === null) dispatch(getUsers(0));
  }, [dispatch, loaded]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  // const onFilterChange = React.useCallback((filterModel) => {
  //   console.log(filterModel.items[0]);
  //   // async func
  //   const { columnField, operatorValue } = filterModel.items[0];
  //   // dispatch(searchUsers(columnField, operatorValue));
  // }, []);

  const columns = [
    {
      field: "username",
      headerName: "Họ và tên",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              src={params.row.avatar}
              sx={{ width: "32px", height: "32px", mr: "5px" }}
            />
            {params.row.username}
          </>
        );
      },
    },
    { field: "email", headerName: "Email", width: 250 },
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
      field: "isAdmin",
      headerName: "Is admin?",
      width: 150,
      type: "boolean",
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      filterable: false,
      sortable: false,
      renderCell: (params) => {
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
      {pending && loaded === null ? (
        <Skeleton width="100%" height="100%" />
      ) : (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={6}
          // filterMode="server"
          // onFilterModelChange={onFilterChange}
          loading={pending}
        />
      )}
    </div>
  );
}
