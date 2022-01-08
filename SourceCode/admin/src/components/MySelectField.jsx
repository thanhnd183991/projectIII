import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { getAllGenres } from "../utils/getInfoMovies";
import { useSelector } from "react-redux";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MySelectField({
  name,
  valueField,
  label,
  setFieldValue,
  modal,
}) {
  const { movies } = useSelector((state) => state.movies);
  let names = [];
  if (name === "genre") {
    names = getAllGenres();
  } else if (name === "content") {
    movies?.forEach((movie) => {
      names.push(`${movie.id}|${movie.title}`);
    });
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (!modal) {
      setFieldValue(
        name,
        // On autofill we get a the stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else {
      setFieldValue(typeof value === "string" ? value.split(",") : value);
    }
  };

  return (
    <div>
      <FormControl sx={{ my: 1, width: "100%" }}>
        <InputLabel id={`${name}-series-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-series-label`}
          id={`${name}-series`}
          multiple
          value={valueField}
          onChange={handleChange}
          required
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {name === "genre"
                ? selected.map((value) => <Chip key={value} label={value} />)
                : selected.map((value) => (
                    <Chip
                      key={value?.split("|")[0]}
                      label={value?.split("|")[1]}
                    />
                  ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {name === "genre"
            ? names.map((el) => (
                <MenuItem key={el} value={el}>
                  <Checkbox checked={valueField.indexOf(el) > -1} />
                  <ListItemText primary={el} />
                </MenuItem>
              ))
            : names.map((el) => (
                <MenuItem key={el?.split("|")[0]} value={el}>
                  <Checkbox checked={valueField.indexOf(el) > -1} />
                  <ListItemText primary={el?.split("|")[1]} />
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
}
