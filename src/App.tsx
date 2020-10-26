import React, { useState, useReducer, useContext } from 'react';
import styled, { createGlobalStyle, DefaultTheme, ThemeProvider }  from 'styled-components/macro'

interface state {
  popSize: number
  minDepth: number
  maxDepth: number
}

interface action {
  type: string,
  value: string
}

const initialState : state = {
  popSize: 24,
  minDepth: 0,
  maxDepth: 12
};


const rootReducer = (state: state, action: action) => {
  switch(action.type) {
    case 'UPDATE_POP_SIZE':
        return {
          ...state,
          popSize: +action.value
        }
    default: 
      throw new Error("Invalid action")
  }
}

const StateContext = React.createContext(initialState)
const DispatchContext = React.createContext((a: action) => {})


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
    height: 100%;
  }
  html {
    height: 100%
  }
  
  #root {
    height: 100%;
  }
`

const Container = styled.div`
  padding: 1em;
  height: 100%;
  color: ${props => props.theme.fg};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  width: 100%;
`

const WelcomeScreen = () => {

  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext) 

  const Wrapper =  styled.div`
    grid-column: 2/5;
    grid-row: 1/1;
    background: rgba(255,255,255, 0.1);
    padding: 1em;

  `
  return (
    <Wrapper>
      PopSize: {state.popSize}
      <button onClick={() => {  dispatch({ type: "UPDATE_POP_SIZE", value: "55" })  }}>Change pop size</button>
    </Wrapper>
  )
}

const PopulationScreen = () => {

}

function App() {
  const [theme, setTheme] = useState(darkMode)
  const toggleTheme = () => {
    setTheme(theme === lightMode ? darkMode : lightMode)
  }

  const [state, dispatch] = useReducer(rootReducer, initialState)
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <Container>
            Imagene3
            <button onClick={(toggleTheme)}>Theme</button>
            <Grid>
              <WelcomeScreen />
            </Grid>
          </Container>
        </ThemeProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}


export default App;
