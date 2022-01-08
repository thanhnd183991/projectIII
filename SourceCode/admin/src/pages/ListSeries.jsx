import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SeriesTable from "../components/SeriesTable";
import { useSelector, useDispatch } from "react-redux";
import { getSeries } from "../api/getSeriesAPI";
const ListSeries = () => {
  const dispatch = useDispatch();
  const { loaded, series, pending, error } = useSelector(
    (state) => state.series
  );
  useEffect(() => {
    if (!loaded) dispatch(getSeries());
  }, [loaded, dispatch]);

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <Layout>
      <Link to={"/series/create"}>
        <Button variant="contained" sx={{ mb: 1 }}>
          Tạo series mới
        </Button>
      </Link>

      <SeriesTable data={series} loaded={loaded} pending={pending} />
    </Layout>
  );
};

export default ListSeries;
