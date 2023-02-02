import React, { FC, useContext } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AppContext from "../contexts/AppContext";
import { styles, subjects, techiques } from "../data/constants";

const CustomPreferences: FC = () => {
  const { selectedStyles, setSelectedStyles } = useContext(AppContext);
  const { selectedTechniques, setSelectedTechniques } = useContext(AppContext);
  const { selectedThemes, setSelectedThemes } = useContext(AppContext);

  return (
    <>
      <Typography
        paragraph
        sx={{ fontSize: 20, marginTop: "16px" }}
        color="text.primary"
      >
        Custom Preferences
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="styleLabel">Style</InputLabel>
        <Select
          labelId="styleLabel"
          size="small"
          value=""
          onChange={(e) => {
            if (!selectedStyles.find((el) => el === e.target.value)) {
              const newStyles = [...selectedStyles, e.target.value];
              setSelectedStyles(newStyles);
            }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {styles.map((style, index) => (
            <MenuItem key={index} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="styleLabel">Technique</InputLabel>
        <Select
          labelId="styleLabel"
          size="small"
          value=""
          onChange={(e) => {
            if (!selectedTechniques.find((el) => el === e.target.value)) {
              const newStyles = [...selectedTechniques, e.target.value];
              setSelectedTechniques(newStyles);
            }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {techiques.map((style, index) => (
            <MenuItem key={index} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="styleLabel">Theme</InputLabel>
        <Select
          labelId="styleLabel"
          size="small"
          value=""
          onChange={(e) => {
            if (!selectedThemes.find((el) => el === e.target.value)) {
              const newStyles = [...selectedThemes, e.target.value];
              setSelectedThemes(newStyles);
            }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {subjects.map((style, index) => (
            <MenuItem key={index} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomPreferences;
