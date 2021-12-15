import { Grid, Paper, Box } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import React, { useState } from "react";
import CardContent from "./CardContent";
import Link from "./Link";
import { filterMovies } from "../utils/filterMovies";
import OptionFilter from "./OptionFilter";
import Pagination from "./Pagination";
import Skeleton from "./MySkeleton";

const Contents = ({
  search,
  typeMovie,
  contentMovies,
  pending,
  pendingPage,
}) => {
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  if (!search) {
    return (
      <PaperContents>
        <Title>Xem nhiều</Title>
        <Pagination />
        <Grid container spacing={2}>
          {pending || pendingPage ? (
            <>
              {Array(8)
                .fill("0")
                .map((_, i) => (
                  <Grid item xs={6} sm={4} md={4} lg={3} key={i}>
                    <Skeleton with="176.53px" height="250px" />
                  </Grid>
                ))}
            </>
          ) : (
            contentMovies?.map((movie) => {
              return (
                <Grid item xs={6} sm={4} md={4} lg={3} key={movie.id}>
                  <Link to={`/detail/${movie.id}`}>
                    <CardContent movie={movie.ep1 ? movie.ep1 : movie} />
                  </Link>
                </Grid>
              );
            })
          )}
        </Grid>
      </PaperContents>
    );
  }
  const { years, genres } = filterMovies(contentMovies);

  // console.log(type, genre, q);
  // const [movies, setMovies] = useState(contentMovies)

  const filterMovie = (movie) => {
    if (genre && genre !== "Tất cả" && !movie.genre.includes(genre))
      return false;
    if (year && year !== "Tất cả" && String(movie.year) !== String(year)) {
      return false;
    }
    if (type && type !== "Tất cả") {
      if (type === "Phim bộ" && !movie.isSeries) {
        return false;
      } else if (type === "Phim lẻ" && movie.isSeries) {
        return false;
      }
    }
    return true;
  };

  console.log("filter");
  const movies = contentMovies.filter((movie) => filterMovie(movie));
  return (
    <PaperContents>
      {pending ? (
        <Box
          sx={{ mb: 1, display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <Skeleton width="100%" height="30px" />
          <Skeleton width="100%" height="50px" />
        </Box>
      ) : (
        <>
          <TitleSearch>
            {movies?.length} kết quả<span>(được tìm thấy)</span>
          </TitleSearch>
          <FilterBar>
            <OptionFilter
              value={genre}
              setValue={setGenre}
              options={genres}
              title="Thể loại"
            />
            {!typeMovie && (
              <OptionFilter
                value={type}
                setValue={setType}
                options={["Tất cả", "Phim bộ", "Phim lẻ"]}
                title="Loại phim"
              />
            )}
            <OptionFilter
              value={year}
              setValue={setYear}
              options={years}
              title="Năm"
            />
          </FilterBar>
        </>
      )}

      <Grid container spacing={2}>
        {pending ? (
          <>
            {Array(8)
              .fill("0")
              .map((_, i) => (
                <Grid item xs={6} sm={4} md={4} lg={3} key={i}>
                  <Skeleton with="176.53px" height="250px" />
                </Grid>
              ))}
          </>
        ) : (
          movies?.map((movie) => {
            return (
              <Grid item xs={6} sm={4} md={4} lg={3} key={movie.id}>
                <Link to={`/detail/${movie.id}`}>
                  <CardContent movie={movie.ep1 ? movie.ep1 : movie} />
                </Link>
              </Grid>
            );
          })
        )}
      </Grid>
    </PaperContents>
  );
};

const Title = styled("h1")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: 0,
}));

const PaperContents = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const TitleSearch = styled(Title)(({ theme }) => ({
  "& span": {
    fontSize: "normal",
    fontWeight: "normal",
  },
}));

const FilterBar = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginBottom: "20px",
}));

export default Contents;
