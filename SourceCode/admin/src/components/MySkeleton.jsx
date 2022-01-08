import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function MySkeleton({ width, height }) {
  return (
    <Skeleton
      // sx={{ bgcolor: "grey.700" }}
      // sx={{ bgcolor: "white" }}
      variant="rectangular"
      width={width}
      height={height}
    />
  );
}
