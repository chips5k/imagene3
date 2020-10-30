import React, { useContext } from "react";
import styled from "styled-components/macro";
import Theme, { ThemeControl } from "./Theme";
import {
  StateProvider,
  StateContext,
  DispatchContext,
  setLocation,
  setMinDepth,
  setMaxDepth,
  setPopSize,
  setTheme,
} from "./GlobalState";

const Container = styled.div`
  padding: 1em;
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
  background: rgba(255, 255, 255, 0.03);
  padding: 2em;
  color: rgba(255, 255, 255, 0.9);
`;

interface ScreenProps {
  visible: boolean;
}

const WelcomeScreen = (props: ScreenProps) => {
  const dispatch = useContext(DispatchContext);
  const { visible } = props;

  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      <h2>What is Imagene3?</h2>
      <p>
        An application that generates interesting imagery through the use of
        Darwin's theory of evolution.
      </p>

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
  return (
    <StateProvider>
      <ConnectedTheme>
        <Container>
          Imagene3
          <ConnectedThemeControl />
          <Grid>
            <ConnectedRouter />
          </Grid>
        </Container>
      </ConnectedTheme>
    </StateProvider>
  );
}

const ConnectedTheme = ({ children }: { children: any }) => {
  const { theme } = useContext(StateContext);
  return <Theme theme={theme}>{children}</Theme>;
};

const ConnectedThemeControl = () => {
  const dispatch = useContext(DispatchContext);
  const { theme } = useContext(StateContext);
  return (
    <ThemeControl onSelectTheme={setTheme.bind(null, dispatch)} theme={theme} />
  );
};

const ConnectedRouter = () => {
  const { location } = useContext(StateContext);
  return (
    <React.Fragment>
      <WelcomeScreen visible={location === "welcome"} />
      <PopulationScreen visible={location === "population"} />
    </React.Fragment>
  );
};

export default App;
