import React, { FC, useContext } from 'react';
import { Card, CardContent, Typography, Stack, Chip, CardActions, Button } from '@mui/material';
import axios from 'axios';
import AppContext from '../contexts/AppContext';
import { getErrorMessageFromResponse } from '../utils/Utils';
import CustomPreferences from './CustomPreferences';

const PreferencesCard: FC = () => {
  const { selectedStyles, setSelectedStyles } = useContext(AppContext);
  const { selectedTechniques, setSelectedTechniques } = useContext(AppContext);
  const { selectedThemes, setSelectedThemes } = useContext(AppContext);
  const { setNewImageDescription } = useContext(AppContext);
  const { setNewImageUrl } = useContext(AppContext);

  const { loading, setLoading } = useContext(AppContext);
  const { setError } = useContext(AppContext);

  const handleDelete = (from: Array<string>, label: string) => {
    return from.filter((el) => el !== label);
  };

  const handleGenerate = () => {
    setLoading(true);

    const data = {
      style: selectedStyles.join(', '),
      subject: selectedThemes.join(', '),
      technique: selectedTechniques.join(', '),
    };

    axios
      .post('./.netlify/functions/artistic-preference', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        setNewImageUrl(response.data.image);
        setNewImageDescription(response.data.imgDescription);
        setLoading(false);
        setError(undefined);
      })
      .catch((error) => {
        console.error('Error:', error);
        if (error.response) {
          setError(getErrorMessageFromResponse(error.response));
        }

        setLoading(false);
      });
  };

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
                  setSelectedTechniques(handleDelete(selectedTechniques, style));
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
        <Button disabled={loading} size="small" variant="contained" onClick={handleGenerate}>
          Generate
        </Button>
      </CardActions>
    </Card>
  );
};

export default PreferencesCard;
