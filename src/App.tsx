import './App.css';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppBar,
  Container,
  CssBaseline,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import ArtisticPreferenceCard from './components/ArtisticPreferenceCard';
import PreferencesCard from './components/PreferencesCard';
import ResultCard from './components/ResultCard';
import AppContext, { ImageMetadata } from './contexts/AppContext';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [newImageDescription, setNewImageDescription] = useState<string | undefined>();
  const [newImageUrl, setNewImageUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const imageContainer = process.env.REACT_APP_CloudFront_Url || process.env.PUBLIC_URL;

  useEffect(() => {
    axios.get(`${imageContainer}/metadata.json`).then((response) => {
      setImages(response.data);
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
        newImageUrl,
        setNewImageUrl,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          <AppBar position="static" color="primary" enableColorOnDark>
            <Toolbar>
              <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                PRNT
              </Typography>
            </Toolbar>
          </AppBar>

          <Stack spacing={2}>
            <ArtisticPreferenceCard />
            {loading && <LinearProgress />}
            {error && <Alert severity="warning">{error}</Alert>}
            <PreferencesCard />
            <ResultCard />
          </Stack>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
