import { Grid, Paper } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import React from "react";
import CardContent from "./CardContent";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "./Link";
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

const FilterItem = styled("div")(({ theme }) => ({
  width: "200px",
  padding: "5px 5px 5px 20px",
  borderRadius: "10px",
  color: "black",
  backgroundColor: "#F0D1E1",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const FilterSelect = styled("div")(({ theme }) => ({}));
const Contents = ({ search }) => {
  return (
    <PaperContents>
      {search ? (
        <>
          <TitleSearch>
            30 kết quả<span>(được tìm thấy)</span>
          </TitleSearch>
          <FilterBar>
            {Array(3)
              .fill("Filter")
              .map((el, i) => (
                <FilterItem>
                  <FilterSelect>{el}</FilterSelect>
                  <KeyboardArrowDownIcon />
                </FilterItem>
              ))}
          </FilterBar>
        </>
      ) : (
        <Title>Xem nhiều</Title>
      )}
      <Grid container spacing={2}>
        {Array(12)
          .fill("hello")
          .map((el, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Link to="/detail/1">
                  <CardContent />
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </PaperContents>
  );
};

export default Contents;
