import React, { useEffect, useState } from "react";
import ArtisticPreference from "./components/ArtisticPreference";
import AppContext, { ImageMetadata } from "./contexts/AppContext";
import "./App.css";
import Preferences from "./components/Preferences";

const App = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [newImageDescription, setNewImageDescription] = useState<
    string | undefined
  >();

  const imageContainer = process.env.CloudFront_Url || process.env.PUBLIC_URL;

  useEffect(() => {
    fetch(`${imageContainer}/metadata.json`)
      .then((r) => r.json())
      .then((metadata: ImageMetadata[]) => {
        setImages(metadata);
      });
  }, [imageContainer, setImages]);

  return (
    <AppContext.Provider
      value={{
        selectedStyles,
        setSelectedStyles,
        selectedTechniques,
        setSelectedTechniques,
        selectedThemes,
        setSelectedThemes,
        images,
        setImages,
        newImageDescription,
        setNewImageDescription,
        imageContainer,
      }}
    >
      <div className="App">
        <ArtisticPreference />
        <Preferences />
      </div>
    </AppContext.Provider>
  );
};

export default App;
