import Box from "@mui/material/Box";
import * as React from "react";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { movieRows } from "../dummyData";
const Series = () => {
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
        <Box sx={{ width: "100%", fontSize: "20px", fontWeight: "bold" }}>
          Sửa series
        </Box>
        {movieRows.map((movie, i) => (
          <Card movie={movie} key={i} />
        ))}
        <Card />
      </Box>
    </Layout>
  );
};

export default Series;
