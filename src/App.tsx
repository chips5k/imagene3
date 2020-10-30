import React, { useContext, useState } from "react";
import styled from "styled-components/macro";
import Theme, { ThemeControl } from "./Theme";
import { Transition } from "react-transition-group";
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

const Square = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border: 1px solid black;
  transition: 0.5s;
  transform: translateX(
    ${({ state }: { state: string }) => {
      console.log(state);
      return state === "entering" || state === "entered" ? 0 : 400;
    }}px
  );
  opacity: ${({ state }: { state: string }) => {
    return state === "entering" || state === "entered" ? 1 : 0;
  }};
`;

const WelcomeScreen = (props: ScreenProps) => {
  const dispatch = useContext(DispatchContext);
  const { visible } = props;
  const [animate, setAnimate] = useState(false);
  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      <h2>What is Imagene3?</h2>
      <p>
        An application that generates interesting imagery through the use of
        Darwin's theory of evolution.
      </p>

      <Transition in={animate} timeout={500}>
        {(state) => {
          return <Square state={state}>Hello</Square>;
        }}
      </Transition>
      <p>
        <button onClick={() => setAnimate(!animate)}>Move the square</button>
        <button onClick={() => setLocation(dispatch, "information")}>
          What does that mean?
        </button>
        |{" "}
        <button onClick={() => setLocation(dispatch, "population")}>
          Get started
        </button>
      </p>
    </Wrapper>
  );
};

const InformationScreen = (props: ScreenProps) => {
  const dispatch = useContext(DispatchContext);
  const { visible } = props;

  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      <h2>How we generate images</h2>

      <p>
        We use something called Genetic Programming to generate and evolve math
        functions that output numbers
      </p>
      <p>
        We start by generating an initial pool of math functions - we call this
        the initial population or first generation. Think of it like our
        ancestors, a group of primeates trying to survive.
      </p>
      <p>
        We take these functions and provide them with an x and y coordinate and
        are given a numbers we can use to set red, green and blue colour values
        in a pixel. We repeat this process generating as many pixels as required
        to form an image of a particular length and width.
      </p>
      <p>
        You rate the resulting image, which helps determine the likelihood of
        survival for the underlying math functions (or primeates if you will)
      </p>
      <p>
        Once you've ranked an appropriate amount of sample images, you can
        choose to "evolve" your population.
      </p>
      <p>
        We apply some genetic/evolutionary algorithms to "breed" and mutate"
        individuals based on their survival rating (fitness).
      </p>
      <p>
        From this point on, you can choose to repeat the process as often as you
        like to hone in on particular traits you find pleasing in the sample
        images.
      </p>
      <p>
        <button onClick={() => setLocation(dispatch, "welcome")}>Back</button>
      </p>
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
      <h2>Generate population</h2>

      <p>
        To begin creating images, we need a "population" of math functions that
        accept x/y positions and return a value that can be used as the r, g or
        b component of a corresponding pixel
      </p>

      <p>
        The settings below control the number of math functions to generate (pop
        size) and the number of operations allowed in the functions (min/max
        depth) e.g: e.g (x) &eq;&gt; x or (x) &eq;&gt; x ^ 2 has a depth of 1,
        whereas (x) &eq;&gt; x ^ (2 + 3) has a depth of 2
      </p>

      <p>
        If this is your first time, we recommend leaving these settings at their
        defaults .
      </p>

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
      <button onClick={() => setLocation(dispatch, "samples")}>Continue</button>
    </Wrapper>
  );
};

const SamplesScreen = (props: ScreenProps) => {
  const _ = useContext(DispatchContext);
  const { visible } = props;

  return (
    <Wrapper style={{ display: visible ? "block" : "none" }}>
      <h2>Generate images/Samples</h2>
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
      <InformationScreen visible={location === "information"} />
      <PopulationScreen visible={location === "population"} />
      <SamplesScreen visible={location === "samples"} />
    </React.Fragment>
  );
};

export default App;
