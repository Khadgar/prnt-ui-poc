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

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/images/metadata.json`)
      .then((r) => r.json())
      .then((metadata: ImageMetadata[]) => {
        setImages(metadata);
      });
  }, [setImages]);

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
