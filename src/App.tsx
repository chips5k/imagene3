import React, { useState } from 'react';
import styled, { createGlobalStyle, DefaultTheme, ThemeProvider }  from 'styled-components/macro'

const darkMode: DefaultTheme = {
  bg: "rgb(5, 21, 28)",
  fg: "white",
}

const lightMode: DefaultTheme = {
  bg: "rgb(255, 255, 255)",
  fg: "black",
}

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0px;
    background: ${props => props.theme.bg};
    padding: 0px;
  }
`

const Container = styled.div`
  padding: 1em;
  color: ${props => props.theme.fg};
`

function App() {
  const [theme, setTheme] = useState(darkMode)
  const toggleTheme = () => {
    setTheme(theme == lightMode ? darkMode : lightMode)
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Container>        
        Imagene3
        <button onClick={toggleTheme}>Theme</button>
      </Container>
    </ThemeProvider>
  );
}


export default App;
