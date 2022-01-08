import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../api/getMoviesAPI";
import { updateSeriesAPI } from "../api/getSeriesAPI";
import {
  addMovieByDeleteSeries,
  deleteMovieByAddSeries,
} from "../redux/moviesSlice";
import { addMovie, deleteMovie } from "../redux/selectedSeriesSlice";
import { update } from "../redux/seriesSlice";
import { getAllGenres, setAllGenres } from "../utils/getInfoMovies";
import MySelectField from "./MySelectField";
import Skeleton from "./MySkeleton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 2 / 3,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, setOpen, message, setMessage }) {
  const dispatch = useDispatch();
  const { seriesMovies, series } = useSelector((state) => state.selectedSeries);
  const { loaded, movies } = useSelector((state) => state.movies);
  const handleClose = () => setOpen(false);
  const [genre, setGenre] = useState(series?.genre?.split("|") || []);
  const [titleSeries, setTitleSeries] = useState(series?.title || "");
  useEffect(() => {
    if (!loaded) dispatch(getMovies());
  }, [dispatch, loaded]);
  if (getAllGenres().length === 0 && movies.length > 0) {
    setAllGenres(movies);
  }
  const handleClickAddMovieToSeries = (movie) => {
    dispatch(addMovie({ movie }));
    dispatch(deleteMovieByAddSeries({ movieId: movie.id }));
  };

  const handleClickDeleteMovieToSeries = (movie) => {
    dispatch(deleteMovie({ movieId: movie.id }));
    dispatch(addMovieByDeleteSeries(movie));
  };

  const submitEditSeries = async () => {
    const {
      data: { data, errors },
    } = await updateSeriesAPI(series.id, series);
    if (data) {
      setMessage({ data: "sửa series thành công", success: true });
      console.log(data);
      dispatch(update({ data }));
    } else if (errors) {
      setMessage({ data: "sửa series thất bại", error: true });
    }
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Tên series"
            fullWidth
            value={titleSeries}
            onChange={(e) => setTitleSeries(e.target.value)}
            variant="standard"
            autoComplete="off"
            sx={{ mb: "10px" }}
          />
          <MySelectField
            label="Thể loại"
            valueField={genre}
            setFieldValue={setGenre}
            name="genre"
            modal={true}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ my: 1, display: "flex", gap: 1 }}>
              <Box sx={{ width: "50%" }}>
                <Typography id="modal-modal-title" variant="h6" component="h4">
                  Phim đã thêm ({seriesMovies?.length}):
                </Typography>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    height: "300px",
                    overflow: "auto",
                  }}
                >
                  {seriesMovies?.map((movie) => {
                    return (
                      <ListItem
                        key={movie.id}
                        disablePadding
                        onClick={() => handleClickDeleteMovieToSeries(movie)}
                      >
                        <ListItemButton role={undefined} dense>
                          <ListItemText id={movie.id} primary={movie.title} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{ my: "5px" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h4"
                >
                  Danh sách phim lẻ ({movies.length}):
                </Typography>

                {loaded ? (
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                      height: "300px",
                      overflow: "auto",
                    }}
                  >
                    {movies?.map((movie) => {
                      return (
                        <ListItem
                          key={movie.id}
                          disablePadding
                          onClick={() => handleClickAddMovieToSeries(movie)}
                        >
                          <ListItemButton role={undefined} dense>
                            <ListItemText id={movie.id} primary={movie.title} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                ) : (
                  <Skeleton width="100%" height="350" />
                )}
              </Box>
            </Box>
            <Divider />
            <Button
              sx={{ mx: "auto", width: "50%" }}
              variant="contained"
              color="success"
              onClick={submitEditSeries}
            >
              Nộp
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
