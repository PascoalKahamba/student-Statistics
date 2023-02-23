import { createContext, useCallback, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as GlobalTheme,
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import usePersistedStorage from "../hooks/usePersistedStorage";
import { light } from "@mui/material/styles/createPalette";

interface GlobalStorageProps {
  children: React.ReactNode;
}

export type ThemeMode = "light" | "dark";

export interface GlobalProps {
  themeName: ThemeMode;
  toggleTheme: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalProps | null>(null);

export const GlobalStorage = ({ children }: GlobalStorageProps) => {
  const [open, setOpen] = useState(false);
  const [themeName, setThemeName] = usePersistedStorage<ThemeMode>(
    "theme",
    "light"
  );

  const toggleTheme = useCallback(() => {
    setThemeName((otherTheme) => (otherTheme === "light" ? "dark" : "light"));
  }, []);

  const theme = createTheme({
    palette: {
      mode: themeName,
    },
  });

  return (
    <GlobalContext.Provider value={{ themeName, toggleTheme, open, setOpen }}>
      <GlobalTheme theme={theme}>
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </GlobalTheme>
    </GlobalContext.Provider>
  );
};
