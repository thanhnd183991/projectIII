import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function OptionFilter({ title, value, setValue, options }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel>{title}</InputLabel>
        <Select value={value} onChange={handleChange} label={title}>
          {options?.map((el, index) => (
            <MenuItem key={index} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
