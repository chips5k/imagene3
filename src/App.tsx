import React, { useState, useReducer, useContext, Dispatch } from "react";
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components/macro";

interface state {
  popSize: number;
  minDepth: number;
  maxDepth: number;
  location: string;
}

interface action {
  type: string;
  value: string;
}

const initialState: state = {
  popSize: 24,
  minDepth: 0,
  maxDepth: 12,
  location: "welcome",
};

const rootReducer = (state: state, action: action) => {
  switch (action.type) {
    case "SET_POP_SIZE":
      return {
        ...state,
        popSize: +action.value,
      };
    case "SET_MIN_DEPTH":
      return {
        ...state,
        minDepth: +action.value,
      };
    case "SET_MAX_DEPTH":
      return {
        ...state,
        maxDepth: +action.value,
      };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.value,
      };
    default:
      throw new Error("Invalid action");
  }
};

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext((a: action) => {});

const darkMode: DefaultTheme = {
  bg: "rgb(5, 21, 28)",
  fg: "white",
};

const lightMode: DefaultTheme = {
  bg: "rgb(255, 255, 255)",
  fg: "black",
};

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0px;
    background: ${(props) => props.theme.bg};
    padding: 0px;
    height: 100%;
  }
  html {
    height: 100%
  }
  
  #root {
    height: 100%;
  }
`;

const Container = styled.div`
  padding: 1em;
  height: 100%;
  color: ${(props) => props.theme.fg};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.div`
  grid-column: 2/5;
  grid-row: 1/1;
  background: rgba(255, 255, 255, 0.1);
  padding: 1em;
`;

interface ScreenProps {
  visible: boolean;
}

const setLocation = (dispatch: React.Dispatch<action>, value: string) =>
  dispatch({ type: "SET_LOCATION", value });

const setPopSize = (dispatch: React.Dispatch<action>, value: string) =>
  dispatch({ type: "SET_POP_SIZE", value });

const setMinDepth = (dispatch: React.Dispatch<action>, value: string) =>
  dispatch({ type: "SET_MIN_DEPTH", value });

const setMaxDepth = (dispatch: React.Dispatch<action>, value: string) =>
  dispatch({ type: "SET_MAX_DEPTH", value });

const WelcomeScreen = (props: ScreenProps) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { visible } = props;

  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      Not sure what goes here yet...
      <button onClick={() => setLocation(dispatch, "population")}>
        Continue
      </button>
    </Wrapper>
  );
};

const PopulationScreen = (props: ScreenProps) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const { visible } = props;
  const { popSize, minDepth, maxDepth } = state;
  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      <div>
        <label>Population size ({popSize})</label>
        <div>
          <input
            type="text"
            value={popSize}
            onChange={(e) => setPopSize(dispatch, e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Min depth ({minDepth})</label>
        <div>
          <input
            type="text"
            value={minDepth}
            onChange={(e) => setMinDepth(dispatch, e.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Max depth ({maxDepth})</label>
        <div>
          <input
            type="text"
            defaultValue={maxDepth}
            onChange={(e) => setMaxDepth(dispatch, e.target.value)}
          />
        </div>
      </div>
      <button onClick={() => setLocation(dispatch, "welcome")}>Back</button>
    </Wrapper>
  );
};

function App() {
  const [theme, setTheme] = useState(darkMode);
  const toggleTheme = () => {
    setTheme(theme === lightMode ? darkMode : lightMode);
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);
  const { location } = state;
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Container>
            Imagene3
            <button onClick={toggleTheme}>Theme</button>
            <Grid>
              <WelcomeScreen visible={location === "welcome"} />
              <PopulationScreen visible={location === "population"} />
            </Grid>
          </Container>
        </ThemeProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
