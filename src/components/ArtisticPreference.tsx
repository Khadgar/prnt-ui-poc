import { FC, useContext } from "react";
import styled from "styled-components";
import AppContext, { ImageMetadata } from "../contexts/AppContext";
import { arrayRotate } from "../utils/Utils";
import { Stack, Button, Card, CardContent, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Add } from "@mui/icons-material";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 260;

const ArtisticPreferenceWrapper = styled(Stack)`
  height: ${CARD_HEIGHT}px;
`;

const CardContainer = styled(Stack)`
  height: 100%;
`;

const ImageCard = styled.div`
  position: relative;
  background-color: #fff;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  margin-bottom: -${CARD_HEIGHT}px;
`;

const ArtisticPreference: FC = () => {
  const { imageContainer } = useContext(AppContext);
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
          <ArtisticPreferenceWrapper
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <CardContainer direction="column">
              {images.map((img: ImageMetadata, index: number) => (
                <ImageCard
                  key={index}
                  style={{
                    backgroundImage: `url(${imageContainer}/${img.fileName})`,
                  }}
                ></ImageCard>
              ))}
            </CardContainer>
          </ArtisticPreferenceWrapper>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={showPrevArt}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={showNextArt}
            >
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

export default ArtisticPreference;
