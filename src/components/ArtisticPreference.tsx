import { FC, useContext } from "react";
import styled from "styled-components";
import AppContext, { ImageMetadata } from "../contexts/AppContext";
import { arrayRotate } from "../utils/Utils";

const CARD_HEIGHT = 300;
const CARD_WIDTH = 260;

const ArtisticPreferenceContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ArtisticPreferenceWrapper = styled.div`
  display: flex;
  height: ${CARD_HEIGHT}px;
`;

const CardContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid;
  border-radius: 3px;
  cursor: pointer;
`;

const LikeButton = styled(Button)`
  color: #06d6a0;
  border-color: #26547c;
`;

const NavButton = styled(Button)`
  height: 30px;
  align-self: center;
`;

const Card = styled.div`
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
    <ArtisticPreferenceContainer>
      <ArtisticPreferenceWrapper>
        <NavButton onClick={showPrevArt}>Previous Art</NavButton>
        <CardContainer>
          {images.map((img: ImageMetadata, index: number) => (
            <Card
              key={index}
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/${img.fileName})`,
              }}
            ></Card>
          ))}
        </CardContainer>
        <NavButton onClick={showNextArt}>Next Art</NavButton>
      </ArtisticPreferenceWrapper>
      <ButtonContainer>
        <LikeButton
          onClick={() => {
            addStyles(images[images.length - 1].style);
          }}
        >
          Add style
        </LikeButton>
        <LikeButton
          onClick={() => {
            addTecniques(images[images.length - 1].technique);
          }}
        >
          Add technique
        </LikeButton>
        <LikeButton
          onClick={() => {
            addThemes(images[images.length - 1].subject);
          }}
        >
          Add subject
        </LikeButton>
      </ButtonContainer>
    </ArtisticPreferenceContainer>
  );
};

export default ArtisticPreference;
