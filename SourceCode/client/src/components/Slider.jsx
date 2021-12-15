import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getHome } from "../api/getHomeAPI";
import GroupDots from "./GroupDots";
import Slide from "./Slide";
import Skeleton from "./MySkeleton";

const SliderContainer = styled(Box)(({ theme }) => ({
  height: `calc(85vh)`,
  display: "flex",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  placeItems: "center",
  overflow: "hidden",
  position: "relative",
}));

export const Slider = ({ pending }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { page } = queryString.parse(location?.search);
  const { hero } = useSelector((state) => state.home);

  useEffect(() => {
    if (hero.length === 0) {
      console.log("hero");
      dispatch(getHome(page));
    }
  }, [hero, page, dispatch]);
  const [x, setX] = useState("0");

  return (
    <SliderContainer>
      {!pending ? (
        hero.map((movie) => <Slide movie={movie} x={x} key={movie?.id} />)
      ) : (
        <Skeleton width="100%" height="85vh" />
      )}
      <GroupDots x={x} setX={setX} />
    </SliderContainer>
  );
};
export default Slider;
