import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Paginate = () => {
  const { numberOfPages, currentPage } = useSelector((state) => state.home);

  return (
    <Pagination
      sx={{ display: "flex", justifyContent: "center", mb: 1 }}
      count={numberOfPages}
      page={Number(currentPage) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/home?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
