import { createContext } from 'react';

export interface ImageMetadata {
  fileName: string;
  style: Array<string>;
  technique: Array<string>;
  subject: Array<string>;
}

interface IAppContext {
  imageContainer: string | undefined;
  images: ImageMetadata[];
  setImages: React.Dispatch<React.SetStateAction<ImageMetadata[]>>;
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTechniques: string[];
  setSelectedTechniques: React.Dispatch<React.SetStateAction<string[]>>;
  selectedThemes: string[];
  setSelectedThemes: React.Dispatch<React.SetStateAction<string[]>>;
  newImageDescription: string | undefined;
  setNewImageDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  newImageUrl: string | undefined;
  setNewImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AppContext = createContext<IAppContext>(null!);
export default AppContext;
