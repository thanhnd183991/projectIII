import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import GroupDots from "./GroupDots";
import Slide from "./Slide";
import { movies } from "../data";
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

export const Slider = () => {
  const [x, setX] = useState("0");
  let sliderArr = movies?.slice(0, 3);

  return (
    <SliderContainer>
      {sliderArr.map((movie, index) => (
        <Slide movie={movie} x={x} key={index} />
      ))}
      <GroupDots x={x} setX={setX} />
    </SliderContainer>
  );
};
export default Slider;
