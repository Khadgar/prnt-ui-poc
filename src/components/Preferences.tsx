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
  CircularProgress,
  Alert,
} from "@mui/material";

const Preferences: FC = () => {
  const { selectedStyles, setSelectedStyles } = useContext(AppContext);
  const { selectedTechniques, setSelectedTechniques } = useContext(AppContext);
  const { selectedThemes, setSelectedThemes } = useContext(AppContext);
  const { newImageDescription, setNewImageDescription } =
    useContext(AppContext);
  const [result, setResult] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleDelete = (from: Array<string>, label: string) => {
    console.log(label);
    return from.filter((el) => el !== label);
  };

  const handleGenerate = () => {
    (async () => {
      setLoading(true);

      const data = {
        style: selectedStyles.join(", "),
        subject: selectedThemes.join(", "),
        technique: selectedTechniques.join(", "),
      };

      fetch("./.netlify/functions/artistic-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setResult(data.image);
          setNewImageDescription(data.imgDescription);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
          setLoading(false);
        });
    })();
  };
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="warning">{error}</Alert>;

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
            Selected Preferences
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Styles
          </Typography>
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

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" onClick={handleGenerate}>
            Generate
          </Button>
        </CardActions>
      </Card>

      {result && result.length > 0 ? (
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
              Generated Image
            </Typography>
            <img className="result-image" src={result} alt="result" />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {newImageDescription ? newImageDescription : ""}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default Preferences;