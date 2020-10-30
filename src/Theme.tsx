import React from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components/macro";

interface Themes {
  [key: string]: DefaultTheme;
}

const themes: Themes = {
  dark: {
    bg: "rgb(5, 21, 28)",
    fg: "white",
  },
  light: {
    bg: "rgb(255, 255, 255)",
    fg: "black",
  },
};

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0px;
    background: ${(props) => props.theme.bg};
    padding: 0px;
    height: 100%;
    font-family: 'Atkinson Hyperlegible';
  }
  html {
    height: 100%
  }
  #root {
    height: 100%;
  }
`;

interface LayoutProps {
  children: any;
  theme: string;
}

const Theme = ({ children, theme }: LayoutProps) => {
  return (
    <ThemeProvider theme={themes?.[theme] ?? themes.dark}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

interface ThemeControlProps {
  onSelectTheme: (theme: string) => void;
  theme: string;
}

const ThemeControl = ({ onSelectTheme, theme }: ThemeControlProps) => {
  return (
    <button onClick={() => onSelectTheme(theme === "dark" ? "light" : "dark")}>
      {theme}
    </button>
  );
};

export default Theme;
export { ThemeControl };
