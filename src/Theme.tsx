import React from "react";
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components/macro";

import { Moon, Sunny } from "@styled-icons/ionicons-sharp";

interface Themes {
  [key: string]: DefaultTheme;
}

const themes: Themes = {
  dark: {
    background: " rgb(21, 32, 43)",
    borders: "rgb(56, 68, 77)",
    text: "rgb(255,255,255)",
  },
  light: {
    background: "rgb(255,255,255)",
    borders: "rgb(56, 68, 77)",
    text: "rgb(0,0,0)",
  },
};

export const ThemedButton = styled.button`
  background: none;
  border: 1px solid ${(props) => props.theme.borders};
  padding: 0.8em;
  border-radius: 0.5em;
  transition: background-color 0.5s;
  color: ${(props) => props.theme.text};
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const ThemeIconDark = styled(Moon)`
  height: 1.3em;
`;

const ThemeIconLight = styled(Sunny)`
  height: 1.3em;
`;

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0px;
    background: ${(props) => props.theme.background};
    padding: 0px;
    height: 100%;
    font-family: 'Atkinson Hyperlegible';
    color: ${(props) => props.theme.text};
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

const Btn = styled.button`
  background: none;
  padding: 1em;
  margin: 0;
  border: none;
  color: white;
  border-radius: 0;
  outline: none;
`;
const ThemeControl = ({ onSelectTheme, theme }: ThemeControlProps) => {
  return (
    <Btn onClick={() => onSelectTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? <ThemeIconDark /> : <ThemeIconLight />}
    </Btn>
  );
};

export default Theme;
export { ThemeControl };
