import React, { useEffect, useState } from "react";
import ArtisticPreference from "./components/ArtisticPreference";
import AppContext, { ImageMetadata } from "./contexts/AppContext";
import "./App.css";
import Preferences from "./components/Preferences";
import {
  AppBar,
  Container,
  CssBaseline,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Link,
} from "@mui/material";
import { GitHub } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
`;

const App = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [newImageDescription, setNewImageDescription] = useState<
    string | undefined
  >();

  const imageContainer =
    process.env.REACT_APP_CloudFront_Url || process.env.PUBLIC_URL;

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
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <AppBar position="static" color="primary" enableColorOnDark>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                PRNT
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => {
                  window.open(
                    "https://github.com/Khadgar/prnt-ui-poc",
                    "_blank",
                    "noreferrer"
                  );
                }}
              >
                <GitHub />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Stack spacing={2}>
            <ArtisticPreference />
            <Preferences />
            <Footer>
              <Typography color="textSecondary" variant="subtitle1">
                <Link
                  href="https://github.com/Khadgar/prnt-ui-poc"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open on GitHub
                </Link>
              </Typography>
            </Footer>
          </Stack>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
