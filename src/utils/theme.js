import { createContext, useMemo, useState } from "react";
import { createTheme } from "@mui/material/styles";

//color design token
export const colorToken = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: "#070707",
        secondary: {
          100: "#505050",
          200: "#9e9e9e",
        },
        neutral: {
          100: "#005ba1",
          200: "#6ab5f8",
        },
        green: {
          100: "#94ff84",
          200: "#1b7f0c",
        },
      }
    : {
        primary: "#f8f8f8",
        secondary: {
          200: "#505050",
          100: "#9e9e9e",
        },
        neutral: {
          200: "#005ba1",
          100: "#6ab5f8",
        },
        green: {
          200: "#94ff84",
          100: "#1b7f0c",
        },
      }),
});

//color theme setting
export const getThemeSet = (mode) => {
  const colors = colorToken(mode);

  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary[100],
              light: colors.secondary[200],
            },
            neutral: {
              main: colors.neutral[200],
              light: colors.neutral[100],
            },
            green: {
              main: colors.green[200],
              light: colors.green[100],
            },
            background: {
              default: colors.primary,
            },
          }
        : {
            primary: {
              main: colors.primary,
            },
            secondary: {
              main: colors.secondary[100],
              light: colors.secondary[200],
            },
            neutral: {
              main: colors.neutral[100],
              light: colors.neutral[200],
            },
            green: {
              main: colors.green[100],
              light: colors.green[200],
            },
            background: {
              default: colors.primary,
            },
          }),
    },
    typography: {
      fontFamily: ["Oxygen", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 28,
      },
      h2: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 24,
      },
      h3: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 20,
      },
      h4: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 16,
      },
      h5: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 14,
      },
      h6: {
        fontFamily: ["Oxygen", "sans-serif"].join(","),
        fontSize: 12,
      },
    },
  };
};

export const ColorContext = createContext({ toggleColorMode: () => {} });

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getThemeSet(mode)), [mode]);
  return [theme, colorMode];
};
