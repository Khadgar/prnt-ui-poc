import React, { FC, useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import {
  Stack,
  Chip,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  LinearProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import CustomPreferences from "./CustomPreferences";

const PreferencesCard: FC = () => {
  const { selectedStyles, setSelectedStyles } = useContext(AppContext);
  const { selectedTechniques, setSelectedTechniques } = useContext(AppContext);
  const { selectedThemes, setSelectedThemes } = useContext(AppContext);
  const { setNewImageDescription } = useContext(AppContext);
  const { setNewImageUrl } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleDelete = (from: Array<string>, label: string) => {
    return from.filter((el) => el !== label);
  };

  const handleGenerate = () => {
    setLoading(true);

    const data = {
      style: selectedStyles.join(", "),
      subject: selectedThemes.join(", "),
      technique: selectedTechniques.join(", "),
    };

    axios
      .post("./.netlify/functions/artistic-preference", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setNewImageUrl(response.data.image);
        setNewImageDescription(response.data.imgDescription);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data);
        setLoading(false);
      });
  };

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="warning">{error}</Alert>;

  return (
    <Card>
      <CardContent>
        <Typography paragraph sx={{ fontSize: 20 }} color="text.primary">
          Selected Preferences
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Styles
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {selectedStyles.map((style: string, index: number) => (
              <Chip
                key={index}
                label={style}
                onDelete={() => {
                  setSelectedStyles(handleDelete(selectedStyles, style));
                }}
              />
            ))}
          </Stack>

          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Techniques
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {selectedTechniques.map((style: string, index: number) => (
              <Chip
                key={index}
                label={style}
                onDelete={() => {
                  setSelectedTechniques(
                    handleDelete(selectedTechniques, style)
                  );
                }}
              />
            ))}
          </Stack>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Themes
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {selectedThemes.map((style: string, index: number) => (
              <Chip
                key={index}
                label={style}
                onDelete={() => {
                  setSelectedThemes(handleDelete(selectedThemes, style));
                }}
              />
            ))}
          </Stack>
        </Stack>
        <CustomPreferences />
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
      </CardActions>
    </Card>
  );
};

export default PreferencesCard;
