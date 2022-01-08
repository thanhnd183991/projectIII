import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import MUICard from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSelectedSeries } from "../api/getSeriesAPI";
import Card from "../components/Card";
import Layout from "../components/Layout";
import MyModal from "../components/MyModal";
import Skeleton from "../components/MySkeleton";
import MyAlert from "../components/MyAlert";
const Series = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { series, seriesMovies, pending, error } = useSelector(
    (state) => state.selectedSeries
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(getSelectedSeries(id));
  }, [id, dispatch]);

  if (error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          width: "100%",
          gap: "15px",
        }}
      >
        {!pending ? (
          <>
            <Box sx={{ width: "100%", fontSize: "20px", fontWeight: "bold" }}>
              {`Sửa ${series?.title}`}
            </Box>
            {seriesMovies.map((movie, i) => (
              <Card movie={movie} key={i} />
            ))}
            <MUICard
              sx={{
                width: "32%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: 3,
                p: 2,
              }}
            >
              <EditIcon
                sx={{
                  trasistion: "0.5s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  fontSize: "200px",
                  fontWeigth: "bold",
                  color: "black",
                  opacity: "0.5",
                  textShadow: 3,
                }}
                onClick={() => setOpen(true)}
              />
            </MUICard>
            {open && (
              <MyModal
                open={open}
                setOpen={setOpen}
                messsage={message}
                setMessage={setMessage}
              />
            )}
            {message && (
              <MyAlert
                message={message?.data}
                attr={message.error ? "error" : "success"}
              />
            )}
          </>
        ) : (
          <Skeleton width="100%" height="400px" />
        )}
      </Box>
    </Layout>
  );
};

export default Series;
