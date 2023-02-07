import React, { FC, useContext } from 'react';
import { Stack } from '@mui/material';
import styled from 'styled-components';
import AppContext, { ImageMetadata } from '../contexts/AppContext';

const CARD_HEIGHT = 300;
const CARD_WIDTH = 260;

const PictureCardsWrapper = styled(Stack)`
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

interface PictureCardsProps {
  images: ImageMetadata[];
}

const PictureCards: FC<PictureCardsProps> = ({ images }) => {
  const { imageContainer } = useContext(AppContext);
  return (
    <PictureCardsWrapper spacing={2} alignItems="center" justifyContent="center">
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
    </PictureCardsWrapper>
  );
};

export default PictureCards;
