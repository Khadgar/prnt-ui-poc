import { ArrowBack, ArrowForward, Add } from '@mui/icons-material';
import { Stack, Button, Card, CardContent, IconButton } from '@mui/material';
import React, { FC, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { arrayRotate } from '../utils/Utils';
import PictureCards from './PictureCards';

const ArtisticPreferenceCard: FC = () => {
  const { images, setImages } = useContext(AppContext);

  const { selectedStyles, setSelectedStyles } = useContext(AppContext);
  const { selectedTechniques, setSelectedTechniques } = useContext(AppContext);
  const { selectedThemes, setSelectedThemes } = useContext(AppContext);

  const showNextArt = () => {
    const newArr = arrayRotate([...images]);
    setImages(newArr);
  };

  const showPrevArt = () => {
    const newArr = arrayRotate([...images], true);
    setImages(newArr);
  };

  const addStyles = (style: string[]) => {
    setSelectedStyles([...new Set([...selectedStyles, ...style])]);
  };

  const addTecniques = (technique: string[]) => {
    setSelectedTechniques([...new Set([...selectedTechniques, ...technique])]);
  };

  const addThemes = (themes: string[]) => {
    setSelectedThemes([...new Set([...selectedThemes, ...themes])]);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <PictureCards images={images} />
          <Stack direction="row" justifyContent="center" spacing={2}>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={showPrevArt}>
              <ArrowBack />
            </IconButton>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={showNextArt}>
              <ArrowForward />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={0.2}>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<Add />}
              onClick={() => {
                addStyles(images[images.length - 1].style);
              }}
            >
              Style
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<Add />}
              onClick={() => {
                addTecniques(images[images.length - 1].technique);
              }}
            >
              Technique
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<Add />}
              onClick={() => {
                addThemes(images[images.length - 1].subject);
              }}
            >
              Subject
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ArtisticPreferenceCard;
